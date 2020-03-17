import * as React from "react";

type VersionItemProps = {
    ok: boolean;
    message: string;
    url: string;
    name: string;
    version: string;
}
export default class VersionItem extends React.Component<VersionItemProps> {

    link() {
        return <p className={"is-clipped"}>
            <a target={"_blank"}
               rel="noopener noreferrer"
               href={this.props.url}
               title={this.props.url}>
                {this.props.url}
            </a>
        </p>

    }

    render() {
        if (this.props.ok) {
            return <div className="dropdown-item">
                <p><strong>{this.props.name}</strong></p>
                <p className={"tag is-success is-light"}>{this.props.version}</p>
                {this.link()}
            </div>
        }

        return <div className="dropdown-item is-danger">
            <p><strong className={"tag is-danger is-light"}>Error</strong></p>
            <p><strong>{this.props.name}</strong></p>
            <p>{this.props.message}</p>
            {this.link()}
        </div>
    }

}