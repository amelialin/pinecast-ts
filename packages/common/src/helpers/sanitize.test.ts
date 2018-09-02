import sanitize from './sanitize';

describe('sanitize', () => {
  it('should remove banned nodes', () => {
    expect(sanitize(`<script>alert('poop')</script>`)).toBe('');
    expect(sanitize(`<foo>inner</foo>`, {allowedTags: ['BAR']})).toBe('');
    expect(sanitize(`<foo>inner</foo>`, {allowedTags: ['FOO']})).toBe(
      '<foo>inner</foo>',
    );
  });
  it('should remove banned attributes', () => {
    expect(sanitize(`<a rel="hello">inner</a>`)).toBe('<a>inner</a>');
    expect(sanitize(`<a title="hello">inner</a>`)).toBe(
      '<a title="hello">inner</a>',
    );
    expect(sanitize(`<img onerror="alert('poop')">`)).toBe('<img>');
  });
  it('should sanitize URLs', () => {
    expect(sanitize(`<a href="hello">inner</a>`)).toBe('<a>inner</a>');
    expect(sanitize(`<a href="ftp://foo.bar">inner</a>`)).toBe('<a>inner</a>');
    expect(sanitize(`<a href="file:///foo/">inner</a>`)).toBe('<a>inner</a>');
    expect(sanitize(`<a href="//foo/">inner</a>`)).toBe('<a>inner</a>');
    expect(sanitize(`<a href="foo">inner</a>`)).toBe('<a>inner</a>');
    expect(sanitize(`<a href="https://foo.com">inner</a>`)).toBe(
      '<a href="https://foo.com">inner</a>',
    );
    expect(sanitize(`<a href="http://foo.com">inner</a>`)).toBe(
      '<a href="http://foo.com">inner</a>',
    );
  });
  it('should understand self closing tags', () => {
    expect(sanitize(`<br>foo</br>`)).toBe('<br>foo<br>');
    expect(sanitize(`<hr>foo</hr>`)).toBe('<hr>foo');
    expect(
      sanitize(`<img src="https://foo.bar/jpg">foo</img>`, {
        allowedTags: ['IMG'],
      }),
    ).toBe('<img src="https://foo.bar/jpg">foo');
  });
  it('should sanitize html', () => {
    expect(sanitize(`<div>alert&gt;&lt;('poop')</div>`)).toBe(
      '<div>alert&gt;&lt;(&#x27;poop&#x27;)</div>',
    );
  });
});
