import { Observable, observable } from "../util/Observable";
import { v4 as uuid } from "uuid";

type Monitor = {
    id: string;
    width: number;
    height: number;
};

class WindowManager {
    readonly monitors: Observable<Monitor[]>;
    private setMonitor: (updater: (v: Monitor[]) => Monitor[]) => void;

    constructor() {
        const [monitors, setMonitors] = observable<Monitor[]>([]);
        this.monitors = monitors;
        this.setMonitor = setMonitors;
    }

    addMonitor(width: number, height: number): string {
        const id = uuid();
        this.setMonitor(monitors => [...monitors, { id, width, height }]);
        return id;
    }
}

export default WindowManager;