import React, { Component } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
// redux関連
import { HobbiesState } from "../../module";
import { ActionDispatcher } from "../../Container";
// Components
import GameInfoContents from "../GameInfoContents";
import EmptyTableRow from "../EmptyTableRow";
import TablePaginationActionsWrapped from "../TablePaginationActionWrapped";

const StyledTablePagination = withStyles({
    toolbar: {
        padding: 0
    }
})(TablePagination);

interface IProps {
    value: HobbiesState;
    actions: ActionDispatcher;
}

class GameInfoTableWrapped extends Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const emptyRows =
            this.props.value.rowsPerPage -
            Math.min(
                this.props.value.rowsPerPage,
                this.props.value.rows.length -
                    this.props.value.page * this.props.value.rowsPerPage
            );

        return (
            <Table>
                <TableBody>
                    {this.props.value.rows
                        .slice(
                            this.firstContentOfThePage(
                                this.props.value.page,
                                this.props.value.rowsPerPage
                            ),
                            this.lastContentOfThePage(
                                this.props.value.page,
                                this.props.value.rowsPerPage
                            )
                        )
                        .map(row => {
                            return (
                                <TableRow key={row.appid}>
                                    <TableCell
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        <GameInfoContents {...row} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    {emptyRows > 0 && <EmptyTableRow emptyRows={emptyRows} />}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <StyledTablePagination
                            rowsPerPageOptions={[]}
                            count={this.props.value.rows.length}
                            rowsPerPage={this.props.value.rowsPerPage}
                            labelRowsPerPage=""
                            page={this.props.value.page}
                            onChangePage={this.handleChangePage}
                            ActionsComponent={TablePaginationActionsWrapped}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }

    readonly firstContentOfThePage = (
        currentPage: number,
        rowsPerPage: number
    ) => currentPage * rowsPerPage;

    readonly lastContentOfThePage = (
        currentPage: number,
        rowsPerPage: number
    ) => currentPage * rowsPerPage + rowsPerPage;

    readonly handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        page: number
    ) => {
        this.props.actions.changeOwnedGameInfoPage(page);
    };
}

export default GameInfoTableWrapped;
