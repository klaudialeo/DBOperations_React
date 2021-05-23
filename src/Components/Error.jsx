import React from 'react';
import Alert from '@material-ui/lab/Alert';

export default function Error(props) {
    return (
        <Alert variant="outlined" severity="error">
            {props.message}
        </Alert>
    )
}