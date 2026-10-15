import { describe, it, expect } from 'vitest';
import { isPalindrome } from '../src/palindrome';

describe('isPalindrome', () => {
  it('визнає паліндромом слово, що однаково читається в обидва боки', () => {
    // Arrange
    const text = 'level';

    // Act
    const result = isPalindrome(text);

    // Assert
    expect(result).toBe(true);
  });

  it('ігнорує регістр і пробіли у фразі-паліндромі', () => {
    expect(isPalindrome('А роза упала на лапу Азора')).toBe(true);
  });

  it('повертає false для рядка, що не є паліндромом', () => {
    expect(isPalindrome('hello')).toBe(false);
  });

  it('вважає паліндромом рядок із одного символу', () => {
    expect(isPalindrome('a')).toBe(true);
  });

  it('відхиляє порожній рядок', () => {
    expect(() => isPalindrome('')).toThrow('EMPTY_STRING');
  });

  it('відхиляє рядок, що складається лише з пробілів', () => {
    expect(() => isPalindrome('   ')).toThrow('EMPTY_STRING');
  });
});
