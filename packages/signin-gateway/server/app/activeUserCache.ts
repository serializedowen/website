import LRU = require("lru-cache");
import { Model } from "sequelize";
const activeUserCache = new LRU<string, Model>({ max: 10 });

export default activeUserCache;
