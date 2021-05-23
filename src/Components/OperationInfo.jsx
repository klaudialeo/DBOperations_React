import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import MuiTableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

import useJson from '../hooks/useJson'
import Error from "./Error"

const TableCell = withStyles({
    root: {
        borderBottom: "1px solid black",
    }
})(MuiTableCell);

export default function OperationInfo(props) {
    const code = props.code

    const [data, loading, error] = useJson("/betriebsstelle/" + code);

    const NOT_FOUND = "Nicht gefunden";

    return (
        <>
            { loading && <CircularProgress />}
            { error && <Error message={error}></Error>}
            { data &&
                <TableContainer style={{ width: "50vw" }}>
                    <Table aria-label="operation table">
                        <TableHead>
                            <TableRow key="code">
                                <TableCell component="th" scope="row">Abkürzung:</TableCell>
                                <TableCell align="right">{code}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key="name">
                                <TableCell component="th" scope="row">Name:</TableCell>
                                <TableCell align="right">{data.name ? data.name : NOT_FOUND}</TableCell>
                            </TableRow>
                            <TableRow key="shortName">
                                <TableCell component="th" scope="row">Kurzname:</TableCell>
                                <TableCell align="right">{data.shortName ? data.shortName : NOT_FOUND}</TableCell>
                            </TableRow>
                            <TableRow key="type">
                                <TableCell component="th" scope="row">Typ:</TableCell>
                                <TableCell align="right">{data.type ? data.type : NOT_FOUND}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    )
}