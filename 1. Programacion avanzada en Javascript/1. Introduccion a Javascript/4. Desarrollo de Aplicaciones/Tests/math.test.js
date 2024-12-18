import { test as Test } from "node:test";
import assert from "node:assert";

import { Sum, Rest, Division, Multiplication, Module } from "../Utils/math.js";

export default Test("Test calculations", async (scope) => {
  await scope.test("Test Sum", () => {
    assert.equal(Sum(2, 3), 5);
  });

  await scope.test("Test invalid param in Sum", () => {
    assert.throws(() => Sum(2, "a"), Error("Parameters should be numeric"));
  });

  await scope.test("Test Rest", () => {
    assert.equal(Rest(5, 2), 3);
  });

  await scope.test("Test Division", () => {
    assert.equal(Division(10, 2), 5);
  });

  await scope.test("Test Multiplication", () => {
    assert.equal(Multiplication(2, 5), 10);
  });

  await scope.test("Test Module", () => {
    assert.equal(Module(8, 3), 2);
  });
});
