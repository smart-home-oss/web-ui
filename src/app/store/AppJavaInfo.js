export class AppJavaInfo {
    source: string;
    target: string;

    hydrate(data) {
        if(data) {
            this.source = data["source"];
            this.target = data["target"];
        }
    }
}