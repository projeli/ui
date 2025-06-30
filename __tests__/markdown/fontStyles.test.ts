import { describe, expect, test } from 'vitest';
import { processToHtml } from './lib';

// Test suite for font-related properties
describe('Font Styles', () => {
  test('should allow basic font-family', async () => {
    const input = `<p style="font-family: Arial, sans-serif"></p>`;
    const expected = `<p style="font-family: Arial, sans-serif"></p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should allow quoted font-family names', async () => {
    const input = `<p style="font-family: Times New Roman, serif"></p>`;
    const expected = `<p style="font-family: Times New Roman, serif"></p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should allow font-size with px units', async () => {
    const input = `<p style="font-size: 16px"></p>`;
    const expected = `<p style="font-size: 16px"></p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should allow font-size with em units', async () => {
    const input = `<p style="font-size: 1.2em"></p>`;
    const expected = `<p style="font-size: 1.2em"></p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should allow font-weight with keyword', async () => {
      const expected = `<p><strong style="font-weight: bold"></strong></p>`;
      const input = `<p><strong style="font-weight: bold"></strong></p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should allow font-weight with number', async () => {
    const input = `<p><span style="font-weight: 700"></span></p>`;
    const expected = `<p><span style="font-weight: 700"></span></p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should allow font-style', async () => {
    const input = `<p><em style="font-style: italic"></em></p>`;
    const expected = `<p><em style="font-style: italic"></em></p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should strip font-family with HTML tags inside', async () => {
    const input = `<p style="font-family: '><script>alert(1)</script>';"></p>`;
    const expected = `<p></p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should strip font-size with a negative value', async () => {
    const input = `<p style="font-size: -12px;"></p>`;
    const expected = `<p></p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should strip font-size with the calc() function', async () => {
    const input = `<p style="font-size: calc(10px + 2px);"></p>`;
    const expected = `<p></p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
});