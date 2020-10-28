import React from "react";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
  hoverText: {
    borderRadius: "3px",
    border: "1px solid #ccc",
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    padding: "4px 8px",
  },
  popList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
}));

export default function InfoPopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <div style={{ margin: "20px auto 0 auto", width: "fit-content" }}>
        <p
          className={classes.hoverText}
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <EmojiObjectsIcon style={{ color: "#DAA520	" }} />
          How can i use projects?
        </p>
      </div>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <ul className={classes.popList}>
          <li>
            <CheckIcon size="small" /> Separate work tasks from personal ones
          </li>
          <li>
            <CheckIcon size="small" /> Create a step-by-step plan toward a
            personal goal
          </li>
        </ul>
      </Popover>
    </div>
  );
}
