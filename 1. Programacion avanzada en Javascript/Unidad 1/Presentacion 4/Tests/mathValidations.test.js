import { test as Test } from "node:test";
import assert from "node:assert";

import { ValidateCeroValues, ValidateIntegerNumber, ValidateNoNegativeNumbers } from '../Validations/mathValidations.js';

export default Test("Test Math Validations", async (scope) => {
  await scope.test("Test only integer values", () => {
    assert.throws(() => ValidateIntegerNumber(["1", "2"]), Error("Parameters should be numeric"));
  });

  await scope.test("Test values greater than 0", () => {
    assert.throws(() => ValidateCeroValues(0), Error("Value can't be 0"));
  });

  await scope.test("Test no negative values", () => {
    assert.throws(() => ValidateNoNegativeNumbers([-1]), Error("Parameters should be greater than 0"));
  });
});
