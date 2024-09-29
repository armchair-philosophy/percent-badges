import core from "@actions/core";
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

class CoveragePercentage extends BaseAction {
  get label() {
    return "coverage";
  }

  getInputs() {
    const percentage = core.getInput("percentage", {
      required: true,
    });
    return { percentage };
  }

  async render() {
    const percentage = Number.parseFloat(this.getInputs().percentage);
    if (Number.isNaN(percentage)) {
      throw new Error("inputs.percentage is not a number")
    }
    return {
      message: `${percentage.toFixed(0)}%`,
      messageColor: coveragePercentage(percentage),
    };
  }
}

export { CoveragePercentage };
