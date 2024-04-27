import * as React from "react";
import { FormControl, InputLabel, Link, MenuItem, Select, } from "@mui/material";
import { PRESETS } from "./constants";

export function Presets(props: { setColours: (col: string[]) => void }) {
    const [selection, setSelection] = React.useState<string>("NONE");
    const [link, setLink] = React.useState<string | null>(null);

    function onSelect(value: string) {

        setSelection(value);
        if (value != "NONE") {
            const preset = PRESETS.filter(p => p.name == value)[0];
            props.setColours(preset.colours);
            setLink(preset.link ? preset.link : null);
        }
    }

    return <FormControl>
        <InputLabel id="preset-label">Presets</InputLabel>
        <Select
            labelId="preset-label"
            id="preset-selection"
            value={selection}
            label="Presets"
            style={{ width: "220px" }}
            onChange={evt => onSelect(evt.target.value)}
        >
            <MenuItem value="NONE">-</MenuItem>
            {PRESETS.map(m => <MenuItem value={m.name} key={m.name}>{m.name}</MenuItem>)}
        </Select>
        {link ? <Link href={link} target="_blank" rel="noopener">Palette source</Link> : null}
    </FormControl>
}