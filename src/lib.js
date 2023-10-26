import { promises as fs } from "fs";
import core from "@actions/core";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { BaseAction } from "@action-badges/core";

function floorCount(value, yellow, yellowgreen, green) {
  if (value <= 0) {
    return "red";
  } else if (value < yellow) {
    return "yellow";
  } else if (value < yellowgreen) {
    return "yellowgreen";
  } else if (value < green) {
    return "green";
  } else {
    return "brightgreen";
  }
}

function coveragePercentage(percentage) {
  return floorCount(percentage, 80, 90, 100);
}

class CoverageXml extends BaseAction {
  get label() {
    return "coverage";
  }

  getInputs() {
    const coverageFileName = core.getInput("coverage-file-name", {
      required: true,
    });
    return { coverageFileName };
  }

  async validate(coverageXml) {
    if (coverageXml.coverage && coverageXml.coverage["@_line-rate"]) {
      if (Number.isNaN(parseFloat(coverageXml.coverage["@_line-rate"]))) {
        throw new Error("'.coverage.@_line-rate' property must be a float");
      }
      return coverageXml;
    }
    throw new Error("file does not contain '.coverage.@_line-rate' property");
  }

  async fetch() {
    const { coverageFileName } = this.getInputs();
    const buffer = await fs.readFile(coverageFileName, "utf8");
    const validateResult = XMLValidator.validate(buffer);
    if (validateResult !== true) {
      throw new Error(validateResult.err.msg);
    }
    const parser = new XMLParser({ ignoreAttributes: false });
    return parser.parse(buffer);
  }

  async render() {
    const coverageXml = await this.validate(await this.fetch());
    const percentage = parseFloat(coverageXml.coverage["@_line-rate"]) * 100;
    return {
      message: `${percentage.toFixed(0)}%`,
      messageColor: coveragePercentage(percentage),
    };
  }
}

export { CoverageXml };
