"use strict";

const { invoke } = require("@action-badges/core");
const { CoverageXml } = require("./lib");

(async () => {
  return await invoke(CoverageXml);
})();
