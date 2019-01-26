import * as React from 'react';
import {render} from 'react-dom';

import AdsDashboard from '@pinecast/db-ads';
import AnalyticsDash from '@pinecast/db-analytics';
import AppsDashboard from '@pinecast/db-apps';
import {AudioUploader, ImageUploader} from '@pinecast/db-uploader';
import Categories from '@pinecast/db-categories';
import {ClientStyletron, StyletronProvider} from '@pinecast/styles';
import {Provider as I18nProvider} from '@pinecast/i18n';
import ImportTool from '@pinecast/db-import-tool';
import PublishPicker from '@pinecast/db-publish-picker';
import TipJarConnect from '@pinecast/db-tip-jar-connect';
import Upgrade, {UpgradeAdvertisements} from '@pinecast/db-upgrade';

import './pageScripts';

const styletron = new ClientStyletron();

type Mountable<T> = React.ComponentType<T> & {
  selector: string;
  propExtraction: {[P in keyof T]: (el: HTMLElement) => T[P]};
};

const components: Array<Mountable<{[key: string]: any}>> = [
  AdsDashboard,
  AnalyticsDash,
  AppsDashboard,
  AudioUploader,
  Categories,
  ImageUploader,
  ImportTool,
  PublishPicker,
  TipJarConnect,
  Upgrade,
  UpgradeAdvertisements,
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
