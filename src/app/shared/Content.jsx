import React from 'react'
import {Layout} from 'antd';
import './Content.css'
import {httpHelper} from "../helpers/HttpHelper";
import {HOUSE_MANAGER} from "../store/ApiResource";
import House from "../houses/House";

export class Content extends React.Component {
    loadingState : "houses_loaded" | "error" | "no_houses"| "loading" = "loading";
    houses : House[];


    constructor(props: P, context: any) {
        super(props, context);
        this.state = {
            loadingState : "loading"
        }
    }

    componentDidMount() {
        httpHelper
            .getJson(HOUSE_MANAGER.host, "api/v1/houses")
            .subscribe(
                data => {
                    let tmp : House[] = [];
                    data.forEach((value: House) => {
                        let house = House.fromObject(value);
                        tmp.push(house);
                    });

                    if(tmp.length > 0) {
                        this.loadingState = "houses_loaded"
                        this.houses = tmp;
                    } else {
                        this.loadingState = "no_houses"
                    }

                    this.setState(
                        {loadingState : this.loadingState}
                    )
                },
                error => {
                    this.loadingState = "error";

                    this.setState(
                        {loadingState : this.loadingState}
                    )
                }
            );
    }

    render() {
        let content;

        switch (this.state.loadingState) {
            case "error":
                content = <h2>ERROR</h2>
                break
            case "houses_loaded":
                content = <div>TODO houses loaded, need to render them</div>
                break
            case "no_houses":
                content = <div>TODO no houses, show add new house</div>
                break
            case "loading":
            default:
                content = <div>Loading</div>
        }

        return <Layout.Content style={{padding: '0 50px'}}>
            <div className="main-layout">
                {content}
            </div>
        </Layout.Content>;
    }
}