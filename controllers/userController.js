const User = require("../models/User");
const Redis = require("ioredis");
const { promisify } = require("util");
const redis = new Redis({
  // host: "redditus-caching.7iw0vl.clustercfg.eun1.cache.amazonaws.com",
  host: "redditus-redis-cache.7iw0vl.clustercfg.eun1.cache.amazonaws.com",
  port: 6379,
  name: "redditus-caching",
  protected: "no",
  connect_timeout: 2000,
  // ... other options
});

redis.on("connect", (res) => {
  console.log("Connected to Redis", res);
  redis.getAsync = promisify(redis.get);
  redis.setAsync = promisify(redis.set);
});

redis.on("error", () => {
  console.error("Error connecting to Redis:");
});

redis.on("end", () => {
  console.log("Connection to Redis closed");
});

// const getAsync = util.promisify(redis.get).bind(redis);
// const setAsync = util.promisify(redis.set).bind(redis);

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Attempt to fetch user from cache by ID

    const cachedUser = await redis.getAsync(userId);

    if (cachedUser !== null) {
      return res.json({ user: JSON.parse(cachedUser) });
    }
    console.log("User not found in cache. Querying database...");

    // If user is not found in cache, query the database
    const user = await User.findById(userId);
    console.log("Got user from database:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save the user data in the cache for future use
    await redis.setAsync(userId, JSON.stringify(user));
    console.log("User data saved to cache");

    return res.json({ user: user });
  } catch (error) {
    console.error("Error in getUserById:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
