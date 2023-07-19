import { useCallback } from "react";
import WindowManager from "../../module/WindowManager";
import "./MonitorView.css";

export type MonitorViewProps = {
    monitorId: string;
    width: number;
    height: number;
    windowManager: WindowManager;
};

function MonitorView({ monitorId, width, height, windowManager }: MonitorViewProps): JSX.Element {
    const closeMonitor = useCallback(() => {
        windowManager.deleteMonitor(monitorId);
    }, [windowManager, monitorId])

    return (
        <div className="monitor-view">
            <div className="close-button" onClick={closeMonitor}></div>
            <div className="monitor" style={{ height, width }}>
            </div>
        </div>
    )
};
export default MonitorView;