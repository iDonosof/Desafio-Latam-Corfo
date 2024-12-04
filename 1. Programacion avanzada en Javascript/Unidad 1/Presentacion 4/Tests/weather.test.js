import { test as Test } from "node:test";
import assert from "node:assert";

import { CelsiusToFahrenheit, CelsiusToKelvin } from "../Utils/weather.js";

export default Test("Test weather convert", async (scope) => {
  await scope.test("Test Celsius to Fahrenheit", () => {
    assert.equal(CelsiusToFahrenheit(25), 77);
  });

  await scope.test("Test Celsius to Kelvin", () => {
    assert.equal(CelsiusToKelvin(25), 298.15);
  });
});
