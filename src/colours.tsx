import * as React from "react";
import { Avatar, Box, Checkbox, Chip, FormControlLabel, FormGroup, Stack, Switch, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { COLOURS } from "./constants";
import { GL_GENERATOR } from "./generator-gl";
import { Presets } from "./presets";

export function Colours() {
    const [colours, setColours] = React.useState(COLOURS);
    const [rawMode, setRawMode] = React.useState(false);
    const [colourText, setColourText] = React.useState(colours.join(", "));
    const [textValid, setTextValid] = React.useState(true);
    const [pickerIndex, setPickerIndex] = React.useState(0);
    const colourPicker = React.useRef(null);

    React.useEffect(() => {
        GL_GENERATOR.updateColours(colours);

    });

    function updateColours(pal: string[]) {
        setColours(pal);
        // if (GENERATOR) {
        GL_GENERATOR.updateColours(pal);
        // }
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
                // if (GENERATOR) {
                GL_GENERATOR.updateColours(partsOfCorrectLength);
                // }
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

    const chipEditor = <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {chips}
        <Chip variant="outlined" color="primary" icon={<AddIcon />} label="Add" clickable onClick={() => addColour()} />
    </Stack>

    const updatePickerValDebounced = debounce((c) => {
        console.log("up")
        updateColours([...c]);
    }, 100)

    const setPickerVal =/* debounce(
     */   () => {
            const picker = colourPicker.current as HTMLInputElement | null;
            if (picker) {
                colours[pickerIndex] = picker.value.substring(1);
                GL_GENERATOR.updateColours(colours);
                updatePickerValDebounced(colours);
            }
        }
    //  , 100
    //  );


    return <Stack direction="column" spacing={2}>
        <Stack spacing={2} direction="row">
            <FormGroup>
                <FormControlLabel control={<Switch onChange={e => changeEditMode((e.target as HTMLInputElement).checked)} checked={rawMode} />} label="Raw editor" />
            </FormGroup>
            <Presets setColours={col => updateColours(col)} />
        </Stack>
        {rawMode ? textEditor : chipEditor}
        <input type="color" id="color-picker" ref={colourPicker} style={{ display: "none" }} onChange={() => setPickerVal()} />
    </Stack>
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