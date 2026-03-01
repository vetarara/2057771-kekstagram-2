const { checkLength } = require('./functions');

describe('should check if a string contains an allowed number of characters', () => {
  test('when the string contains fewer characters than the allowed number', () => {
    expect(checkLength('Тест', 10)).toBe(true);
  });

  test('when the string contains more characters than allowed', () => {
    expect(checkLength('Тестовая строка подлиннее', 5)).toBe(false);
  });

  test('when the string contains exactly the allowed number of characters', () => {
    expect(checkLength('01234', 5)).toBe(true);
  });

  test('when the string is empty and the limit is zero', () => {
    expect(checkLength('', 0)).toBe(true);
  });
});
