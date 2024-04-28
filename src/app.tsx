import * as React from "react";
import { createRoot } from 'react-dom/client';
import { ModeForm } from "./mode-form";
import { Colours } from "./colours";


function App() {
    const canvas = React.useRef(null);

    return <div>
        <canvas width="360" height="100" style={{ width: "100%"}} ref={canvas}></canvas>
        <ModeForm />
        <Colours />

    </div>
}


console.log("START")
createRoot(document.querySelector("#root") as HTMLElement)
    .render(<App />);