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

// my component
import { db } from "../component/firebase";
import { filt } from "../component/sorting";
import Datatable from "../component/Datatable";

// transtation value
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
var id = null;
const setId = (x) => {
  id = x;
};

const columns = [
  { id: "no", label: "No.", minWidth: 50 },
  { id: "name", label: "Topics", minWidth: 150 },
  { id: "date", label: "Date", minWidth: 60 },
  { id: "link", label: "Links", minWidth: 50 },
];

export default function Routine() {
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

  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [navId, setNavId] = useState();
  const [error, setError] = useState();
  const { currentUser } = useAuth();

  const fetch = () => {
    db.collection("courses")
      .doc("routine")
      .collection("routine")
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
        setData(arr);
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
      db.collection("courses")
        .doc("routine")
        .collection("routine")
        .doc(delId)
        .delete();
    } catch (err) {
      setError("failed to delete data");
    }
    fetch();
  };

  //   data column
  const columns = [
    { id: "no", label: "No.", minWidth: 50 },
    { id: "name", label: "Notice/Routine", minWidth: 100 },
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
        var temp = data.filter((x) => {
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
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if (id === null) {
        try {
          db.collection("courses")
            .doc("routine")
            .collection("routine")
            .add(formValues);
        } catch (err) {
          setError("failed to add data");
        }
        setError(null);
        fetch();
      } else {
        try {
          db.collection("courses")
            .doc("routine")
            .collection("routine")
            .doc(id)
            .update(formValues);
        } catch (err) {
          setError("failed to edit data");
        }
        setError(null);
        fetch();
      }
      setOpen(false);
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
                      <MenuItem value="routine">Routine</MenuItem>
                      <MenuItem value="notice">Notice</MenuItem>
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
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {id !== null ? "Edit" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  return (
    <>
      {data !== "" ? (
        <div style={{ width: "93%" }}>
          {error && <Alert severity="error">{error}</Alert>}
          <Form />
          {filt("routine", data).length !== 0 ? (
            <Datatable
              data={filt("routine", data)}
              columns={columns}
              edit={edit}
              del={del}
              loading={false}
              editable={true}
            />
          ) : (
            ""
          )}
          {filt("notice", data).length !== 0 ? (
            <Datatable
              data={filt("notice", data)}
              columns={columns}
              edit={edit}
              del={del}
              loading={false}
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
