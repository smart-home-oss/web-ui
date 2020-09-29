import {Button, Form, Input} from "antd";
import * as React from "react";

type Props = {
    onCreate: (string) => {}
}
export default function NewRoom(props: Props) {

    const onFinish = (values) => {
        props.onCreate(values.name)
    }

    return <Form
        name="basic"
        layout="inline"
        onFinish={onFinish}>
        <Form.Item
            label="Room name"
            name="name"
            rules={[
                {
                    required: true,
                    message: 'Room name is required',
                },
            ]}
        >
            <Input/>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
}