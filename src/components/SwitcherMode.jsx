import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import { useColorScheme } from '@mui/material/styles';

export function GroupSwitcherMode({ defaultMode, switchModeHandle }) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={defaultMode}
                    onChange={switchModeHandle}
                >
                    <FormControlLabel value="system" control={<Radio />} label="System" />
                    <FormControlLabel value="light" control={<Radio />} label="Light" />
                    <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}

export default function SwitcherMode(props) {

    const { mode, systemMode, setMode } = useColorScheme();

    const switchMode = ((event) => {
        setMode(event.target.value);
    });

    if (!mode) {
        return <GroupSwitcherMode defaultMode={'system'} switchModeHandle={switchMode} />;
    }

    return <GroupSwitcherMode defaultMode={mode} switchModeHandle={switchMode} />;
}