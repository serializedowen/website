import LRU = require("lru-cache");
import { Model } from "sequelize";
const activeUserCache = new LRU<number, Model>({ max: 100 });

export default activeUserCache;
