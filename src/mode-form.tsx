import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slider, Typography } from "@mui/material";
import * as React from "react";
import { MODES } from "./constants";

export function ModeForm() {
    return <Grid container spacing={1} margin={2}>
        <Grid item xs={2} >
            <FormControl>
                <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={MODES[0].option}
                    label="Mode"
                // onChange={handleChange}
                >

                    {MODES.map(m => <MenuItem value={m.option} key={m.option}>{m.option}</MenuItem>)}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={10}>

            <Box >
                <Typography id="non-linear-slider" gutterBottom>
                    Lightness: 12
                </Typography>
                <Slider
                    value={0}
                    min={0}
                    step={1}
                    max={100}
                    // scale={calculateValue}
                    // getAriaValueText={valueLabelFormat}
                    // valueLabelFormat={valueLabelFormat}
                    // onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                />
            </Box>
        </Grid>
    </Grid>
}