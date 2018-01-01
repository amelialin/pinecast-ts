import * as React from 'react';

import {backgroundImage} from '../../styleMixins';
import {ButtonStyle, ElementLayout} from '../../primitives';
import Button from '../../common/button';
import {ComponentContext, getsContext} from '../../componentContext';
import {formatColor} from '../../helpers';
import {MountProvider} from '../mounts';
import renderElements from '../../elements';

export default getsContext(
  (
    {
      layout,
      template,
    }: {
      layout: {
        nextText: string;
        previousText: string;
      };
      template: ElementLayout;
    },
    {ctx}: {ctx: ComponentContext},
  ) =>
    ctx.pagination ? (
      <MountProvider
        children={renderElements('mount', ctx.data, template)}
        mounts={{
          previousLink:
            (ctx.pagination.has_previous && (
              <Button
                {...ctx.styling.buttons}
                href={
                  ctx.url('home') +
                  (ctx.pagination.page !== 2
                    ? `?page=${ctx.pagination.page - 1}`
                    : '')
                }
                style={{
                  marginBottom: '0.5em',
                }}
              >
                {layout.previousText}
              </Button>
            )) ||
            null,
          nextLink:
            (ctx.pagination.has_next && (
              <Button
                {...ctx.styling.buttons}
                href={ctx.url('home') + `?page=${ctx.pagination.page + 1}`}
                style={{
                  marginBottom: '0.5em',
                  marginLeft: ctx.pagination.has_previous ? '0.5em' : null,
                  marginRight: ctx.pagination.has_previous ? '0.5em' : null,
                }}
              >
                {layout.nextText}
              </Button>
            )) ||
            null,
        }}
      />
    ) : null,
);
