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
                <Button color="inherit" startIcon={<GitHubIcon/>} href="https://github.com/MadcoreTom/palette">Source Code</Button>
                <Button color="inherit" startIcon={<RssFeedIcon/>} href="https://madcoretom.com">MadcoreTom.com</Button>
            </Toolbar>
        </AppBar>
        <canvas width="360" height="100" ref={canvas}></canvas>
        <Container maxWidth="xl">
            <ModeForm />
            <Colours />
        </Container>
    </div>
}


console.log("START")
createRoot(document.querySelector("#root") as HTMLElement)
    .render(<App />);