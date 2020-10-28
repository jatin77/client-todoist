import { Button } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import LoadingSubmitBtn from "../../components/utility/LoadingSubmitBtn";
import EditIcon from "@material-ui/icons/Edit";
import "./style.scss";
import { updateEmail, updateName } from "../../redux/user/user.action";
import ChangePasswordModal from "../../components/ChangePasswordModal";

const Profile = ({ user, updateName, updateEmail }) => {
  const firstRender = useRef(true);
  const firstRenderSec = useRef(true);
  const { me, updateNameLoading, updateEmailLoading } = user;
  const [name, setName] = useState(me ? me.name : "");
  const [email, setEmail] = useState(me ? me.email : "");
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail) {
      alert("Incorrect email");
    } else {
      updateEmail({ email });
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Incorrect name");
    } else {
      updateName({ name });
    }
  };

  const validateEmail = () => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Close add dialog
    if (!updateEmailLoading) {
      setEditEmail(false);
    }
  }, [updateEmailLoading]);

  useEffect(() => {
    if (firstRenderSec.current) {
      firstRenderSec.current = false;
      return;
    }

    // Close add dialog
    if (!updateNameLoading) {
      setEditName(false);
    }
  }, [updateNameLoading]);

  return (
    <div>
      <h5>Personal Information</h5>
      {me && (
        <ul className="me-list">
          <li>
            Name{" "}
            {!editName && (
              <span className="descText">
                {me.name}{" "}
                <EditIcon
                  className="editIcon cursor-pointer"
                  size="small"
                  style={{ width: "1rem", color: "#db4c3f" }}
                  onClick={() => setEditName(true)}
                />
              </span>
            )}
            {editName && (
              <form className="d-flex" onSubmit={handleNameSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} />

                <div className="mx-3">
                  <LoadingSubmitBtn
                    handleLoadingBtnClick={handleNameSubmit}
                    text="Save"
                    loading={updateNameLoading}
                  />
                </div>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setEditName(false)}
                >
                  Cancel
                </Button>
              </form>
            )}
          </li>
          <li>
            Email{" "}
            {!editEmail && (
              <span className="descText">
                {me.email}{" "}
                <EditIcon
                  className="editIcon cursor-pointer"
                  size="small"
                  style={{ width: "1rem", color: "#db4c3f" }}
                  onClick={() => setEditEmail(true)}
                />
              </span>
            )}
            {editEmail && (
              <form className="d-flex" onSubmit={handleEmailSubmit}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="mx-3">
                  <LoadingSubmitBtn
                    handleLoadingBtnClick={handleEmailSubmit}
                    text="Save"
                    loading={updateEmailLoading}
                  />
                </div>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setEditEmail(false)}
                >
                  Cancel
                </Button>
              </form>
            )}
          </li>
          <li>
            Password{" "}
            <Button
              size="small"
              className="changePassword-btn"
              variant="outlined"
              onClick={() => setOpenModal(true)}
            >
              Change Password
            </Button>
          </li>
        </ul>
      )}
      {openModal && (
        <ChangePasswordModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateName: (data) => dispatch(updateName(data)),
  updateEmail: (data) => dispatch(updateEmail(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
