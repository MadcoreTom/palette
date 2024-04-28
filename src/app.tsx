import * as React from "react";
import { createRoot } from 'react-dom/client';
import { ModeForm } from "./mode-form";
import { Colours } from "./colours";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import RssFeedIcon from '@mui/icons-material/RssFeed';

function App() {
    const canvas = React.useRef(null);

    return <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Palette
                </Typography>
                <Button color="inherit" startIcon={<GitHubIcon />} href="https://github.com/MadcoreTom/palette">Source Code</Button>
                <Button color="inherit" startIcon={<RssFeedIcon />} href="https://madcoretom.com">MadcoreTom.com</Button>
            </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
            <canvas width="360" height="100" ref={canvas}></canvas>
            <ModeForm />
            <Colours />
            <Typography marginTop={2}>
                This tool shows the colours in HSL (hue, saturation, lightness) with hue on the X-axis, lightness on the y-axis and saturation on a slider.<br />
                It maps this 'rainbow' to the closest colours in your palette. It can help you develop a palette, or identify gaps.<br />
            </Typography><Typography marginTop={2}>
                The <b>Presets</b> include a few pre-made palettes from some well known oldschool computers, and some I like from Lospec.com<br />
                The <b>Raw Editor</b> lets you copy/paste colour codes to/from your favourite tools
            </Typography>
        </Container>
    </div>
}


console.log("START")
createRoot(document.querySelector("#root") as HTMLElement)
    .render(<App />);