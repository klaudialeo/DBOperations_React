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

const Row = (props) => {
    const { caption, value } = props;

    const names = {
        code: "Abkürzung",
        name: "Name",
        shortName: "Kurzname",
        type: "Typ"
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">{names[caption]}:</TableCell>
            <TableCell align="right">{value ? value : "Nicht gefunden"}</TableCell>
        </TableRow>
    )
}

export default function OperationInfo(props) {
    const code = props.code

    const [data, loading, error] = useJson("/betriebsstelle/" + code);

    return (
        <>
            { loading && <CircularProgress />}
            { error && <Error message={error}></Error>}
            { data &&
                <TableContainer style={{ width: "50vw" }}>
                    <Table aria-label="operation table">
                        <TableHead>
                            <Row caption="code" value={code}></Row>
                        </TableHead>
                        <TableBody>
                            {Object.entries(data).map(([key, value]) => (
                                <Row key={key} caption={key} value={value}></Row>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    )
}