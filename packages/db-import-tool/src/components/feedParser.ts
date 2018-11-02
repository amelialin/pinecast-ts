import {nullThrows} from '@pinecast/common/helpers';

import {Feed, FeedItem} from '../types';

export class FormatError extends Error {}

const namespaces: {[ns: string]: string} = {
  itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
  dc: 'http://purl.org/dc/elements/1.1/',
};
function getElementsByTagName(node: Element, tagName: string) {
  if (!tagName.includes(':')) {
    return node.getElementsByTagName(tagName);
  }
  const [ns, tag] = tagName.split(':');
  if (ns in namespaces) {
    const res = node.getElementsByTagNameNS(namespaces[ns], tag);
    if (res.length) {
      return res;
    }
  }
  return node.getElementsByTagName(tagName);
}

export function parseFeed(rawFeed: string): Feed {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(rawFeed, 'text/xml');
  if (parsed.querySelector('parsererror')) {
    throw new FormatError(
      'The RSS feed is not valid XML and could not be parsed.',
    );
  }

  const rss = nullThrows(parsed.querySelector('rss'));

  const name = firstTagText(rss, 'title');
  const {items, __ignored_items} = getItems(rss);
  return {
    name,
    homepage: firstTagText(rss, 'link'),
    description: firstTagText(rss, 'description', () =>
      firstTagText(rss, 'itunes:summary', name),
    ),

    // Optional elements
    language: firstTagText(rss, 'language', 'en-US'),
    copyright: firstTagText(rss, 'copyright', () =>
      firstTagText(rss, 'dc:copyright', ''),
    ),
    author_name: firstTagText(rss, 'itunes:author', ''),
    subtitle: firstTagText(rss, 'itunes:subtitle', ''),
    is_explicit: firstTagBool(rss, 'itunes:explicit'),
    cover_image: firstTagAttr(
      rss,
      'itunes:image',
      'href',
      () => firstTagText(rss, 'url'), // image > url
    ),
    categories: getCategories(rss),

    episode_release_type: firstTagText(rss, 'itunes:type', 'episodic') as any,

    items,
    __ignored_items,
  };
}

function getCategories(rss: Element): Array<string> {
  const categoryEls = getElementsByTagName(rss, 'itunes:category');
  const categories: Array<string> = [];

  for (const el of Array.from(categoryEls)) {
    let cat = el.getAttribute('text');
    if (!cat) {
      continue;
    }
    const parent: Element = nullThrows(el.parentNode) as Element;
    if (parent.nodeName.toLowerCase() === 'itunes:category') {
      if (!parent.getAttribute('text')) {
        continue;
      }
      cat = `${parent.getAttribute('text')}/${cat}`;
    }
    categories.push(cat);
  }

  return categories;
}

function getItems(
  rss: Element,
): {items: Array<FeedItem>; __ignored_items: number} {
  const nodes = getElementsByTagName(rss, 'item');
  if (!nodes.length) {
    throw new FormatError('No <item> nodes in the feed were found');
  }

  let ignored = 0;
  const items: Array<FeedItem> = [];
  for (const node of Array.from(nodes)) {
    const audioURL = firstTagAttr(node, 'enclosure', 'url', '');
    if (!audioURL) {
      ignored++;
      continue;
    }

    const duration = firstTagText(node, 'itunes:duration', '0:00');
    const durSeconds = parseDuration(duration);
    items.push({
      title: firstTagText(node, 'itunes:title', () =>
        firstTagText(node, 'title'),
      ),
      guid: firstTagText(node, 'guid'),
      description: firstTagText(
        node,
        'description',
        firstTagText(node, 'itunes:summary', 'No description'),
      ),
      subtitle: firstTagText(node, 'itunes:subtitle', ''),
      publish: parseDate(firstTagText(node, 'pubDate')),
      image_url: firstTagAttr(node, 'itunes:image', 'href', () =>
        firstTagAttr(node, 'media:content', 'url', ''),
      ),
      duration: durSeconds,
      audio_url: audioURL,
      audio_size: numberNotNan(firstTagAttr(node, 'enclosure', 'length', '0')),
      audio_type: firstTagAttr(node, 'enclosure', 'type', 'audio/mp3'),
      copyright: firstTagText(node, 'dc:copyright', ''),
      license: firstTagText(node, 'dc:rights', ''),
      season: numberNotNan(firstTagText(node, 'itunes:season', '0')),
      season_episode: numberNotNan(firstTagText(node, 'itunes:episode', '0')),
      episode_type: firstTagText(node, 'itunes:episodeType', 'full') as any,
    });
  }
  return {items, __ignored_items: ignored};
}

function numberNotNan(val: string): number {
  const num = Number(val);
  return isNaN(num) ? 0 : num;
}
function parseDate(date: string): string {
  const parsed = new Date(date);
  if (parsed.toString() === 'Invalid Date') {
    throw new FormatError(`Date cannot be parsed: ${date}`);
  }
  return parsed.toISOString();
}

function parseDuration(duration: string): number {
  let durTup: Array<number>;
  try {
    durTup = duration
      .replace(/::/g, ':')
      .split(':')
      .map(val => numberNotNan(val || '0'));
  } catch {
    return 0;
  }

  const size = durTup.length;
  if (size > 3) {
    durTup.splice(0, size - 3);
  }
  return durTup
    .map((x, i) => x * 60 ** (durTup.length - i - 1))
    .reduce((a, b) => a + b);
}

type Defaultable = (() => string) | string;

function getDefault(value: Defaultable): string {
  return typeof value === 'function' ? value() : value;
}

function firstTagText(
  dom: Element,
  tag: string,
  def: Defaultable | null = null,
): string {
  const node = getFirstTag(dom, tag, def);
  if (typeof node === 'string') {
    return node;
  }
  const text: Array<string> = [];
  for (const n of node.childNodes) {
    if (
      (n.nodeType === n.TEXT_NODE || n.nodeType === n.CDATA_SECTION_NODE) &&
      n.nodeValue
    ) {
      text.push(n.nodeValue);
    }
  }
  return text.join('') || (def && getDefault(def)) || '';
}

function firstTagAttr(
  dom: Element,
  tag: string,
  attribute: string,
  def: Defaultable | null = null,
): string {
  const node = getFirstTag(dom, tag, def);
  if (typeof node === 'string') {
    return (def && getDefault(def)) || '';
  }
  const val = node.getAttribute(attribute);
  if (val) {
    return val;
  }
  if (def) {
    return getDefault(def);
  }
  throw new FormatError(
    `Node <${tag}> does not have expected attribute ${attribute}=""`,
  );
}

function firstTagBool(
  dom: Element,
  tag: string,
  def: Defaultable | null = null,
): boolean {
  return (
    firstTagText(dom, tag, () => (def && getDefault(def) ? 'yes' : 'no')) ===
    'yes'
  );
}

function getFirstTag(
  dom: Element,
  tag: string,
  def: Defaultable | null = null,
): Element | string {
  const elem = getElementsByTagName(dom, tag)[0];
  if (!elem && def === null) {
    throw new FormatError(
      `Could not find expected tag <${tag}> in <${dom.nodeName}>`,
    );
  } else if (!elem && def !== null) {
    return getDefault(def);
  } else {
    return elem as Element;
  }
}
