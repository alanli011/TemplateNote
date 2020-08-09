import React, { useEffect } from 'react';
import { useParams, Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNoteBookData, getOneNoteBook } from '../../store/notebooks';
import { createNote } from '../../store/notes';

import { List, ListItem, ListItemText, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// setting the drawer width (navigation) to be 300px
const drawerWidth = 300;

// styles for Single Notebook component
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: drawerWidth,
		height: '100vh',
		backgroundColor: theme.palette.success.main,
		borderRight: `1px solid ${theme.palette.text.disabled}`,
		paddingTop: theme.spacing(2),
		overflowY: 'auto'
	},
	alignCenter: {
		textAlign: 'center'
	},
	listNotes: {
		height: '7.5vh'
	},
	listStyle: {
		width: '100%'
	},
	linkStyle: {
		textDecoration: 'none',
		color: 'inherit'
	},
	addStyle: {
		marginTop: theme.spacing(2),
		width: '40px',
		height: '40px',
		'&:hover': {
			cursor: 'pointer'
		}
	}
}));

const SingleNotebook = (props) => {
	// use react router useParams method to grab notebooksId
	const { notebooksId } = useParams();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authentication.currentUser);
	const token = useSelector((state) => state.authentication.token);
	const notebookData = useSelector((state) => state.currentNotebook);
	const notebook = useSelector((state) => state.notebook);

	// setting default values for the title of the note and the rich text editor
	let title = 'Untitled';
	let content = '';

	const classes = useStyles();

	// if the currentUser is logged in, dispatch to redux store to get all the notebooks data and the notebook
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

	// this useEffect will name the browser tab title
	useEffect(
		() => {
			if (notebook) {
				document.title = `TemplateNote - ${notebook.name}`;
			}
		},
		[ notebook ]
	);

	// this function will handle the creating of the note
	// when it's created, it will also move our "component" browser url see all the notes.
	const handleCreateNote = () => {
		if (currentUser) {
			dispatch(createNote(notebooksId, title, content, token));
			props.history.push(`/users/${currentUser.userId}/notebooks/${notebooksId}/notes`);
		}
	};

	return (
		<div className={classes.root}>
			{notebookData &&
			notebook && (
				<React.Fragment>
					<Typography variant="h5" className={classes.alignCenter}>
						{notebook.name}
					</Typography>
					<Typography variant="h6" className={classes.alignCenter}>
						All Notes
					</Typography>
					<Typography variant="body1">{`${notebookData.length}`} notes</Typography>
				</React.Fragment>
			)}
			<List className={classes.listStyle}>
				{notebookData &&
					currentUser &&
					notebookData.map((note) => (
						<Link
							to={`/users/${currentUser.userId}/notebooks/${notebooksId}/notes/${note.id}`}
							className={classes.linkStyle}
							key={note.id}
						>
							<ListItem button className={classes.listNotes}>
								<ListItemText>
									<Typography variant="h6">{note.title}</Typography>
								</ListItemText>
							</ListItem>
							<Divider />
						</Link>
					))}
			</List>
			<AddCircleIcon color="primary" className={classes.addStyle} onClick={handleCreateNote} />
		</div>
	);
};

export default withRouter(SingleNotebook);
