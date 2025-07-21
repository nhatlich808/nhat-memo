import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';

export function GroupSwitcherSearchEngine({ defaultSearchEngine, switchSearchEngineHandle }) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">{ 'Choose a source: ' }</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={defaultSearchEngine}
                    onChange={switchSearchEngineHandle}
                >
                    <FormControlLabel value="gemini" control={<Radio />} label="Gemini AI Flash 2.5" />
                    <FormControlLabel value="local" control={<Radio />} label="Nhat's Sample Note" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}

export default function SwitcherSearchEngine({defaultSearchEngine, switchSearchEngineHandle}) {
    if (!defaultSearchEngine) {
        return <GroupSwitcherSearchEngine defaultSearchEngine={'gemini'} switchSearchEngineHandle={switchSearchEngineHandle} />;
    }

    return <GroupSwitcherSearchEngine defaultSearchEngine={defaultSearchEngine} switchSearchEngineHandle={switchSearchEngineHandle} />;
}