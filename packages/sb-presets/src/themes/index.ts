import * as React from 'react';

import {primitives} from '@pinecast/sb-components';

import clarity from './clarity';
import panther from './panther';
import podcasty from './podcasty';
import smooth from './smooth';
import zen from './zen';

type ThemeHash = {
  [theme: string]: {
    colors: {[color: string]: string};
    fonts: {
      logo: string;
      headings: string;
      body: string;
    };
    styling: {
      buttons: React.CSSProperties;
      page: primitives.PageStyle;
    };
    textStyles: {[type: string]: React.CSSProperties};
    options: {
      fixedWidthMax: number | null;
      rootFlexibleHeight: boolean;
      defaultConsumeCount: number;
      embedTheme: 'minimal' | 'slim' | 'thick';
    };
    layout: {
      header: Array<primitives.ComponentLayout>;
      footer: Array<primitives.ComponentLayout>;
      body: {
        home: {
          firstPagePrefix: Array<primitives.ComponentLayout>;
          segments: Array<primitives.LayoutConfig>;
        };
        episode: primitives.ElementLayout;
        page: {
          markdown: primitives.ElementLayout;
          contact: primitives.ElementLayout;
          hosts: primitives.ElementLayout;
        };
      };
    };
  };
};

export default ({
  clarity,
  panther,
  podcasty,
  smooth,
  zen,
} as unknown) as ThemeHash;
