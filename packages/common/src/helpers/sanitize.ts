import escapeHTML from './escapeHTML';

const DEFAULT_ALLOWED_TAGS: Array<string> = [
  'A',
  'B',
  'BLOCKQUOTE',
  'BR',
  'CAPTION',
  'CODE',
  'DD',
  'DIV',
  'DL',
  'DT',
  'EM',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'HR',
  'I',
  'IMG',
  'LI',
  'NL',
  'OL',
  'P',
  'PRE',
  'SPAN',
  'STRIKE',
  'STRONG',
  'TABLE',
  'TBODY',
  'TD',
  'TH',
  'THEAD',
  'TR',
  'UL',
];

const DEFAULT_ALLOWED_ATTRIBUTES: {[tag: string]: Array<string>} = {
  A: ['href', 'title'],
  IMG: ['alt', 'src', 'title'],
};

const ALLOWED_SCHEMES: Array<string> = ['http://', 'https://'];

const SELF_CLOSING = ['IMG', 'BR', 'HR'];

export default function sanitize(
  markup: string,
  {
    allowedTags = DEFAULT_ALLOWED_TAGS,
    allowedAttributes = DEFAULT_ALLOWED_ATTRIBUTES,
  }: {
    allowedTags?: typeof DEFAULT_ALLOWED_TAGS;
    allowedAttributes?: typeof DEFAULT_ALLOWED_ATTRIBUTES;
  } = {},
): string {
  if (!markup) {
    return '';
  }
  const dp = new DOMParser();
  const doc = dp.parseFromString(markup, 'text/html');

  const output: Array<string> = [];

  function walk(node: Node, root?: boolean) {
    switch (node.nodeType) {
      case Node.TEXT_NODE:
        if (node.nodeValue) {
          output.push(escapeHTML(node.nodeValue));
        }
      case Node.CDATA_SECTION_NODE:
      case Node.COMMENT_NODE:
      case Node.PROCESSING_INSTRUCTION_NODE:
      case Node.DOCUMENT_TYPE_NODE:
        return;
    }
    const hasTag = !root && node.nodeType === Node.ELEMENT_NODE;
    const tagAllowed = !hasTag || allowedTags.includes(node.nodeName);
    if (!tagAllowed) {
      return;
    }
    if (hasTag) {
      output.push(`<${node.nodeName.toLowerCase()}`);

      const elem = node as Element;
      if (elem.hasAttributes()) {
        const allowed = allowedAttributes[node.nodeName] || [];
        for (const attr of elem.attributes) {
          const lowerName = attr.name.toLowerCase();
          if (!allowed.includes(lowerName)) {
            continue;
          }
          if (
            (lowerName === 'src' || lowerName === 'href') &&
            !ALLOWED_SCHEMES.some(scheme =>
              attr.value.toLowerCase().startsWith(scheme),
            )
          ) {
            continue;
          }
          output.push(` ${escapeHTML(lowerName)}="${escapeHTML(attr.value)}"`);
        }
      }

      output.push('>');

      if (SELF_CLOSING.includes(node.nodeName)) {
        return;
      }
    }

    for (const child of Array.from(node.childNodes)) {
      if (!child) {
        continue;
      }
      walk(child as Node);
    }

    if (hasTag) {
      output.push(`</${node.nodeName.toLowerCase()}>`);
    }
  }
  walk(doc.querySelector('html > body')!, true);

  return output.join('');
}
