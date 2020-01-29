import * as React from "react";

type InputData = {
    disabled: boolean;
    placeholder: String;
    title: String;
    exampleText: String;
    value: String;
    onChange: (event: any, data: string) => {};
}

export default class FormInput extends React.Component<InputData> {

    render() {
        let input;

        if(this.props.disabled) {
            input = <div className="field">
                <label className="label">Id</label>
                <div className="control">
                    <label className="input" placeholder={this.props.placeholder}>{this.props.value}</label>
                </div>
            </div>
        } else {
            input = <div className="field">
                <label className="label">{this.props.title}</label>
                <div className="control">
                    <input className="input is-success" type="text" placeholder={this.props.placeholder}
                           value={this.props.value}
                           onChange={event => {
                               if(this.props.onChange) {
                                   this.props.onChange(event, "[hardcoded data]")
                               }
                           }}/>
                </div>
                <p className="help is-success">{this.props.exampleText}</p>
            </div>
        }

        return input;
    }

}