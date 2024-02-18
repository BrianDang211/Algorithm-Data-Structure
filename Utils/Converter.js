const { validateParameters } = require("./Validates");

function convertRepeatElementToArray(v, nRepeat) {
      if (typeof v !== "string") {
            throw Error("Repeat value must be an string.");
      };
      validateParameters(nRepeat);
      return v.repeat(nRepeat).split("").map(vv => Number(vv));
}

module.exports = { convertRepeatElementToArray }