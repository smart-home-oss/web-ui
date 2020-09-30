import Room from "./Room";

export default class TreeItem {
    title: number;
    key: string;
    room: Room;
    children: TreeItem[];

    static fromRoom(value: Room): TreeItem {
        let result: TreeItem = new TreeItem();
        result.title = value.name;
        result.room = value;
        result.key = value.id;
        result.children = [

        ];

        return result;
    }
}