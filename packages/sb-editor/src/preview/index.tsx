import {connect} from 'react-redux';
import * as React from 'react';

import {matchRoute} from '@pinecast/sb-renderer';
import styled from '@pinecast/styles';

import {changePath} from '../actions/preview';
import {fetcher} from '../data/dataAPI';
import FullScreenWrapper from './FullScreenWrapper';
import PreviewToolbar, {FrameType, OrientationType} from './PreviewToolbar';
import {ReducerType} from '../reducer';
import {
  DEFAULT_FONT,
  DEFAULT_FONT_CSS_IMPORT,
} from '@pinecast/common/constants';

const UTIL_PAGE_HEAD = `
<head>
  <style>
    ${DEFAULT_FONT_CSS_IMPORT}
    body, html {
      align-items: center;
      display: flex;
      flex-direction: column;
      font-family: sans-serif;
      height: 100%;
      justify-content: center;
      text-align: center;
    }
    body {padding: 0; margin: 0; font-family: ${DEFAULT_FONT}, Helvetica, Arial, sans-serif;}
    .btn {
      display: inline-block;
      background: #fff;
      border-radius: 3px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), 0 0 0 0.5px rgba(0, 0, 0, .15);
      color: #000;
      font-size: 13px;
      font-weight: 500;
      height: 30px;
      line-height: 30px;
      padding: 0px 15px;
      text-decoration: none;
      transition: box-shadow 0.2s;
    }
    .btn:hover {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(0, 0, 0, .15);
    }
    .btn:active {
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15);
    }
  </style>
</head>
`;
const PAGE_LOADING = `
<html>
  ${UTIL_PAGE_HEAD}
  <body>
    <p>Loading...</p>
  </body>
</html>
`;
const PAGE_404 = `
<html>
  ${UTIL_PAGE_HEAD}
  <body>
    <p>That page was not found.</p>
    <a class="btn" href="#" onclick="window.frameElement.__handler('/?_=' + Math.random()); return false;">
      Return home…
    </a>
  </body>
</html>
`;

const Wrapper = styled('div', {
  flex: '1 1',
  height: '100%',
  position: 'relative',
});

function getQuery(url: string): {[key: string]: string} {
  if (!url.includes('?')) {
    return {};
  }
  const [, qs] = url.split('?', 2);
  return qs
    .split('&')
    .map(s => s.split('=', 2))
    .reduce(
      (acc, [k, v]) => {
        acc[decodeURIComponent(k)] = decodeURIComponent(v);
        return acc;
      },
      {} as {[key: string]: string},
    );
}

const frameStyles: {
  [key: string]: {
    height: React.CSSProperties['height'];
    transform: React.CSSProperties['transform'];
    width: React.CSSProperties['width'];
  };
} = {
  desktop: {height: '100%', transform: 'scale(1)', width: '100%'},
  phone: {height: 732, transform: 'scale(0.9)', width: 412},
  tablet: {height: 1024, transform: 'scale(0.85)', width: 768},
};

class PreviewRenderer extends React.Component {
  iframe: HTMLIFrameElement | null;
  reqId: number = 0;
  props: {
    changePath: (path: string) => any;
    children?: any; // FIXME: required by react-redux
    path: string;
    refreshIncrement: number;
    slug: string;
    theme: ReducerType['theme'];
  };
  state: {
    frame: null | 'mobile' | 'tablet';
    fullScreen: false;
    orientation: null | 'portrait' | 'landscape';
  } = {
    frame: null,
    fullScreen: false,
    orientation: null,
  };

  ref = (e: HTMLIFrameElement | null) => {
    this.iframe = e;
    if (e) {
      this.doInnerRender();
      (e as any).__handler = this.props.changePath;
    }
  };

  shouldComponentUpdate(
    nextProps: PreviewRenderer['props'],
    nextState: PreviewRenderer['state'],
  ) {
    return (
      this.props.path !== nextProps.path ||
      this.props.theme !== nextProps.theme ||
      this.props.refreshIncrement !== nextProps.refreshIncrement ||
      this.state.frame !== nextState.frame ||
      this.state.orientation !== nextState.orientation ||
      this.state.fullScreen !== nextState.fullScreen
    );
  }

  componentDidUpdate(prevProps: PreviewRenderer['props']) {
    if (
      this.iframe &&
      (this.props.path !== prevProps.path ||
        this.props.theme !== prevProps.theme ||
        this.props.refreshIncrement !== prevProps.refreshIncrement)
    ) {
      this.doInnerRender();
    }
  }

  doInnerRender() {
    this.reqId += 1;
    const reqId = this.reqId;
    console.log(`Rendering as request ${reqId}`);

    const routeTuple = matchRoute(this.props.path);
    if (!routeTuple) {
      this.displayContent(PAGE_404);
      return;
    }
    const [route, params] = routeTuple;
    route
      .build(
        fetcher(this.props.theme),
        this.props.slug,
        getQuery(this.props.path),
        params,
      )
      .then(
        content => {
          if (this.reqId !== reqId) {
            return;
          }
          this.displayContent(content, true);
        },
        err => {
          if (err) {
            console.error(err);
          }
          if (this.reqId !== reqId) {
            return;
          }
          this.displayContent(PAGE_404);
        },
      );
    this.displayContent(PAGE_LOADING);
  }

  async displayContent(content: string, isRendered?: boolean) {
    if (!this.iframe) {
      return;
    }
    if (isRendered) {
      console.log(`Displaying content for request ${this.reqId}`);
    }
    await new Promise(r => setTimeout(r, 100));

    if ('srcdoc' in this.iframe) {
      (this.iframe as any).srcdoc = content;
      console.log(`\`srcdoc\` applied with ${content.length} bytes`);
    } else {
      console.warn('`srcdoc` not detected; falling back on data URI');
      (this.iframe as any).src = `data:text/html,${content}`;
      console.log(`\`src\` applied with ${content.length + 15} bytes`);
    }
  }

  handleFrameOrientationChange = (
    frame: FrameType,
    orientation: OrientationType,
  ) => {
    if (frame === 'desktop') {
      this.setState({frame: null, orientation: null});
      return;
    }
    this.setState({frame, orientation});
  };
  handleToggleFullScreen = (fullScreen: boolean) => {
    this.setState({fullScreen});
  };

  render() {
    const {frame, fullScreen, orientation} = this.state;
    const {height, transform, width} = frameStyles[frame || 'desktop'];
    return (
      <Wrapper>
        <FullScreenWrapper fullScreen={fullScreen}>
          <PreviewToolbar
            frame={frame || 'desktop'}
            isFullScreen={fullScreen}
            onChange={this.handleFrameOrientationChange}
            onToggleFullScreen={this.handleToggleFullScreen}
            orientation={orientation}
          />
          <iframe
            ref={this.ref}
            style={{
              border: 0,
              boxShadow:
                '0 2px 5px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.125)',
              height: orientation === 'landscape' ? width : height,
              maxHeight: '100%',
              transform,
              transition: 'width 0.2s, height 0.2s, transform 0.2s',
              width: orientation === 'landscape' ? height : width,
            }}
          />
        </FullScreenWrapper>
      </Wrapper>
    );
  }
}

export default connect(
  (state: ReducerType) => ({
    path: state.preview.path,
    refreshIncrement: state.preview.refreshIncrement,
    slug: state.slug || '',
    theme: state.theme,
  }),
  {changePath},
)(PreviewRenderer);
