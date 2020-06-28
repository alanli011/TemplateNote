import React, { forwardRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
	Dialog,
	Slide,
	TextField,
	Typography,
	List,
	ListItemText,
	ListItem,
	Divider,
	AppBar,
	Toolbar,
	Button
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	appBar: {
		position: 'relative'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	}
}));

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const CreateTemplateModal = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Sound
						</Typography>
						<Button autoFocus color="inherit" onClick={props.handleClose}>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<List>
					<ListItem button>
						<ListItemText primary="Phone ringtone" secondary="Titania" />
					</ListItem>
					<Divider />
					<ListItem button>
						<ListItemText primary="Default notification ringtone" secondary="Tethys" />
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
};

export default CreateTemplateModal;
