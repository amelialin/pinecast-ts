import * as React from 'react';


export default class PreviewController extends React.Component {
    props: {
        children: React.Children,
    };
    state: {
        loading: number,
        routeName: string,
        routeParams: Array<string> | null,
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: 0,

            routeName: '/',
            routeParams: null,
        };
    }

    render() {
        return (
            <div>
                <div>
                    {
                        React.Children.map(
                            this.props.children,
                            child => {
                                if (!child) {
                                    return null;
                                }
                                return React.cloneElement(
                                    child,
                                    {
                                        ...child.props,
                                        ...this.state,
                                    }
                                );
                            }
                        )
                    }
                </div>
            </div>
        );
    }
};
