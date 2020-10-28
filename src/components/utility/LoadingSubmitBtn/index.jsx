import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { indigo } from "@material-ui/core/colors";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    position: "relative",
  },

  buttonProgress: {
    color: "#db4c3f",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(indigo[900]),
    backgroundColor: "#db4c3f",
    "&:hover": {
      backgroundColor: "#db4c3f",
    },
  },
}))(Button);

export default function LoadingSubmitBtn({
  loading,
  text,
  disabled,
  fullWidth,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        className={classes.wrapper}
        style={{ width: fullWidth ? "100%" : "auto" }}
      >
        <ColorButton
          fullWidth={true}
          variant="contained"
          disabled={loading}
          type="submit"
          size="medium"
          disabled={disabled || loading}
          size="small"
          fullWidth={fullWidth}
        >
          {text}
        </ColorButton>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}
