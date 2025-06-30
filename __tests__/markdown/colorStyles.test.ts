import { describe, expect, test } from 'vitest';
import { processToHtml } from './lib';
describe('Color and Background-Color Styles', () => {
  test('should allow hex color shorthand', async () => {
    const input = `<p style="color: #f00">Red text</p>`;
    const expected = `<p style="color: #f00">Red text</p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should allow full hex color', async () => {
    const input = `<div style="background-color: #ffaa00"></div>`;
    const expected = `<div style="background-color: #ffaa00"></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should allow rgb() color function', async () => {
    const input = `<p style="color: rgb(255, 0, 128)"></p>`;
    const expected = `<p style="color: rgb(255, 0, 128)"></p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should allow rgba() color function with alpha', async () => {
    const input = `<div style="background-color: rgba(0, 0, 0, 0.5)"></div>`;
    const expected = `<div style="background-color: rgba(0, 0, 0, 0.5)"></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should allow named colors', async () => {
    const input = `<h1 style="color: rebeccapurple">Title</h1>`;
    const expected = `<h1 style="color: rebeccapurple" id="title"><a href="#title">Title</a></h1>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should allow the "transparent" keyword', async () => {
    const input = `<div style="background-color: transparent"></div>`;
    const expected = `<div style="background-color: transparent"></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  // --- Malicious / Invalid Tests ---

  test('should strip invalid color names', async () => {
    const input = `<p style="color: totally-not-a-color;">Invalid</p>`;
    // Expect the style attribute to be empty or removed if the only property is invalid
    const expected = `<p>Invalid</p>`; 
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should strip malformed hex values', async () => {
    const input = `<p style="color: #f0;">Malformed</p>`;
    const expected = `<p>Malformed</p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should strip CSS variables used in colors to prevent variable injection', async () => {
    const input = `<p style="color: var(--main-bg-color);">Text</p>`;
    const expected = `<p>Text</p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
});