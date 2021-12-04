import React from "react";
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {TextField} from '@mui/material'

export default function DPicker({
                                    value,
                                    label,
                                    handleChange,
                                    isRequired,
                                    minDate,
                                    isReadOnly,
                                    onError,
                                    onAccept,
                                }) {


    function handleChangeDate(momentDate, dateString) {
        handleChange(momentDate)
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateMoment}>
                <DatePicker
                    required={isRequired}
                    disabled={isReadOnly}
                    invalidDateMessage
                    allowKeyboardControl={true}
                    autoOk
                    onAccept={onAccept}
                    minDateMessage
                    minDate={minDate ? minDate : null}
                    ampm={false}
                    value={value ? value : null}
                    onChange={handleChangeDate}
                    onError={onError}
                    mask={'__/__/__'}
                    inputFormat={"DD/MM/YY"}
                    renderInput={(props) => <TextField required={isRequired} {...props}
                                                       fullWidth label={label}
                                                       variant={"outlined"}/>}
                />
            </LocalizationProvider>
        </>

    );
}