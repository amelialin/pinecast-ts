import * as React from 'react';

import TooltipContainer, {HelpIcon} from '@pinecast/common/TooltipContainer';

export default {
  name: 'Tooltip container',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <React.Fragment>
          <TooltipContainer tooltipContent="Hey, it me.">
            This text has a tooltip
          </TooltipContainer>{' '}
          and also{' '}
          <TooltipContainer tooltipContent="It me again.">
            this text
          </TooltipContainer>.
        </React.Fragment>
      ),
    },
    {
      title: 'Help icon',
      render: () => (
        <HelpIcon>
          <b>This is a helpful message!</b>
          Look at how helpful it is.
        </HelpIcon>
      ),
    },
  ],
};
