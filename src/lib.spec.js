"use strict";

const assert = require("assert");
const { CoverageXml } = require("./lib");

describe("CoverageXml", function () {
  afterEach(function () {
    delete process.env["INPUT_COVERAGE-FILE-NAME"];
  });

  it("throws if line-rate is missing", async function () {
    process.env["INPUT_COVERAGE-FILE-NAME"] =
      "./testdata/line-rate-missing.xml";
    const stub = new CoverageXml();
    await assert.rejects(stub.render(), {
      name: "Error",
      message: "file does not contain '.coverage.@_line-rate' property",
    });
  });

  it("throws if line-rate is not a float", async function () {
    process.env["INPUT_COVERAGE-FILE-NAME"] =
      "./testdata/line-rate-not-float.xml";
    const stub = new CoverageXml();
    await assert.rejects(stub.render(), {
      name: "Error",
      message: "'.coverage.@_line-rate' property must be a float",
    });
  });

  it("renders if coverage file is valid", async function () {
    process.env["INPUT_COVERAGE-FILE-NAME"] = "./testdata/valid.xml";
    const stub = new CoverageXml();
    const badge = await stub.render();
    assert.deepStrictEqual(badge, {
      message: "88%",
      messageColor: "yellowgreen",
    });
  });
});
