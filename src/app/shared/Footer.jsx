import React from 'react'
import {Layout} from 'antd';

export class Footer extends React.Component {

    render() {
        return <Layout.Footer style={{textAlign: 'center'}}>
            Created using Ant Design,
            <div>Icons made by
                <a href="https://www.flaticon.com/authors/prettycons" title="prettycons"> prettycons </a>
                from
                <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
            </div>
        </Layout.Footer>;
    }
}