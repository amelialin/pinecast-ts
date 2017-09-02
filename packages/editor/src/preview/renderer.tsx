import * as React from 'react';


export default class PreviewRenderer extends React.Component {
    iframe: HTMLIFrameElement | null;

    ref = (e: HTMLIFrameElement | null) => {
        this.iframe = e;
        if (e) {
            this.doInnerRender();
        }
    };

    doInnerRender() {
        //
    }

    render() {
        return (
            <iframe
                ref={this.ref}
                style={{
                    border: 0,
                    height: '100%',
                    width: '100%',
                }}
            />
        );
    }
};
