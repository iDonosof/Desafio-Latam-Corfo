import { test as Test } from "node:test";
import assert from "node:assert";

import GetFullDate from '../Utils/date.js';

export default Test("Test date calculator", async (scope) => {
  await scope.test("Test Date Calculation", () => {
    assert.equal(GetFullDate(373), "1 año, 1 semana y 1 día.");
  });
});
