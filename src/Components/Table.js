import React, { useState, useEffect } from "react";
import "./Table.scss";
import AddIcon from "@material-ui/icons/Add";
import Modal from "./Modal/Modal";
import db from "../firebase";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";

function Table(props) {
  const [type, setType] = useState("");
  const [personalInfo, setPersonalInfo] = useState([]);

  useEffect(() => {
    db.collection("unocoin").onSnapshot((snapshot) =>
      setPersonalInfo(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          personalData: doc.data(),
        }))
      )
    );
  }, []);

  const changeTypeHandler = (type) => {
    setType(type);
  };

  const editHandler = (id) => {
    props.id(id);
    changeTypeHandler("edit");
  };

  const deleteHandler = (id) => {
    props.id(id);
    changeTypeHandler("delete");
  };

  return (
    <div className="data_table">
      <div className="adduser_table">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() => changeTypeHandler("CreateUser")}
        >
          <AddIcon /> Add User
        </button>
      </div>
      <div>
        <Modal type={type} />
      </div>
      <div>
        <table class="table table-bordered">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>Id</th>
              <th>Name</th>
              <th>City</th>
              <th>DOB</th>
              <th>Phone No.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {personalInfo.map((data, index) => (
              <tr style={{ textAlign: "center" }}>
                <td>{index + 1}</td>
                <td>{data.personalData.name}</td>
                <td>{data.personalData.city}</td>
                <td>{data.personalData.date}</td>
                <td>{data.personalData.phone}</td>
                {data.personalData.name ||
                data.personalData.city ||
                data.personalData.date ||
                data.personalData.phone ? (
                  <td style={{ cursor: "pointer" }}>
                    <EditIcon
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => editHandler(data.id)}
                    />
                    <DeleteIcon
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => deleteHandler(data.id)}
                    />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    id: (id) => dispatch({ type: "ID", id: id }),
  };
};

export default connect(null, mapDispatchToProps)(Table);
