import {connect} from 'react-redux';
import * as React from 'react';

import {matchRoute, routes} from '@pinecast/sb-renderer';
import styled from '@pinecast/sb-styles';

import {changePath} from './actions/preview';
import {fetcher} from './data/dataAPI';
import {ReducerType} from './reducer';
import Select from './common/Select';

const UTIL_PAGE_HEAD = `
<head>
  <link href="https://fonts.googleapis.com/css?family=Fira+Mono:400,500" rel="stylesheet">
  <style>
    body, html {
      align-items: center;
      display: flex;
      flex-direction: column;
      font-family: sans-serif;
      height: 100%;
      justify-content: center;
      text-align: center;
    }
    body {padding: 0; margin: 0; font-family: Fira Mono, Helvetica, Arial, sans-serif;}
    .btn {
      display: inline-block;
      background: #fff;
      border-radius: 3px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15), 0 5px 12px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(60, 60, 60, 0.15);
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
      box-shadow: 0 3px 7px rgba(0, 0, 0, 0.2), 0 8px 17px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(60, 60, 60, 0.15);
    }
    .btn:active {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 5px 17px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(60, 60, 60, 0.15);
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
  alignItems: 'center',
  backgroundColor: '#fafafa',
  boxShadow: 'inset 0 35px 30px rgba(0, 20, 50, 0.15)',
  display: 'flex',
  flex: '1 1',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  overflow: 'hidden',
  paddingTop: 40,
  position: 'relative',
});
const Toolbar = styled('div', {
  alignItems: 'center',
  background: '#99a',
  display: 'flex',
  flex: '0 0 40px',
  height: 40,
  left: 0,
  padding: '0 4px',
  position: 'absolute',
  right: 0,
  top: 0,
});

function getQuery(url: string): {[key: string]: string} {
  if (!url.includes('?')) {
    return {};
  }
  const [, qs] = url.split('?', 2);
  return qs
    .split('&')
    .map(s => s.split('=', 2))
    .reduce((acc, [k, v]) => {
      acc[decodeURIComponent(k)] = decodeURIComponent(v);
      return acc;
    }, {});
}

const frameStyles = {
  desktop: {height: '100%', transform: 'scale(1)', width: '100%'},
  phone: {height: 732, transform: 'scale(0.9)', width: 412},
  tablet: {height: 1024, transform: 'scale(0.85)', width: 768},
};

class PreviewRenderer extends React.Component {
  iframe: HTMLIFrameElement | null;
  reqId: number;
  props: {
    changePath: (path: string) => void;
    path: string;
    slug: string;
    theme: Object;
  };
  state: {
    frame: null | 'mobile' | 'tablet';
    orientation: null | 'portrait' | 'landscape';
  };

  constructor(props) {
    super(props);
    this.reqId = 0;

    this.state = {
      frame: null,
      orientation: null,
    };
  }

  ref = (e: HTMLIFrameElement | null) => {
    this.iframe = e;
    if (e) {
      this.doInnerRender();
      (e as any).__handler = this.props.changePath;
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.path !== nextProps.path ||
      this.props.theme !== nextProps.theme ||
      this.state.frame !== nextState.frame ||
      this.state.orientation !== nextState.orientation
    );
  }

  componentDidUpdate(prevProps) {
    if (
      this.iframe &&
      (this.props.path !== prevProps.path ||
        this.props.theme !== prevProps.theme)
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
      this.iframe.src = `data:text/html,${content}`;
      console.log(`\`src\` applied with ${content.length + 15} bytes`);
    }
  }

  handleFrameChange = (frame: string) => {
    if (frame === 'desktop') {
      this.setState({frame: null, orientation: null});
      return;
    }
    this.setState({frame});
  };
  handleOrientationChange = (orientation: string) => {
    this.setState({orientation});
  };

  render() {
    const {frame, orientation} = this.state;
    const {height, transform, width} = frameStyles[frame || 'desktop'];
    return (
      <Wrapper>
        <Toolbar>
          <Select
            onChange={this.handleFrameChange}
            options={{
              desktop: 'Desktop',
              phone: 'Phone',
              tablet: 'Tablet',
            }}
            style={{height: 32, marginRight: 4}}
            value={frame || 'desktop'}
          />
          {frame && (
            <Select
              onChange={this.handleOrientationChange}
              options={{
                portrait: 'Portrait',
                landscape: 'Landscape',
              }}
              style={{height: 32}}
              value={orientation || 'portrait'}
            />
          )}
        </Toolbar>
        <iframe
          ref={this.ref}
          style={{
            border: 0,
            boxShadow:
              '0 2px 5px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.125)',
            height: orientation === 'landscape' ? width : height,
            transform,
            transition: 'width 0.2s, height 0.2s, transform 0.2s',
            width: orientation === 'landscape' ? height : width,
          }}
        />
      </Wrapper>
    );
  }
}

export default connect(
  (state: ReducerType) => ({
    path: state.preview.path,
    slug: state.slug,
    theme: state.theme,
  }),
  {changePath},
)(PreviewRenderer);
