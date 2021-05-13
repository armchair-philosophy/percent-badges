"use strict";

const { invoke } = require("@action-badges/core");
const { CoverageXml } = require("./lib");

async function run() {
  return await invoke(CoverageXml);
}

run();
