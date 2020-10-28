import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import { NavLink } from "react-router-dom";
import "./style.scss";
import SettingsIcon from "@material-ui/icons/Settings";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { getMe, logout } from "../../../redux/user/user.action";
import { getAllProjects } from "../../../redux/projects/projects.action";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";
import { selectProjects } from "../../../redux/projects/projects.selector";
import AddProject from "../AddProject";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#db4c3f",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: "800px",
    margin: "0 auto",
  },
  logo: {
    width: "2rem",
  },
  headRight: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  },
  menuIcon: {
    fontSize: "16px",
    marginRight: "1rem",
  },
}));

const Layout = ({
  children,
  getMe,
  user,
  logout,
  getAllProjects,
  projects,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [collapse, setCollapse] = React.useState(true);
  const [addEditProject, setAddEditProject] = React.useState(false);

  const open = Boolean(anchorEl);
  const { allProjects } = projects;
  const { token } = user;

  useEffect(() => {
    if (token) {
      getMe();
      getAllProjects();
    }
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const handleAddEditProject = () => {
    setAddEditProject(true);
  };

  const cancelAddEditProject = () => {
    setAddEditProject(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img className={classes.logo} src="/logo.png" alt="" />
          <div className={classes.headRight}>
            {user.me && (
              <Typography variant="h6" className="mr-3">
                {user.me.name}
              </Typography>
            )}
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <NavLink to="/profile" className="selectLink">
                <MenuItem onClick={handleClose}>
                  <SettingsIcon className={classes.menuIcon} />
                  My Account
                </MenuItem>
              </NavLink>
              <MenuItem onClick={handleLogout}>
                <ExitToAppIcon className={classes.menuIcon} />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <NavLink
              to="/all-notes"
              activeClassName="selected"
              className="selectLink"
            >
              <ListItem button key="All Notes">
                <ListItemIcon>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <g fill="#246fe0" fillRule="nonzero">
                      <path
                        d="M10 14.5a2 2 0 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                        opacity="0.1"
                      ></path>
                      <path d="M8.062 4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                    </g>
                  </svg>
                </ListItemIcon>
                <span className="linkText">All Notes</span>
              </ListItem>
            </NavLink>

            <NavLink
              to="/today"
              activeClassName="selected"
              className="selectLink"
            >
              <ListItem button key="Today">
                <ListItemIcon>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <g fill="#058527" fillRule="evenodd">
                      <path
                        fillRule="nonzero"
                        d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                        opacity=".1"
                      ></path>
                      <path
                        fillRule="nonzero"
                        d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                      ></path>
                      <text
                        fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                        fontSize="9"
                        transform="translate(4 2)"
                        fontWeight="500"
                      >
                        <tspan x="8" y="15" textAnchor="middle">
                          {new Date().getDate()}
                        </tspan>
                      </text>
                    </g>
                  </svg>
                </ListItemIcon>
                <span className="linkText">Today</span>
              </ListItem>
            </NavLink>

            <NavLink
              to="/next7days"
              activeClassName="selected"
              className="selectLink"
            >
              <ListItem button key="Today">
                <ListItemIcon>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <g fill="#692fc2" fillRule="evenodd">
                      <path
                        fillRule="nonzero"
                        d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                        opacity=".1"
                      ></path>
                      <path
                        fillRule="nonzero"
                        d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm10 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm8-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM7 8h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                      ></path>
                    </g>
                  </svg>
                </ListItemIcon>
                <span className="linkText">Next 7 Days</span>
              </ListItem>
            </NavLink>
          </List>
          <Divider />
          <ListItem button onClick={handleCollapse}>
            <span className="linkText mr-auto">Projects</span>
            {collapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={collapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {allProjects &&
                allProjects.map((project) => (
                  <NavLink
                    to={`/project/${project._id}`}
                    activeClassName="selected"
                    className="selectLink"
                    key={project._id}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <FiberManualRecordIcon
                          style={{
                            width: "1rem",
                            color: Math.floor(
                              Math.random() * 16777215
                            ).toString(16),
                          }}
                        />
                      </ListItemIcon>

                      <span className="linkText">{project.name} </span>
                    </ListItem>
                  </NavLink>
                ))}
            </List>
          </Collapse>
          <div
            onClick={() => handleAddEditProject()}
            className="d-flex align-items-center cursor-pointer"
          >
            <span className="mr-2">
              <Tooltip title="Add Note">
                <IconButton aria-label="add note">
                  <AddIcon className="addIcon" />
                </IconButton>
              </Tooltip>
            </span>
            Add Project
          </div>
          {addEditProject && (
            <AddProject cancelAddEditProject={cancelAddEditProject} />
          )}
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  getMe: (data) => dispatch(getMe()),
  logout: () => dispatch(logout()),
  getAllProjects: () => dispatch(getAllProjects()),
});

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  projects: selectProjects,
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
