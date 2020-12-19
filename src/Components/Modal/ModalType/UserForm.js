import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./UserForm.scss";
import { connect } from "react-redux";
import db from "../../../firebase";

function UserForm({ dataHandler, id, type }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (type === "CreateUser") {
      setName("");
      setDate("");
      setCity("");
      setPhone("");
    }
    if (type === "edit") {
      // if (id) {
      db.collection("unocoin")
        .doc(id)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setName(doc.data().name);
            setDate(doc.data().date);
            setCity(doc.data().city);
            setPhone(doc.data().phone);
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, [id, type]);

  const onChangeHandler = (e, type) => {
    switch (type) {
      case "Name":
        setName(e.target.value);
        break;
      case "Date":
        setDate(e.target.value);
        break;
      case "City":
        setCity(e.target.value);
        break;
      default:
        setPhone(e.target.value);
    }
    dataHandler(e.target.value, type);
  };

  return (
    <div className="userform container">
      <div className="row ">
        <div className="col-md-2 mb-2">
          <label>Name</label>
        </div>
        <div className="col-md-10 mb-2">
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={name}
            onChange={(e) => onChangeHandler(e, "Name")}
          />
        </div>
        <div className="col-md-2 mb-2">
          <label>DOB</label>
        </div>
        <div className="col-md-10 mb-2">
          <TextField
            variant="outlined"
            id="date"
            type="date"
            onChange={(e) => onChangeHandler(e, "Date")}
            defaultValue="yyyy-mm-dd"
            value={date}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="col-md-2 mb-2">City</div>
        <div className="col-md-10 mb-2">
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={city}
            onChange={(e) => onChangeHandler(e, "City")}
          />
        </div>
        <div className="col-md-2 mb-2">Phone</div>
        <div className="col-md-10 mb-2">
          <TextField
            id="outlined-basic"
            type="number"
            variant="outlined"
            value={phone}
            onChange={(e) => onChangeHandler(e, "Phone")}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
  };
};

export default connect(mapStateToProps)(UserForm);
