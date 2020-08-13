import React from 'react'
import {Layout} from 'antd';
import './Content.css'
import KeyHelper from "../helpers/KeyHelper";
import {housesStore} from "../store/HousesStore";
import {observer} from "mobx-react";

export class Content extends React.Component {

    constructor(props: P, context: any) {
        super(props, context);
    }

    componentDidMount() {
        housesStore.loadHouses();
    }

    render() {
        let content = <div>not yet loaded</div>;

        if (housesStore.houses.length > 0) {
            let tmp = [];
            let key = new KeyHelper();

            housesStore.houses.forEach(house => {
                tmp.push(<li key={key.next()}>{house.id} - {house.name}</li>)
            })

            content = <ul>{tmp}</ul>
        }

        return <Layout.Content style={{padding: '0 50px'}}>
            <div className="main-layout">
                {content}
            </div>
        </Layout.Content>;
    }
}

export default observer(Content);