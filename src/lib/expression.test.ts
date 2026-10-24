import { describe, expect, it } from "vitest";
import { evaluateExpression } from "./expression";
describe("expression parser", () => {
  it.each<[string, number]>([
    ["(12 + 8) * 3", 60],
    ["-2 * (3 + .5)", -7],
    ["1+2*3", 7],
    ["(1+2)*3", 9],
    ["--2", 2],
    ["10/2/5", 1],
    ["0", 0],
    ["2+-3", -1],
    ["2 - -3", 5],
  ])("evaluates %s", (expression, expected) =>
    expect(evaluateExpression(expression).result).toBe(expected),
  );
  it.each([
    "",
    "1/0",
    "(1+2",
    "1 2",
    "2**3",
    "<script>alert(1)</script>",
    "NaN",
    "Infinity",
    "1..2",
    "2+",
  ])("rejects malformed or unsafe input %s", (source) =>
    expect(() => evaluateExpression(source)).toThrow(),
  );
  it("returns tokens for the visible explanation", () =>
    expect(evaluateExpression("1+2").tokens).toEqual(["1", "+", "2"]));
  it("bounds recursion via the public input length", () =>
    expect(() => evaluateExpression("-".repeat(121) + "1")).toThrow(
      "120 characters",
    ));
});
