import {Snackbar, Alert} from '@mui/material'

export default function AlertError({isError, setIsError}) {
    return (
        <Snackbar open={isError} autoHideDuration={6000} onClose={() => {
            setIsError(false)
        }}>
            <Alert onClose={() => setIsError(false)} severity="error">
                An error has occured
            </Alert>
        </Snackbar>)
}