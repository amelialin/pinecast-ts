import * as React from 'react';
import {render} from 'react-dom';

import {ClientStyletron, StyletronProvider, styled} from '@pinecast/styles';
import Upgrade from '@pinecast/db-upgrade';

const styletron = new ClientStyletron();

type Mountable<T> = React.ComponentType<T> & {
  selector: string;
  propExtraction: {[P in keyof T]: (el: HTMLElement) => T[P]};
};

const components: Array<Mountable<{[key: string]: any}>> = [Upgrade];

components.forEach(component => {
  const elements = document.querySelectorAll(component.selector);
  if (!elements.length) {
    return;
  }
  Array.from(elements).forEach((elem: HTMLElement) => {
    render(
      <StyletronProvider styletron={styletron}>
        {React.createElement(
          component,
          Object.keys(component.propExtraction).reduce((acc, cur) => {
            acc[cur] = component.propExtraction[cur](elem);
            return acc;
          }, {}),
        )}
      </StyletronProvider>,
      elem,
    );
  });
});
