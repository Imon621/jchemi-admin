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
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";
import lightBlue from "@material-ui/core/colors/lightBlue";

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

import { db, auth } from "../component/firebase";

import { useParams } from "react-router-dom";
// transtation value
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
var id = null;
const setId = (x) => {
  id = x;
};

// test data
const data = [
  {
    id: 1,
    type: "link",
    no: 1,
    name: "basic class",
    link: "http://www.test.com",
    date: "12 jun 21",
  },
  {
    id: 2,
    type: "link",
    no: 2,
    name: "2nos class",
    link: "http://www.test.com",
    date: "12 jun 21",
  },
  {
    id: 3,
    type: "link",
    no: 3,
    name: "basic class",
    link: "http://www.test.com",
    date: "12 jun 21",
  },
  {
    id: 4,
    type: "link",
    no: 4,
    name: "2nos class",
    link: "http://www.test.com",
    date: "12 jun 21",
  },
];

const columns = [
  { id: "no", label: "No.", minWidth: 50 },
  { id: "name", label: "Topics", minWidth: 150 },
  { id: "date", label: "Date", minWidth: 60 },
  { id: "link", label: "Links", minWidth: 50 },
];

export default function Classes() {
  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
  });
  const styles = useStyles();
  // dialouge value

  const [open, setOpen] = React.useState(false);
  const [classes, setClasses] = React.useState("");
  let { course, classId } = useParams();

  const fetch = () => {
    db.collection("courses")
      .doc(course)
      .collection("chapter")
      .doc(classId)
      .collection("classes")
      .get()
      .then((x) => {
        const arr = [];
        x.docs.map((doc) => {
          const obj = {
            type: doc.data().type,
            id: doc.id,
            no: doc.data().no,
            date: doc.data().date,
            link: doc.data().link,
            name: doc.data().name,
          };
          arr.push(obj);
        });
        setClasses(arr);
        setOpen(false);
      });
  };

  React.useEffect(() => {
    fetch();
  }, []);

  // year filtering data
  const filt = (type) => {
    const arr = [];
    classes.map((x) => {
      if (x.type === type) {
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
    { id: "date", label: "Date", minWidth: 60 },
    { id: "link", label: "Link", minWidth: 50 },
  ];

  //   table
  const Tablable = ({ data }) => {
    return (
      <>
        {data.length !== 0 ? (
          <Paper className={styles.root}>
            {/* {data[0].year === "link" ? (
              <Typography variant="h5">Exam Link</Typography>
            ) : (
              <Typography variant="h5">Class Link</Typography>
            )} */}
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
                                .doc(classId)
                                .collection("classes")
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
                        <Typography variant="h6">Add {data[0].type}</Typography>
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
      type: "",
      name: "",
      date: "",
      link: "",
    };
    const [formValues, setFormValues] = React.useState(() => {
      if (id !== null) {
        var temp = classes.filter((x) => {
          if (x.id === id) {
            return true;
          }
        });
        temp = temp[0];
        const obj = {
          no: temp.no,
          name: temp.name === undefined ? "" : temp.name,
          type: temp.type === undefined ? "" : temp.type,
          date: temp.date === undefined ? "" : temp.date,
          link: temp.link === undefined ? "" : temp.link,
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
                <Grid>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="type"
                      value={formValues.type}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="link">Class Link</MenuItem>
                      <MenuItem value="exam">exam Link</MenuItem>
                      <MenuItem value="msg">Massage</MenuItem>
                    </Select>
                  </FormControl>
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
                    id="date"
                    name="date"
                    label="Date"
                    type="Text"
                    value={formValues.date}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="link"
                    name="link"
                    label="Link"
                    type="text"
                    value={formValues.link}
                    onChange={handleInputChange}
                  />
                </Grid>
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
                  db.collection("courses")
                    .doc(course)
                    .collection("chapter")
                    .doc(classId)
                    .collection("classes")
                    .add(formValues)
                    .then(() => {
                      setFormValues(defaultValues);
                      fetch();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  db.collection("courses")
                    .doc(course)
                    .collection("chapter")
                    .doc(classId)
                    .collection("classes")
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
      {classes !== "" ? (
        <>
          <Tablable data={filt("link")} />
          {filt("exam").length !== 0 ? <Tablable data={filt("exam")} /> : ""}
          <Form />
          {filt("msg").length !== 0 ? <Tablable data={filt("msg")} /> : ""}
        </>
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
    </>
  );
}
