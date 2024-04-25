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
    const [pickerIndex, setPickerIndex] = React.useState(0);
    const colourPicker = React.useRef(null);

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
        if (!text.match(/^[a-fA-F0-9\s,#]*$/)) {
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

    function changeEditMode(toRaw: boolean) {
        if (toRaw) {
            setColourText(colours.join(", ").toUpperCase());
        } else if (textValid) {
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
        key={i}
        clickable
        onClick={() => { const picker = colourPicker.current as HTMLInputElement | null; if (picker) { picker.value = "#" + c; picker.click(); setPickerIndex(i) } }}
    />)

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

    const setPickerVal = debounce(
        () => {
            const picker = colourPicker.current as HTMLInputElement | null;
            if (picker) {
                console.log(picker.value, picker.value.substring(1), pickerIndex)
                colours[pickerIndex] = picker.value.substring(1);
                console.log(">>",colours)
                updateColours(colours);
            }
        }
        , 300
    );


    return <Box>
        <FormGroup>
            <FormControlLabel control={<Checkbox onChange={e => changeEditMode((e.target as HTMLInputElement).checked)} checked={rawMode} />} label="Raw editor" />
        </FormGroup>
        {rawMode ? textEditor : chipEditor}
        <input type="color" id="color-picker" ref={colourPicker} style={{ display: "none" }} onChange={() => setPickerVal()} />
    </Box>
}

// I'm lazy, this came from Copilot
function debounce(callback, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}