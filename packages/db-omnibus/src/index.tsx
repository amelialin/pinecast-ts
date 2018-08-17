import * as React from 'react';
import {render} from 'react-dom';

import AnalyticsDash from '@pinecast/db-analytics';
import {AudioUploader, ImageUploader} from '@pinecast/db-uploader';
import {ClientStyletron, StyletronProvider} from '@pinecast/styles';
import {Provider as I18nProvider} from '@pinecast/i18n';
import ImportTool from '@pinecast/db-import-tool';
import Spotify from '@pinecast/db-spotify';
import Upgrade from '@pinecast/db-upgrade';

import './pageScripts';

const styletron = new ClientStyletron();

type Mountable<T> = React.ComponentType<T> & {
  selector: string;
  propExtraction: {[P in keyof T]: (el: HTMLElement) => T[P]};
};

const components: Array<Mountable<{[key: string]: any}>> = [
  AnalyticsDash,
  AudioUploader,
  ImageUploader,
  ImportTool,
  Spotify,
  Upgrade,
];

components.forEach(component => {
  const elements = document.querySelectorAll(component.selector);
  if (!elements.length) {
    return;
  }
  Array.from(elements).forEach((elem: HTMLElement) => {
    render(
      <I18nProvider locale="en">
        <StyletronProvider styletron={styletron}>
          {React.createElement(
            component,
            Object.keys(component.propExtraction).reduce(
              (acc, cur) => {
                acc[cur] = component.propExtraction[cur](elem);
                return acc;
              },
              {} as {[key: string]: any},
            ),
          )}
        </StyletronProvider>
      </I18nProvider>,
      elem,
    );
  });
});
