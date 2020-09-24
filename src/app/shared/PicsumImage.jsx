import React from 'react'

type Props = {
    width?: number,
    height?: number,
    value?: string
}

export function PicsumImage(props: Props) {
    return <img
        alt={"Random image, value " + props.value}
        src={"https://picsum.photos/seed/"
        + (props.value || 69)
        + "/"
        + (props.width || 250)
        + "/"
        + (props.height || 110)}
    />
}