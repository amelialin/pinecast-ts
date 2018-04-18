import * as React from 'react';

import {CSS} from '@pinecast/styles';

import atom from '../atom';
import {Element} from '../../primitives';
import expandElementStyles from '../globalElementOptions';
import {extractProps} from '../extractor';
import {Page} from '../../primitives';

const Td = atom('td');
const Container = atom('table');

type BodyType = {[key: string]: Array<string> | string};
export default ({
  element,
  item,
  style = {},
}: {
  element: Element;
  item: BodyType;
  style: CSS;
}) => {
  const cellStyles = element.elementOptions
    ? element.elementOptions.cellStyles
    : null;
  function row(
    key,
    title,
    linkFormat: (string) => string = x => x,
    textFormat: (string) => string = x => x,
  ) {
    if (
      !(key in item) ||
      !item[key] ||
      (Array.isArray(item[key]) &&
        !(item[key] as Array<string>).some(x => Boolean(x)))
    ) {
      return null;
    }

    return (
      <tr key={key}>
        <Td style={cellStyles}>
          <strong>{title}</strong>
        </Td>
        <Td style={cellStyles}>
          {(Array.isArray(item[key])
            ? (item[key] as Array<string>)
            : [item[key] as string]
          )
            .map((value, i) => {
              return [
                <a href={linkFormat(value)} key={`span${i}`}>
                  {textFormat(value)}
                </a>,
                i !== item[key].length - 1 && <br key={`br${i}`} />,
              ];
            })
            .reduce((acc, cur) => acc.concat(cur))}
        </Td>
      </tr>
    );
  }

  return (
    <Container
      {...element.props}
      {...extractProps(item, element.propPaths)}
      item={item}
      style={{
        ...expandElementStyles(
          {...style, ...element.styles},
          element.elementOptions || {},
        ),
        border: 0,
        borderCollapse: 'collapse',
      }}
    >
      <tbody>
        {row('email', 'Email', x => `mailto:${x}`)}
        {row(
          'twitter',
          'Twitter',
          x => `https://twitter.com/${encodeURIComponent(x)}`,
          x => `@${x}`,
        )}
        {row('facebook', 'Facebook')}
        {row(
          'instagram',
          'Instagram',
          x => `https://www.instagram.com/${encodeURIComponent(x)}`,
          x => `@${x}`,
        )}
        {row(
          'twitch',
          'Twitch',
          x => `https://www.twitch.tv/${encodeURIComponent(x)}`,
        )}
        {row(
          'youtube',
          'YouTube',
          x => `https://www.youtube.com/${encodeURIComponent(x)}`,
        )}
      </tbody>
    </Container>
  );
};
