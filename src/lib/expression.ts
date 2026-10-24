export function evaluateExpression(source: string): {
  tokens: string[];
  result: number;
} {
  if (source.length > 120) throw Error("Keep expressions to 120 characters.");
  const tokens = source.match(/\d*\.?\d+|[()+\-*/]|\S/g) ?? [];
  let index = 0;
  if (!tokens.length) throw Error("Type an expression to get started.");
  function primary(): number {
    const token = tokens[index++];
    if (token === "+" || token === "-") {
      const value = primary();
      return token === "-" ? -value : value;
    }
    if (token === "(") {
      const value = expression();
      if (tokens[index++] !== ")")
        throw Error("A closing parenthesis is missing.");
      return value;
    }
    if (token === undefined || !/^\d*\.?\d+$/.test(token))
      throw Error(
        `Expected a number${token ? " instead of “" + token + "”" : ""}.`,
      );
    return Number(token);
  }
  function term(): number {
    let value = primary();
    while (tokens[index] === "*" || tokens[index] === "/") {
      const op = tokens[index++],
        right = primary();
      if (op === "/" && right === 0)
        throw Error("Division by zero is undefined.");
      value = op === "*" ? value * right : value / right;
    }
    return value;
  }
  function expression(): number {
    let value = term();
    while (tokens[index] === "+" || tokens[index] === "-") {
      const op = tokens[index++],
        right = term();
      value = op === "+" ? value + right : value - right;
    }
    return value;
  }
  const result = expression();
  if (index < tokens.length)
    throw Error(`Unexpected token “${tokens[index]}”.`);
  if (!Number.isFinite(result))
    throw Error("The result is outside the supported numeric range.");
  return { tokens, result };
}
