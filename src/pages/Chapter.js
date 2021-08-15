import React, { useState, useEffect } from "react";

// import ing material component
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
// dialouge
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import { makeStyles } from "@material-ui/core/styles";
// icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import LinkIcon from "@material-ui/icons/Link";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import lightBlue from "@material-ui/core/colors/lightBlue";
import Alert from "@material-ui/lab/Alert";

import {
  CircularProgress,
  Typography,
  IconButton,
  CardContent,
  Card,
  Grid,
  TextField,
} from "@material-ui/core";

// select
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { db } from "../component/firebase";

import { useParams, Link, Redirect } from "react-router-dom";

// context
import { useAuth } from "../contexts/AuthContext";

// transtation value
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
var id = null;
const setId = (x) => {
  id = x;
};
export default function Chapter() {
  // test data
  const [chapter, setChapter] = useState("");
  // dialouge value

  const [open, setOpen] = useState(false);

  const [error, setError] = useState();

  const [navId, setNavId] = useState();

  const { currentUser } = useAuth();

  // fetching data
  let { course } = useParams();
  const fetch = () => {
    db.collection("courses")
      .doc(course)
      .collection("chapter")
      .get()
      .then((x) => {
        const arr = [];
        x.docs.map((doc) => {
          const obj = {
            year: doc.data().year,
            id: doc.id,
            no: doc.data().no,
            chapter: doc.data().chapter,
            class_started: doc.data().class_started,
            name: doc.data().name,
            total: doc.data().total,
            running: doc.data().running,
            tags: "",
            // tags: doc.data().tags,
          };
          for (var tag of doc.data().tags) {
            obj.tags = obj.tags + " " + tag;
          }
          arr.push(obj);
        });
        setChapter(arr);
      });
  };
  useEffect(() => {
    if (!currentUser) {
      setNavId("/login");
    } else {
      fetch();
    }
  }, []);
  // string to arr
  const striToArr = (str) => {
    if (str != "") {
      const arr = str.split(" ");
      return arr;
    } else {
      return [];
    }
  };

  // year filtering data
  const filt = (year) => {
    const arr = [];
    chapter.map((x) => {
      if (x.year === year) {
        arr.push(x);
      }
    });
    return arr;
  };
  // sort function
  const sorter = (arr) => {
    arr.sort((a, b) => {
      return a.no - b.no;
    });
    return arr;
  };
  //   data column
  const columns = [
    { id: "no", label: "No.", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "chapter", label: "Chapter", minWidth: 80 },
    { id: "class_started", label: "Class_started", minWidth: 60 },
    { id: "total", label: "Total", minWidth: 50 },
    { id: "year", label: "Year", minWidth: 50 },
    { id: "running", label: "Running", minWidth: 50 },
    { id: "tags", label: "Tags", minWidth: 50 },
  ];
  //   styles
  const useStyles = makeStyles({
    root: {
      width: "93%",
      padding: 12,
    },
    container: {
      maxHeight: 600,
    },
  });
  const styles = useStyles();
  //   table
  const Chaptable = ({ data }) => {
    return (
      <>
        {data.length !== 0 ? (
          <Paper className={styles.root}>
            {data[0].year === "primary" ? (
              <Typography variant="h5">1st Paper</Typography>
            ) : (
              <Typography variant="h5">2nd Paper</Typography>
            )}
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
                    <TableCell key="go_button" align="center">
                      Links
                    </TableCell>
                    <TableCell key="button" align="center">
                      Edit
                    </TableCell>
                    <TableCell key="del-button" align="center">
                      Delete
                    </TableCell>
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
                                  Class Link
                                </a>
                              ) : (
                                <>
                                  {value !== undefined ? value.toString() : ""}
                                </>
                              )}
                            </TableCell>
                          );
                        })}

                        <TableCell
                          key="go_button"
                          component={Link}
                          to={`/classes/${course}/${row.id}`}
                        >
                          <IconButton
                            style={{ color: green[500] }}
                            onClick={() => {
                              setId(row.id);
                              setOpen(true);
                            }}
                          >
                            <LinkIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell key="button">
                          <IconButton
                            style={{ color: orange[600] }}
                            onClick={() => {
                              setId(row.id);
                              setOpen(true);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell key="del-button">
                          <IconButton
                            style={{ color: red[600] }}
                            onClick={() => {
                              db.collection("courses")
                                .doc(course)
                                .collection("chapter")
                                .doc(row.id)
                                .delete()
                                .then(() => {
                                  fetch();
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow col>
                    <TableCell colSpan={9}>
                      <IconButton
                        style={{ color: lightBlue[600] }}
                        onClick={() => {
                          setId(null);
                          setOpen(true);
                        }}
                      >
                        <AddCircleIcon />
                        <Typography variant="h6">Add Chapter</Typography>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        ) : (
          <IconButton
            style={{ color: lightBlue[600] }}
            onClick={() => {
              setId(null);
              setOpen(true);
            }}
          >
            <AddCircleIcon />
            <Typography variant="h6">Add Class</Typography>
          </IconButton>
        )}
      </>
    );
  };
  // form
  const Form = () => {
    // form management
    const defaultValues = {
      // name: "",
      // age: 0,
      // sex: "",
      // os: "",
      // favoriteNumber: 0,
      no: "",
      name: "",
      chapter: "",
      class_started: "",
      total: 0,
      year: "",
      running: null,
      tags: "",
      src: "",
      color: "",
    };
    const [formValues, setFormValues] = React.useState(() => {
      if (id !== null) {
        var temp = chapter.filter((x) => {
          if (x.id === id) {
            return true;
          }
        });
        temp = temp[0];
        const obj = {
          no: temp.no === undefined ? "" : temp.no,
          name: temp.name === undefined ? "" : temp.name,
          chapter: temp.chapter === undefined ? "" : temp.chapter,
          class_started:
            temp.class_started === undefined ? "" : temp.class_started,
          total: temp.total === undefined ? "" : temp.total,
          year: temp.year === undefined ? "" : temp.year,
          running: temp.running === undefined ? "" : temp.running,
          tags: temp.tags === undefined ? "" : temp.tags,
          src: temp.src === undefined ? "" : temp.src,
          color: temp.color === undefined ? "" : temp.color,
        };
        return obj;
      } else {
        return defaultValues;
      }
    });
    const check = () => {};
    check();
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
    };
    return (
      <>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            setId(null);
            setOpen(false);
          }}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {id !== null ? "Edit Chapter" : "Add Chapter"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
              >
                <Grid item>
                  <TextField
                    id="no"
                    name="no"
                    label="NO"
                    type="Number"
                    value={formValues.no}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    type="Text"
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="chapter"
                    name="chapter"
                    label="Chapter"
                    type="Text"
                    value={formValues.chapter}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="class_started"
                    name="class_started"
                    label="Class Started"
                    type="Text"
                    value={formValues.class_started}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="total"
                    name="total"
                    label="Total"
                    type="number"
                    value={formValues.total}
                    onChange={handleInputChange}
                  />
                </Grid>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Year</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="year"
                    value={formValues.year}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="primary">1st Paper</MenuItem>
                    <MenuItem value="secondary">2nd Paper</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="demo-running-select-label">
                    Running
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-running-select"
                    name="running"
                    value={formValues.running}
                    onChange={handleInputChange}
                  >
                    <MenuItem value={true}>running</MenuItem>
                    <MenuItem value={false}>finished</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  id="tags"
                  name="tags"
                  label="Tags"
                  type="text"
                  value={formValues.tags}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="src"
                  name="src"
                  label="Src"
                  type="text"
                  value={formValues.src}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="color"
                  name="color"
                  label="Color"
                  type="text"
                  value={formValues.color}
                  onChange={handleInputChange}
                />
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setId(null);
                setOpen(false);
              }}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (id === null) {
                  formValues.tags = striToArr(formValues.tags);
                  db.collection("courses")
                    .doc(course)
                    .collection("chapter")
                    .add(formValues)
                    .then(() => {
                      setFormValues(defaultValues);
                      fetch();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  formValues.tags = striToArr(formValues.tags);
                  console.log(formValues);
                  console.log(id);
                  db.collection("courses")
                    .doc(course)
                    .collection("chapter")
                    .doc(id)
                    .update(formValues)
                    .then(() => {
                      setFormValues(defaultValues);
                      fetch();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
                setOpen(false);
              }}
              variant="contained"
              color="primary"
            >
              {id !== null ? "Edit" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {chapter !== "" ? (
        <div style={{}}>
          <Chaptable data={filt("primary")} />
          {filt("secondary") ? <Chaptable data={filt("secondary")} /> : ""}
          <Form />
        </div>
      ) : (
        <div
          style={{
            height: 70 + "vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress style={{}} />
        </div>
      )}
      {navId ? <Redirect to={navId} /> : ""}
    </>
  );
}
