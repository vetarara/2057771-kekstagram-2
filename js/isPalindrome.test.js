const { isPalindrome } = require('./functions');

describe('should check if a string is a palindrome', () => {
  test('when the string is a single-word palindrome', () => {
    expect(isPalindrome('топот')).toBe(true);
  });

  test('when the palindrome contains mixed letter case', () => {
    expect(isPalindrome('Was it a Car or a Cat I saw')).toBe(true);
  });

  test('when the string is not a palindrome', () => {
    expect(isPalindrome('любая тестовая фраза')).toBe(false);
  });
});
