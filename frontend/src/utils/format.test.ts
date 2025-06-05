import { formatPrice } from './format';

describe('formatPrice', () => {
  test('formats positive numbers correctly', () => {
    expect(formatPrice(1234.56)).toBe('$1,234.56');
    expect(formatPrice(999.99)).toBe('$999.99');
    expect(formatPrice(1000000)).toBe('$1,000,000.00');
  });

  test('handles zero correctly', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  test('handles single digit correctly', () => {
    expect(formatPrice(5)).toBe('$5.00');
  });

  test('handles numbers with no decimal places', () => {
    expect(formatPrice(1234)).toBe('$1,234.00');
  });

  test('handles numbers with one decimal place', () => {
    expect(formatPrice(1234.5)).toBe('$1,234.50');
  });

  test('rounds to two decimal places', () => {
    expect(formatPrice(1234.567)).toBe('$1,234.57');
    expect(formatPrice(1234.564)).toBe('$1,234.56');
  });
});
