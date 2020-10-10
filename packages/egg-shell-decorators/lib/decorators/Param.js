"use strict";

const { PARAM, PARAM_INFO } = require("./symbols");

require("reflect-metadata");

const Param = (key) => (target, propertyKey, parameterIndex) => {
  const current = Reflect.getOwnMetadata(PARAM_INFO, target, propertyKey) || [];
  const typeInfo = Reflect.getMetadata(
    "design:paramtypes",
    target,
    propertyKey
  )[parameterIndex];
  current[parameterIndex] = { extract: PARAM, typeInfo, key };
  Reflect.defineMetadata(PARAM_INFO, current, target, propertyKey);
};

module.exports = Param;
