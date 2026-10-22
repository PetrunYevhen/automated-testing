import { describe, it, expect } from 'vitest';
import { applyGiftCard } from '../src/order';

describe('applyGiftCard', () => {
  it('списує весь баланс і лишає доплатити різницю, якщо картки не вистачає', () => {
    // Arrange
    const total = 500;
    const cardBalance = 200;

    // Act
    const result = applyGiftCard(total, cardBalance);

    // Assert
    expect(result).toEqual({
      toPay: expect.closeTo(300, 2),
      remaining: expect.closeTo(0, 2),
    });
  });

  it('повністю оплачує замовлення й лишає залишок, якщо на картці достатньо коштів', () => {
    expect(applyGiftCard(500, 800)).toEqual({
      toPay: expect.closeTo(0, 2),
      remaining: expect.closeTo(300, 2),
    });
  });

  // Межа — баланс, що дорівнює сумі замовлення (500): «межа − 1», «межа», «межа + 1».
  it.each([
    { cardBalance: 499, toPay: 1, remaining: 0 },
    { cardBalance: 500, toPay: 0, remaining: 0 },
    { cardBalance: 501, toPay: 0, remaining: 1 },
  ])(
    'на межі повної оплати: баланс $cardBalance → доплата $toPay, залишок $remaining',
    ({ cardBalance, toPay, remaining }) => {
      expect(applyGiftCard(500, cardBalance)).toEqual({
        toPay: expect.closeTo(toPay, 2),
        remaining: expect.closeTo(remaining, 2),
      });
    },
  );

  // Межа — копійка: найменша ненульова різниця між сумою й балансом.
  it.each([
    { cardBalance: 99.99, toPay: 0.01, remaining: 0 },
    { cardBalance: 100.01, toPay: 0, remaining: 0.01 },
  ])(
    'розрізняє різницю в одну копійку: баланс $cardBalance',
    ({ cardBalance, toPay, remaining }) => {
      expect(applyGiftCard(100, cardBalance)).toEqual({
        toPay: expect.closeTo(toPay, 3),
        remaining: expect.closeTo(remaining, 3),
      });
    },
  );

  it('не додає нічого до оплати, якщо баланс картки нульовий', () => {
    expect(applyGiftCard(250.5, 0)).toEqual({
      toPay: expect.closeTo(250.5, 2),
      remaining: expect.closeTo(0, 2),
    });
  });

  it('залишає баланс недоторканим, якщо сума замовлення нульова', () => {
    expect(applyGiftCard(0, 75)).toEqual({
      toPay: expect.closeTo(0, 2),
      remaining: expect.closeTo(75, 2),
    });
  });

  it('приймає нульову суму й нульовий баланс одночасно', () => {
    expect(applyGiftCard(0, 0)).toEqual({
      toPay: expect.closeTo(0, 2),
      remaining: expect.closeTo(0, 2),
    });
  });

  // Тут свідомо toBe: перевіряється саме заокруглення, а допуск toBeCloseTo його б не помітив.
  it('заокруглює доплату до копійок, а не віддає похибку рухомої коми', () => {
    // 0.3 − 0.1 у double дає 0.19999999999999998
    expect(applyGiftCard(0.3, 0.1).toPay).toBe(0.2);
  });

  it('заокруглює залишок до копійок, а не віддає похибку рухомої коми', () => {
    // 0.3 − 0.1 у double дає 0.19999999999999998
    expect(applyGiftCard(0.1, 0.3).remaining).toBe(0.2);
  });

  it.each([-0.01, -100, NaN, Infinity])(
    'відхиляє некоректну суму замовлення %s',
    (total) => {
      expect(() => applyGiftCard(total, 100)).toThrow('INVALID_TOTAL');
    },
  );

  it.each([-0.01, -100, NaN, -Infinity])(
    'відхиляє некоректний баланс картки %s',
    (cardBalance) => {
      expect(() => applyGiftCard(100, cardBalance)).toThrow('INVALID_BALANCE');
    },
  );

  it('повідомляє про некоректну суму раніше, ніж про некоректний баланс', () => {
    expect(() => applyGiftCard(-1, -1)).toThrow('INVALID_TOTAL');
  });
});
