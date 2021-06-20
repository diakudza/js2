const script = require("../src/pow");
const pow = script.pow;

describe("Функция pow()", () => {
  it("должна возвращать 9 при аргументах (3,2)", () => {
    expect(pow(3, 2)).toBe(9);
  });

  it("должна возвращать 8 при аргументах (2,3)", () => {
    expect(pow(2, 3)).toBe(8);
  });

  it("должна возвращать null при аргументах (null, 2)", () => {
    expect(pow(null, 2)).toBe(null);
  });
});
