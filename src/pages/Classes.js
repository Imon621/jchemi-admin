import React, { useEffect, useState } from "react";

// dialouge
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";

import { makeStyles } from "@material-ui/core/styles";

import { CircularProgress, Grid, TextField } from "@material-ui/core";

// context
import { useAuth } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";

// select
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// importing my component
import { clsUpdate, db } from "../component/firebase";
import { filt } from "../component/sorting";
import Datatable from "../component/Datatable";

import { useParams } from "react-router-dom";
// transtation value
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
var id = null;
const setId = (x) => {
  id = x;
};
var globleObj = {};

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
      padding: 14,
    },
    container: {
      maxHeight: 440,
    },
  });
  const styles = useStyles();
  // dialouge value

  const [open, setOpen] = useState(true);
  const [classes, setClasses] = useState("");
  let { course, classId } = useParams();
  const [navId, setNavId] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const { currentUser } = useAuth();

  const fetch = () => {
    db.collection("courses")
      .doc(course)
      .collection("chapter")
      .doc(classId)
      .get()
      .then((x) => {
        globleObj = x.data();
        const arr = x.data().classes === undefined ? [] : x.data().classes;
        setClasses(arr);
        setOpen(false);
      });
  };

  useEffect(() => {
    if (!currentUser) {
      setNavId("/login");
    } else {
      fetch();
    }
  }, []);

  // functions
  const edit = (editId = null) => {
    if (editId === null) {
      setId(null);
      setOpen(true);
    } else {
      setId(editId);
      setOpen(true);
    }
  };
  const del = (delId) => {
    try {
      setLoading(true);
      const arr = classes;
      const nwarr = arr.filter((x) => {
        return x.id !== delId;
      });
      globleObj.classes = nwarr;
      clsUpdate(`courses/${course}/chapter/${classId}`, globleObj);
    } catch (err) {
      setError("failed to delete data");
    }
    fetch();
    setLoading(false);
  };

  //   data column
  const columns = [
    { id: "no", label: "No.", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 60 },
    { id: "link", label: "Link", minWidth: 50 },
  ];

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
          no: temp.no === undefined ? "" : temp.no,
          name: temp.name === undefined ? "" : temp.name,
          type: temp.type === undefined ? "" : temp.type,
          date: temp.date === undefined ? "" : temp.date,
          link: temp.link === undefined ? "" : temp.link,
        };
        return obj;
      } else {
        const temp = defaultValues;
        const d = new Date();
        temp.date = `${d.getDate().toString()}/${d.getMonth().toString()}/${d
          .getFullYear()
          .toString()}`;
        temp.type = "link";
        return temp;
      }
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      setError(null);
      if (id === null) {
        try {
          setLoading(true);
          const arr = classes;
          arr.push({
            ...formValues,
            id: new Date().getTime().toString(),
          });
          globleObj.classes = arr;
          clsUpdate(`courses/${course}/chapter/${classId}`, globleObj);
        } catch (err) {
          setError("failed to add data");
        }
        setLoading(false);
        fetch();
      } else {
        try {
          setLoading(true);
          const arr = classes;
          const nwarr = arr.map((x) => {
            if (x.id === id) {
              return { ...formValues, id: id };
            } else {
              return x;
            }
          });
          globleObj.classes = nwarr;
          clsUpdate(`courses/${course}/chapter/${classId}`, globleObj);
        } catch (err) {
          setError("failed to edit data");
        }
        setLoading(false);
        fetch();
      }
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
          <DialogContent style={{}}>
            <form onSubmit={handleSubmit}>
              <Grid container direction="column" justifyContent="center">
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
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="type"
                      style={{ width: 90 }}
                      value={formValues.type}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="link">Class Link</MenuItem>
                      <MenuItem value="pdf">PDF Link</MenuItem>
                      <MenuItem value="exam">Exam Link</MenuItem>
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
              disabled={loading}
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
              disabled={loading}
              onClick={handleSubmit}
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
        <div style={{ width: "93%" }}>
          {error && <Alert severity="error">{error}</Alert>}
          <Datatable
            data={filt("link", classes)}
            columns={columns}
            edit={edit}
            del={del}
            loading={loading}
            editable={true}
          />
          <Form />
          {filt("exam", classes).length !== 0 ? (
            <Datatable
              data={filt("exam", classes)}
              columns={columns}
              edit={edit}
              del={del}
              loading={loading}
              editable={true}
            />
          ) : (
            ""
          )}
          {filt("pdf", classes).length !== 0 ? (
            <Datatable
              data={filt("pdf", classes)}
              columns={columns}
              edit={edit}
              del={del}
              loading={loading}
              editable={true}
            />
          ) : (
            ""
          )}
          {filt("msg", classes).length !== 0 ? (
            <Datatable
              data={filt("msg", classes)}
              columns={columns}
              edit={edit}
              del={del}
              loading={loading}
              editable={true}
            />
          ) : (
            ""
          )}
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
