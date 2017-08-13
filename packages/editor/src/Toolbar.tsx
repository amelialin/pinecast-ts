import React from 'react';

import {Context} from './types';
import {getsContext} from './getsContext';


const ToolbarButton = getsContext(({children, id, setState, state}: {children: any, id: string, setState: (Object) => void, state: Context}) =>
    <button
        onClick={e => {
            e.preventDefault();
            setState({page: id});
        }}
        style={{
            background: id === state.page ? '#fff' : '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: 2,
            display: 'inline-block',
            fontSize: 16,
            marginRight: 10,
            padding: '5px 10px',
        }}
        type='button'
    >
        {children}
    </button>
);

export default () =>
    <nav
        style={{
            alignItems: 'center',
            backgroundColor: '#fafafa',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            height: 50,
            padding: '0 10px',
        }}
    >
        <ToolbarButton id='presets'>Presets</ToolbarButton>
        <ToolbarButton id='colors'>Colors</ToolbarButton>
        <ToolbarButton id='typography'>Typography</ToolbarButton>
    </nav>;
