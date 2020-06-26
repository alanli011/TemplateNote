import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth0 } from '../react-auth0-spa';
// import { setUser, setToken } from '../store/authentication';
import Mode from './Mode';

import {
	Divider,
	Drawer,
	Hidden,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	Avatar,
	IconButton,
	AppBar
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NoteIcon from '@material-ui/icons/Note';
import EventNoteIcon from '@material-ui/icons/EventNote';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		display: 'flex',
		justifyContent: 'start',
		marginLeft: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	red: {
		color: '#d50000'
	},
	linkStyle: {
		textDecoration: 'none',
		color: 'inherit'
	},
	avatar: {
		width: 25,
		height: 25
	}
}));

const Navigation = (props) => {
	const { window } = props;
	const [ mobileOpen, setMobileOpen ] = useState(false);
	const { logout } = useAuth0();

	// const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authentication.currentUser);

	const classes = useStyles();
	const theme = useTheme();

	// function to handle the toggle for menu icon in mobile
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	// uses Auth0's logout feature to return to '/' upon logout
	const handleLogout = () => {
		logout({
			returnTo: 'http://localhost:3000'
		});
	};

	// this will return the entire side navigation
	const drawer = (
		<React.Fragment>
			{currentUser && (
				<React.Fragment>
					<List>
						<Link to="/home" className={classes.linkStyle}>
							<ListItem button>
								<ListItemIcon />
								<ListItemText>
									<Typography variant="subtitle1">TemplateNote</Typography>
								</ListItemText>
							</ListItem>
						</Link>
						<ListItem>
							<ListItemIcon>
								<Avatar
									alt={currentUser.nickname}
									src={currentUser.picture}
									className={classes.avatar}
								/>
							</ListItemIcon>
							<ListItemText>
								<Typography variant="subtitle1">{currentUser.nickname}</Typography>
							</ListItemText>
						</ListItem>
					</List>
					<Divider />
					<List>
						<Link to="/notebooks" className={classes.linkStyle}>
							<ListItem button>
								<ListItemIcon>
									<NoteIcon color="primary" />
								</ListItemIcon>
								<ListItemText>
									<Typography variant="subtitle1">Notebooks</Typography>
								</ListItemText>
							</ListItem>
						</Link>
						<ListItem button>
							<ListItemIcon>
								<EventNoteIcon color="secondary" />
							</ListItemIcon>
							<ListItemText>
								<Typography variant="subtitle1">Templates</Typography>
							</ListItemText>
						</ListItem>
						<ListItem>
							<Mode />
						</ListItem>
						<ListItem button onClick={handleLogout}>
							<ListItemIcon>
								<ExitToAppIcon className={classes.red} />
							</ListItemIcon>
							<ListItemText>
								<Typography variant="subtitle1">Logout</Typography>
							</ListItemText>
						</ListItem>
					</List>
				</React.Fragment>
			)}
		</React.Fragment>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<React.Fragment>
			<AppBar position="fixed" className={classes.appBar}>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					className={classes.menuButton}
				>
					<MenuIcon />
					<Typography variant="h6" noWrap>
						TemplateNote
					</Typography>
				</IconButton>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</React.Fragment>
	);
};

Navigation.propTypes = {
	/**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
	window: PropTypes.func
};

export default Navigation;
