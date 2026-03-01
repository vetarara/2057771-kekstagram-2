const { getNumbers } = require('./functions');

describe('should extract digits and return a positive integer', () => {
  test('when digits are at the start of the string', () => {
    expect(getNumbers('2023 год')).toBe(2023);
  });

  test('when digits are at the end of the string', () => {
    expect(getNumbers('ECMAScript 2022')).toBe(2022);
  });

  test('when digits are in different parts of the string', () => {
    expect(getNumbers('1 кефир, 0.5 батона')).toBe(105);
  });

  test('when there are leading zeros in the string', () => {
    expect(getNumbers('агент 007')).toBe(7);
  });

  test('when there are no digits in the string', () => {
    expect(getNumbers('а я томат')).toBe(NaN);
  });

  test('when the input is a positive number', () => {
    expect(getNumbers(2023)).toBe(2023);
  });

  test('when the input is a negative number', () => {
    expect(getNumbers(-1)).toBe(1);
  });

  test('when the input is a floating-point number', () => {
    expect(getNumbers(1.5)).toBe(15);
  });
});
