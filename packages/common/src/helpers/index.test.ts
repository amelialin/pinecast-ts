import {shallowCompare, url} from './index';

describe('url', () => {
  it('should handle normal URL cases', () => {
    expect(url`http://foo.bar/${'asdf'}?abc=${'a b c'}`).toBe(
      'http://foo.bar/asdf?abc=a%20b%20c',
    );
  });
  it('should handle the URL ending with a value', () => {
    expect(url`http://foo.bar/${'asdf'}`).toBe('http://foo.bar/asdf');
  });
  it('should handle null', () => {
    expect(url`http://foo.bar/${null}`).toBe('http://foo.bar/');
  });
  it('should handle strings without bits', () => {
    expect(url`http://foo.bar/`).toBe('http://foo.bar/');
  });
});

describe('shallowCompare', () => {
  it('should pass for matched objects', () => {
    expect(shallowCompare({a: 'asdf'}, {a: 'asdf'})).toBe(true);
  });
  it('should fail for mismatched values', () => {
    expect(shallowCompare({a: 1234}, {a: 'asdf'})).toBe(false);
  });
  it('should fail for mismatched keys', () => {
    expect(shallowCompare({a: 'asdf'}, {b: 'asdf'})).toBe(false);
    expect(shallowCompare({a: 'asdf'}, {})).toBe(false);
    expect(shallowCompare({}, {a: 'asdf'})).toBe(false);
  });
});
