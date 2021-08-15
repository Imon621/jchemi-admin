import React from "react";

// import ing material component
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton, CardContent, Card } from "@material-ui/core";

// icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";
import lightBlue from "@material-ui/core/colors/lightBlue";

// importing my component
import { sorter } from "../component/sorting";

export default function Datatable({
  data,
  columns,
  edit,
  del,
  loading,
  editable,
}) {
  const useStyles = makeStyles({
    root: {
      width: "100%",
      padding: 14,
    },
    container: {
      maxHeight: 440,
    },
  });
  const styles = useStyles();
  return (
    <>
      {data.length !== 0 ? (
        <>
          <Paper className={styles.root}>
            <Typography variant="h5">{data[0].type}</Typography>
            <TableContainer className={styles.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    {editable ? (
                      <>
                        <TableCell key="button" align="center">
                          Edit
                        </TableCell>
                        <TableCell key="del-button" align="center">
                          Delete
                        </TableCell>
                      </>
                    ) : (
                      ""
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sorter(data).map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.no}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align="center">
                              {/* {column.format && typeof value === "number"
                            ? column.format(value)
                            : value} */}
                              {column.id === "link" ? (
                                <a target="_blank" href={value}>
                                  Link
                                </a>
                              ) : (
                                <>
                                  {value !== undefined ? value.toString() : ""}
                                </>
                              )}
                            </TableCell>
                          );
                        })}
                        {editable ? (
                          <>
                            <TableCell key="button">
                              <IconButton
                                style={{ color: orange[600] }}
                                disabled={loading}
                                onClick={() => {
                                  edit(row.id);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell key="del-button">
                              <IconButton
                                style={{ color: red[600] }}
                                disabled={loading}
                                onClick={() => {
                                  del(row.id);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </>
                        ) : (
                          ""
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
                {editable ? (
                  <TableFooter>
                    <TableRow col>
                      <TableCell colSpan={9}>
                        <IconButton
                          style={{ color: lightBlue[600] }}
                          disabled={loading}
                          onClick={() => {
                            edit();
                          }}
                        >
                          <AddCircleIcon />
                          <Typography variant="h6">
                            Add {data[0].type}
                          </Typography>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                ) : (
                  ""
                )}
              </Table>
            </TableContainer>
          </Paper>
        </>
      ) : (
        <>
          {editable ? (
            <IconButton
              style={{ color: lightBlue[600] }}
              onClick={() => {
                edit();
              }}
            >
              <AddCircleIcon />
              <Typography variant="h6">Add Link</Typography>
            </IconButton>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}
