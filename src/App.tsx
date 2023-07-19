import React, { useMemo } from 'react';
import MockUpView from './component/MockUpView/MockUpView';
import WindowManager from './module/WindowManager';

function App() {
  const windowManager = useMemo(() => new WindowManager(), []);
  return <MockUpView windowManager={windowManager}></MockUpView>;
}

export default App;
