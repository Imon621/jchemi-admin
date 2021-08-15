import React, { useEffect, useState } from "react";
import { db } from "../component/firebase";
import Datatable from "../component/Datatable";

import { Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// material ui
import { CircularProgress } from "@material-ui/core";
import { revSorter } from "../component/sorting";

const columns = [
  { id: "no", label: "No.", minWidth: 50 },
  { id: "name", label: "logs", minWidth: 150 },
  { id: "date", label: "Date", minWidth: 60 },
  { id: "link", label: "Links", minWidth: 50 },
];

export default function Logs() {
  const [logs, setLogs] = useState("");
  const [navId, setNavId] = useState();
  const { currentUser } = useAuth();

  const fetch = () => {
    db.collection("app")
      .doc("data")
      .collection("logs")
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
        setLogs(arr);
      });
  };

  useEffect(() => {
    if (!currentUser) {
      setNavId("/login");
    } else {
      fetch();
    }
  }, []);

  return (
    <div style={{ width: "93%" }}>
      {logs !== "" ? (
        <>
          {logs !== [] ? (
            <Datatable
              data={revSorter(logs)}
              columns={columns}
              loading={false}
              editable={false}
            />
          ) : (
            "no data to show"
          )}
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
      {navId ? <Redirect to={navId} /> : ""}
    </div>
  );
}
