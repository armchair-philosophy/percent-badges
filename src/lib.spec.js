import assert from "assert";
import { CoveragePercentage } from "./lib.js";

describe("CoverageXml", function () {
  afterEach(function () {
    delete process.env["INPUT_PERCENTAGE"];
  });

  it("throws if INPUT_PERCENTAGE is not number", async function () {
    process.env["INPUT_PERCENTAGE"] = "a";
    const stub = new CoveragePercentage();
    await assert.rejects(stub.render(), {
      name: "Error",
      message: "inputs.percentage is not a number"
    });
  });

  it("renders if INPUT_PERCENTAGE is valid (with percentage)", async function () {
    process.env["INPUT_PERCENTAGE"] = "99.999%";
    const stub = new CoveragePercentage();
    const badge = await stub.render();
    assert.deepStrictEqual(badge, {
      message: "100%",
      messageColor: "green",
    });
  });

  it("renders if INPUT_PERCENTAGE is valid (number only)", async function () {
    process.env["INPUT_PERCENTAGE"] = "23.5";
    const stub = new CoveragePercentage();
    const badge = await stub.render();
    assert.deepStrictEqual(badge, {
      message: "24%",
      messageColor: "yellow",
    });
  });
});
