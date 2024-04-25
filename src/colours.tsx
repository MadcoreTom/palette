import * as React from "react";
import { Avatar, Chip, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { COLOURS } from "./constants";

export function Colours() {
    const [colours, setColours] = React.useState(COLOURS);



    const chips = colours.map((c, i) => <Chip onDelete={()=>{
        setColours([...colours.slice(0,i),...colours.slice(i+1)])
    }} avatar={<Avatar style={{ backgroundColor: "#" + c }}>&nbsp;</Avatar>} label={c} key={i} />)


    return <Stack direction="row" spacing={1} flexWrap="wrap">
        {chips}
        <Chip variant="outlined" color="primary" icon={<AddIcon />} label="Add" clickable onClick={
            () => { console.log("Click"); setColours([...colours, "ff0000"]); }
        } />
    </Stack>
}