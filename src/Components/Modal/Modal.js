import React, { useState, useEffect } from "react";
import "./Modal.scss";
import UserForm from "./ModalType/UserForm";
import db from "../../firebase";
import { connect } from "react-redux";
import DeleteUser from "./ModalType/DeleteUser";

function Modal({ type, id, user }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    if (type === "CreateUser") setModalType("Create User");
    if (type === "edit") setModalType("Update User");
    if (type === "delete") setModalType("");
    if (id) {
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
  }, [id]);

  const dataHandler = (data, type) => {
    switch (type) {
      case "Name":
        return setName(data);
        break;
      case "Date":
        return setDate(data);
        break;
      case "City":
        return setCity(data);
        break;
      default:
        return setPhone(data);
    }
  };

  const saveDataHandler = () => {
    if (type == "CreateUser") {
      db.collection("unocoin").add({
        name: name,
        date: date,
        city: city,
        phone: phone,
      });
      user();
    }
    if (type === "edit") {
      db.collection("unocoin").doc(id).update({
        name: name,
        date: date,
        city: city,
        phone: phone,
      });
    }
  };

  const closeHandler = () => {
    setName("");
    setDate("");
    setCity("");
    setPhone("");
  };

  const deleteHandler = () => {
    db.collection("unocoin")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                <strong>{modalType}</strong>
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              {type === "delete" ? (
                <DeleteUser />
              ) : (
                <UserForm dataHandler={dataHandler} type={type} />
              )}
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={closeHandler}
              >
                {type === "delete" ? "NO" : "Close"}
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={type === "delete" ? deleteHandler : saveDataHandler}
              >
                {type === "delete" ? "Yes" : "Save changes"}
              </button>
            </div>
          </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    user: () => dispatch({ type: "USER", user: true }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
