import * as React from 'react';

import {ElementLayout} from '../../primitives';
import Button from '../../common/button';
import {ComponentContext, getsContext} from '../../componentContext';
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
                  (ctx.pagination.page - 1 !== 1
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
                  marginLeft: ctx.pagination.has_previous ? '0.5em' : undefined,
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
