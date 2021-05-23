import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

import OperationInfo from './OperationInfo'
import Error from "./Error"
import useJson from '../hooks/useJson'

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: '2px',
            borderColor: "red",

        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "red",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "black",
        },
        width: '50vw',
    }
}));

export default function SearchForm(props) {
    const classes = useStyles();

    const [options, loading, error] = useJson("/betriebsstelle");

    const [inputValue, setInputValue] = React.useState('');
    const [code, setCode] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        setOpen(false);
        setCode(inputValue);
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);

        if (e.target.value?.length > 0) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }

    const handleChange = (e, value, reason) => {
        setInputValue(value);
        setOpen(false);

        if (reason === "clear") {
            setCode('')
        }
    }

    return (
        <>
            { loading && <CircularProgress />}
            { error && <Error message={error}></Error>}
            { options &&
                <form onSubmit={handleSubmit} method="GET">
                    <div style={{ display: 'flex' }}>
                        <Autocomplete
                            id="search-form"
                            options={options}
                            getOptionLabel={option => option}
                            className={classes.root}
                            freeSolo
                            open={open}
                            onInputChange={handleInputChange}
                            onChange={handleChange}
                            renderInput={params => {
                                return (
                                    <TextField
                                        {...params}
                                        label="Suche nach Abkürzung"
                                        variant="outlined"
                                        fullWidth
                                    />
                                );
                            }}
                        />
                        <IconButton
                            type="submit"
                        >
                            <SearchIcon />
                        </IconButton>
                    </div>
                </form>
            }
            { code && <OperationInfo code={code} />}
        </>
    );
}