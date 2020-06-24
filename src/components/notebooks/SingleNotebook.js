import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNoteBookData, getOneNoteBook } from '../../store/notebooks';

import { List, ListItem, ListItemText, Typography, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: drawerWidth,
		height: '100vh',
		backgroundColor: theme.palette.success.main,
		borderRight: `1px solid ${theme.palette.text.disabled}`
	}
}));

const SingleNotebook = (props) => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authentication.currentUser);
	const notebookData = useSelector((state) => state.notebooks.notebookNotes);
	const notebook = useSelector((state) => state.notebooks.notebook);
	const { notebooksId } = useParams();
	const classes = useStyles();

	console.log('notebook data: ', notebookData);
	console.log('notebook: ', notebook);
	useEffect(
		() => {
			if (currentUser) {
				dispatch(getNoteBookData(currentUser.userId, notebooksId));
				dispatch(getOneNoteBook(currentUser.userId, notebooksId));
			}
		},
		// eslint-disable-next-line
		[ currentUser, dispatch ]
	);

	return (
		<div className={classes.root}>
			{notebook && <Typography variant="h5">{notebook.name}</Typography>}

			<List>
				{[ 'Inbox', 'Starred', 'Send email', 'Drafts' ].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default SingleNotebook;
