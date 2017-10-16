import {connect} from 'react-redux';
import * as React from 'react';

import {matchRoute, routes} from '@pinecast/sb-renderer';

import {fetcher} from '../data/dataAPI';
import {ReducerType} from '../reducer';

const UTIL_PAGE_HEAD = `
<head>
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
  </body>
</html>
`;

function getQuery(url: string): {[key: string]: string} {
    if (!url.includes('?')) {
        return {};
    }
    const [, qs] = url.split('?', 2);
    return qs.split('&')
        .map(s => s.split('=', 2))
        .reduce((acc, [k, v]) => {
            acc[decodeURIComponent(k)] = decodeURIComponent(v);
            return acc;
        }, {});
}

class PreviewRenderer extends React.Component {
    iframe: HTMLIFrameElement | null;
    reqId: number;
    props: {
        path: string,
    };

    constructor(props) {
        super(props);
        this.reqId = 0;
    }

    ref = (e: HTMLIFrameElement | null) => {
        this.iframe = e;
        if (e) {
            this.doInnerRender();
        }
    };

    componentWillReceiveProps(nextProps) {
        if (this.iframe && this.props.path !== nextProps.path) {
            this.doInnerRender();
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    doInnerRender() {
        this.reqId += 1;
        const reqId = this.reqId;

        const routeTuple = matchRoute(this.props.path);
        if (!routeTuple) {
            this.displayContent(PAGE_404);
            return;
        }
        const [route, params] = routeTuple;
        route.build(
            fetcher,
            'testcast',
            getQuery(this.props.path),
            params,
        ).then(content => {
            if (this.reqId !== reqId) {
                return;
            }
            this.displayContent(content);
        }, () => this.displayContent(PAGE_404));
        this.displayContent(PAGE_LOADING);
    }

    displayContent(content: string) {
        if (!this.iframe) {
            return;
        }
        this.iframe.src = `data:text/html,${content}`;
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <div style={{
                    background: '#fafafa',
                    borderBottom: '1px solid #eee',
                    height: 40,
                }}>
                    //
                </div>
                <iframe
                    ref={this.ref}
                    style={{
                        border: 0,
                        height: 'calc(100% - 40px)',
                        width: '100%',
                    }}
                />
            </div>
        );
    }
}


export default connect((state: ReducerType) => ({
    path: state.preview.path,
}))(PreviewRenderer);
