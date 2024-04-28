import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slider, Stack, Typography } from "@mui/material";
import * as React from "react";
import { MODES } from "./constants";
import { GL_GENERATOR } from "./generator-gl";

export function ModeForm() {

    const [saturation, setSaturation] = React.useState(100);

    function onChange(target: null | EventTarget) {
        if (target && "value" in target) {
            const v = parseInt(target.value + "");
            setSaturation(v);
            GL_GENERATOR.updateSaturation(v / 100);
        }
    }

    return <Stack direction="row" spacing={2} margin={1}>
        <FormControl style={{ minWidth: "150px" }}>
            <InputLabel id="demo-simple-select-label">Mode</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={MODES[0].option}
                label="Mode"
                disabled
            // onChange={handleChange}
            >

                {MODES.map(m => <MenuItem value={m.option} key={m.option}>{m.option}</MenuItem>)}
            </Select>
        </FormControl>
        <Box style={{ flexGrow: 1 }}>
            <Typography id="saturation-slider" gutterBottom>
                Saturation: {saturation}
            </Typography>
            <Slider
                value={saturation}
                min={0}
                step={1}
                max={100}
                onChange={evt => onChange(evt.target)}
                valueLabelDisplay="auto"
                aria-labelledby="saturation-slider"
            />
        </Box>
    </Stack>
}