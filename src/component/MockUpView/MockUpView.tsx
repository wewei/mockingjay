import { useCallback, useRef } from "react";
import WindowManager from "../../module/WindowManager"
import { useOb } from "../../util/Observable";

type MockUpViewProps = {
    windowManager: WindowManager;
};

function MockUpView({ windowManager }: MockUpViewProps): JSX.Element {
    const monitors = useOb(windowManager.monitors);
    const widthInput = useRef<HTMLInputElement>(null);
    const heightInput = useRef<HTMLInputElement>(null);
    const addMonitor = useCallback(() => {
        const width = Math.max(parseInt(widthInput.current?.value || "0", 10), 800);
        const height = Math.max(parseInt(heightInput.current?.value || "0", 10), 600);
        windowManager.addMonitor(width, height);
    }, [windowManager]);

    return (
        <div>
            <div>Width: <input type="number" defaultValue={0} ref={widthInput}></input></div>
            <div>Height: <input type="number" defaultValue={0} ref={heightInput}></input></div>
            <button onClick={addMonitor}>Add</button>
            <div>{monitors.length}</div>
        </div>
    );
}

export default MockUpView;