"use strict";

const rule = require("./plugin");

const plugin = { rules: { "jsx-no-inline-comment-textnodes": rule } };
module.exports = plugin;
