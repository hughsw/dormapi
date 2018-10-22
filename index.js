const express = require('express');
const sequelize = require('sequelize');

const loadApiSync = (sequelize, express) => {
  const models = {};
  const routes = express.router();
  return {
    models,
    routes,
  };
};

module.exports = exports = {
  loadApiSync,
};
