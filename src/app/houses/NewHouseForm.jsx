import * as React from "react";
import House from "./House";
import {Button, Form, Input} from 'antd';
import {Link} from "react-router-dom";
import {houseService} from "./HouseService";
import NewHouseRequest from "./NewHouseRequest";

type Props = {
    onCreate: (h: House) => {}
}

export default function NewHouseForm(props: Props) {

    let onFinish = (values) => {
        houseService
            .newHouse(NewHouseRequest.fromForm(values))
            .subscribe(() => props.history.push("/"));
    }

    return <div className={"new-house-form"}>
        <Form
            labelCol={{span: 2}}
            wrapperCol={{span: 6}}
            name="basic"
            initialValues={{remember: true}}
            onFinish={(v) => onFinish(v)}
        >
            <Form.Item
                label="House name"
                name="name"
                rules={[{required: true, message: 'Examples: Unicorner, My Villa in Luxembourg'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Number"
                name="number"
                rules={[{required: true, message: 'Examples: 42, 13A, 69/S'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Street"
                name="street"
                rules={[{required: true, message: 'Examples: Sesame Street, 5th Avenue'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="City"
                name="city"
                rules={[{required: true, message: 'Examples: Luxembourg, Bucharest, Cahul'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Country"
                name="country"
                rules={[{required: true, message: 'Examples: Luxembourg, Romania, Moldova'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Postal Code"
                name="postal-code"
                rules={[{required: true, message: 'Examples: L-12345, 345567, US1234'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 2, span: 8}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Link to={"/houses"}>
                    <Button htmlType={"button"} type={"link"}>
                        Cancel
                    </Button>
                </Link>
            </Form.Item>
        </Form>
    </div>
}