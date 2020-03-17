import * as React from "react";
import House from "./House";
import {Link} from "react-router-dom";

type HouseProps = {
    house: House
}
export default class HouseItem extends React.Component<HouseProps> {

    render() {
        return <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={"https://picsum.photos/seed/" + this.props.house.id + "/300/220"}
                         alt="Placeholder image"/>
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={"https://picsum.photos/seed/" + this.props.house.id + "1/96/96"}
                                 alt="Placeholder image"/>
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4" title={this.props.house.getNumberStreet()}>
                            {this.props.house.getNumberStreetTrim()}
                        </p>
                        <p className="subtitle is-6">{this.props.house.postCode}</p>
                    </div>
                </div>

                <div className="content">

                    <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
            </div>
            <footer className="card-footer">
                <Link className="card-footer-item"
                      to={"/houses/" + this.props.house.id}>Edit</Link>
                <a href="#" className="card-footer-item">Delete</a>
            </footer>
        </div>;
    }

}