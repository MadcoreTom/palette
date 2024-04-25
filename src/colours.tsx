import * as React from "react";
import { Avatar, Chip, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { COLOURS } from "./constants";
import { GENERATOR } from "./generator";

export function Colours() {
    const [colours, setColours] = React.useState(COLOURS);

    function updateColours(pal:string[]) {
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


    const chips = colours.map((c, i) => <Chip
        onDelete={() => removeColour(i)}
        avatar={<Avatar style={{ backgroundColor: "#" + c }}>&nbsp;</Avatar>}
        label={c}
        key={i} />)


    return <Stack direction="row" spacing={1} flexWrap="wrap">
        {chips}
        <Chip variant="outlined" color="primary" icon={<AddIcon />} label="Add" clickable onClick={() => addColour()} />
    </Stack>
}