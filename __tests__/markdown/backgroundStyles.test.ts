import { describe, expect, test } from 'vitest';
import { processToHtml } from './lib';

describe('Background Image and Shorthand Styles', () => {
  test('should allow background shorthand with color', async () => {
    const input = `<div style="background-color: #eee"></div>`;
    const expected = `<div style="background-color: #eee"></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should strip url in background-image', async () => {
    const input = `<div style="background-image: url('https://example.com/image.png')"></div>`;
    const expected = `<div></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should strip data URI for images in background', async () => {
    const input = `<div style="background: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"></div>`;
    const expected = `<div></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should strip background shorthand', async () => {
    const input = `<div style="background: #fff url('https://example.com/bg.jpg') no-repeat right top"></div>`;
    const expected = `<div></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should strip multiple background images', async () => {
    const input = `<div style="background-image: url(https://example.com/a.png), url(https://example.com/b.png)"></div>`;
    const expected = `<div></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should strip javascript protocol from url()', async () => {
    const input = `<div style="background-image: url('javascript:alert(1)')"></div>`;
    const expected = `<div></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should strip javascript protocol from url() even with encoding', async () => {
    const input = `<div style="background-image: url('j\navascript:alert(1)')"></div>`;
    const expected = `<div></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should strip url() pointing to an external script', async () => {
    const input = `<div style="background-image: url('http://evil.com/xss.js');"></div>`;
    // A robust sanitizer might allow the URL if it only checks protocol, 
    // but a stricter one might check file extensions or disallow http.
    // Assuming we allow https only for images, this should be stripped.
    const expected = `<div></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });

  test('should strip Data URI that is not an image (e.g., HTML)', async () => {
    const input = `<div style="background: url(data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pik="></div>`;
    const expected = `<div></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
  
  test('should strip property with unclosed url()', async () => {
    const input = `<div style="background: url(http://example.com/foo.png"></div>`;
    const expected = `<div></div>`;
    const result = await processToHtml(input);
    expect(result).toEqual(expected);
  });
});