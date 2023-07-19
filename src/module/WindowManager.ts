import { Observable, observable } from "../util/Observable";
import { v4 as uuid } from "uuid";

type Monitor = {
    id: string;
    width: number;
    height: number;
};

type Window = {
    id: string;
    width: number;
    height: number;
    left: number;
    top: number;
};

class WindowManager {
    readonly monitors: Observable<Monitor[]>;
    private setMonitor: (updater: (v: Monitor[]) => Monitor[]) => void;
    private windows: Window[] = [];
    private monitorWindows: Record<string, Observable<string[]>> = {};

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

    deleteMonitor(id: string): void {
        this.setMonitor(monitors => monitors.filter((monitor) => monitor.id !== id));
    }

    addWindow(width: number, height: number): string {
        const id = uuid();
        const window: Window = { id, width, height, left: 0, top: 0 };
        this.windows.push(window);

        return id;
    }

}

export default WindowManager;