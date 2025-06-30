import { describe, expect, test } from 'vitest';
import { processToHtml } from './lib';

// Test suite for explicitly malicious or dangerous code
describe('Malicious and Dangerous Code Sanitization', () => {
  test('should strip CSS expression()', async () => {
    const input = `<div style="width: expression(alert('XSS'));"></div>`;
    const expected = `<div></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should strip -moz-binding', async () => {
    const input = `<div style="-moz-binding: url('http://evil.com/xss.xml#xss')"></div>`;
    const expected = `<div></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should strip styles with @import rules', async () => {
    // Note: @import is not valid in an inline style, but a weak parser could be fooled.
    // This is more relevant for <style> tags, but good to test here.
    const input = `<div style="@import url('http://evil.com/styles.css');"></div>`;
    const expected = `<div></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should strip CSS with escaped malicious keywords', async () => {
    const input = `<div style="w\\idth: e\\xpression(alert(1))"></div>`;
    const expected = `<div></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should strip position:fixed to prevent clickjacking', async () => {
    // Allowing position:fixed can be used to overlay content on the page.
    // A strict sanitizer might disallow it.
    const input = `<div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;"></div>`;
    const expected = `<div style="top: 0; left: 0; width: 100%; height: 100%"></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should strip <script> tags entirely', async () => {
    const input = `<p>Some text</p><script>alert('XSS')</script>`;
    const expected = `<p>Some text</p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should strip onerror attributes', async () => {
    const input = `<img src="x" onerror="alert('XSS')">`;
    const expected = `<img src="x">`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should strip javascript: hrefs', async () => {
    const input = `<p><a href="javascript:alert('XSS')">Click me</a></p>`;
    const expected = `<p><a>Click me</a></p>`; // href is removed
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should strip <style> tags', async () => {
    const input = `<style>body { background: url('javascript:alert(1)'); }</style><p>Hello</p>`;
    const expected = `body { background: url('javascript:alert(1)'); }<p>Hello</p>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should strip `formaction` attribute on buttons', async () => {
    const input = `<form action="/legit"><input type="submit" formaction="javascript:alert(1)"></form>`;
    const expected = `<input disabled type="checkbox">`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
});