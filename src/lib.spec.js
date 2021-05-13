"use strict";

const assert = require("assert");
const { CoverageXml } = require("./lib");

describe("CoverageXml", function () {
  it("throws if line-rate is missing", async function () {
    class CoverageXmlStub extends CoverageXml {
      getInputs() {
        return { coverageFileName: "./testdata/line-rate-missing.xml" };
      }
    }
    const stub = new CoverageXmlStub();
    await assert.rejects(stub.render(), {
      name: "Error",
      message: "file does not contain '.coverage.@_line-rate' property",
    });
  });

  it("throws if line-rate is not a float", async function () {
    class CoverageXmlStub extends CoverageXml {
      getInputs() {
        return { coverageFileName: "./testdata/line-rate-not-float.xml" };
      }
    }
    const stub = new CoverageXmlStub();
    await assert.rejects(stub.render(), {
      name: "Error",
      message: "'.coverage.@_line-rate' property must be a float",
    });
  });

  it("renders if coverage file is valid", async function () {
    class CoverageXmlStub extends CoverageXml {
      getInputs() {
        return { coverageFileName: "./testdata/valid.xml" };
      }
    }
    const stub = new CoverageXmlStub();
    const badge = await stub.render();
    assert.deepStrictEqual(
      { message: "88%", messageColor: "yellowgreen" },
      badge
    );
  });
});
