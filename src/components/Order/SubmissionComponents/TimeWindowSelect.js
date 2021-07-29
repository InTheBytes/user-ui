import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

function TimeWindowSelect(props) {

    const [windowOptions, setWindowOptions] = useState(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        let isAvailableToday = moment().hour() <= 20
        let start = isAvailableToday ? moment().hour() : 8;
        let dayOffset = isAvailableToday ? 0 : 1
        let options = []
        while (start <= 20) {
            options.push({
                'start': moment(start, 'HH').add(dayOffset, 'days').toDate(),
                'end': moment(++start, 'HH').add(dayOffset, 'days').toDate()
        })}
        setWindowOptions(options);
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value);
        props.changeWindow(windowOptions[event.target.value]);
    }

    return (
        <FormControl component='fieldset'>
            {windowOptions && (<>
                <FormLabel component='legend'>Time Window for {moment(windowOptions[0]["start"]).format("MMM, Do")}</FormLabel>
                <RadioGroup 
                    aria-label='time-window' 
                    name='time-window' 
                    value={`${value}`} 
                    onChange={handleChange}
                >
                    {windowOptions && windowOptions.map((item) => 
                            <FormControlLabel 
                                key={item['start']}
                                value={`${windowOptions.indexOf(item)}`} 
                                control={<Radio />} 
                                label={`${moment(item['start']).format("h a")} - ${moment(item['end']).format('h a')}`} />
                        
                    )}
                </RadioGroup>
            </>)}
        </FormControl>
    )
}

export default TimeWindowSelect;