import React, { useEffect, useRef, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import LoadingSubmitBtn from "../utility/LoadingSubmitBtn";
import "./style.scss";
import { connect } from "react-redux";
import { updatePassword } from "../../redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ChangePasswordModal = ({
  openModal,
  handleCloseModal,
  updatePassword,
  user,
}) => {
  const firstRender = useRef(true);
  const { updatePasswordLoading } = user;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      alert("Invalid inputs");
    } else {
      //call API
      updatePassword({ currentPassword, newPassword });
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Close add dialog
    if (!updatePasswordLoading) {
      handleCloseModal();
    }
  }, [updatePasswordLoading]);

  return (
    <div>
      <Dialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
          Change Password
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="password">Current Password</label>
              <input
                type="text"
                id="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="text"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="d-flex">
              <div className="mr-3">
                <LoadingSubmitBtn
                  handleLoadingBtnClick={handleSubmit}
                  text="Save"
                  loading={updatePasswordLoading}
                />
              </div>
              <Button
                size="small"
                variant="outlined"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updatePassword: (data) => dispatch(updatePassword(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordModal);
