import * as React from "react";
import { Avatar, Box, Checkbox, Chip, Container, FormControlLabel, FormGroup, Stack, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { COLOURS } from "./constants";
import { GENERATOR } from "./generator";
import { parsePalette } from "./colour-utils";

export function Colours() {
    const [colours, setColours] = React.useState(COLOURS);
    const [rawMode, setRawMode] = React.useState(false);
    const [colourText, setColourText] = React.useState(colours.join(", "));
    const [textValid, setTextValid] = React.useState(true);

    function updateColours(pal: string[]) {
        setColours(pal);
        if (GENERATOR) {
            GENERATOR.reset(pal);
        }
    }

    function removeColour(idx: number) {
        updateColours([...colours.slice(0, idx), ...colours.slice(idx + 1)]);
    }

    function addColour() {
        updateColours([...colours, "ff0000"]);
    }

    function changeColourText(text: string) {
    if (!text.match(/^[a-fA-F0-9\s,]*$/)) {
            setTextValid(false);
        } else {
            const parts = text.split(/[\s,#]+/).filter(t => t.length > 0);
            const partsOfCorrectLength = parts.filter(p => p.length == 6)
            if (parts.length == partsOfCorrectLength.length) {
                // const col = partsOfCorrectLength.map(parsePalette);
                setColours(partsOfCorrectLength);
                setTextValid(true);
                if (GENERATOR) {
                    GENERATOR.reset(partsOfCorrectLength);
                }
            } else {
                setTextValid(false);
            }
        }
        setColourText(text);
    }

    function changeEditMode(toRaw:boolean){
        if(toRaw){
            setColourText(colours.join(", ").toUpperCase());
        } else if(textValid){
            const parts = colourText.split(/[\s,#]+/).filter(t => t.length > 0);
            const partsOfCorrectLength = parts.filter(p => p.length == 6)
            setColours(partsOfCorrectLength);
        }
        setRawMode(toRaw);
    }


    const chips = colours.map((c, i) => <Chip
        onDelete={() => removeColour(i)}
        avatar={<Avatar style={{ backgroundColor: "#" + c }}>&nbsp;</Avatar>}
        label={c}
        key={i} />)

    const textEditor = <TextField
        id="outlined-multiline-static"
        label="Raw colours"
        multiline
        fullWidth
        rows={4}
        value={colourText}
        onChange={e => changeColourText(e.target.value)}
        error={!textValid}
        helperText={textValid ? undefined : "Invalid HEX colours"}
    />;

    const chipEditor = <Stack direction="row" spacing={1} flexWrap="wrap">
        {chips}
        <Chip variant="outlined" color="primary" icon={<AddIcon />} label="Add" clickable onClick={() => addColour()} />
    </Stack>


    return <Box>
        <FormGroup>
            <FormControlLabel control={<Checkbox onChange={e => changeEditMode((e.target as HTMLInputElement).checked)} checked={rawMode} />} label="Raw editor" />
        </FormGroup>
        {rawMode ? textEditor : chipEditor}
    </Box>
}