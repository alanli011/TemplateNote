import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import { getNote, deleteNote } from '../../store/notes';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column'
	},
	editor: {
		height: '100vh'
	},
	note__header: {
		padding: theme.spacing(3, 2),
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	delete: {
		color: 'red',
		'&:hover': {
			cursor: 'pointer'
		}
	}
}));

const RichTextEditor = (props) => {
	const { notebooksId, noteId } = useParams();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authentication.currentUser);
	const note = useSelector((state) => state.note.note);
	const token = useSelector((state) => state.authentication.token);

	const [ value, setValue ] = useState('');

	const deleteNoteHandler = () => {
		if (token) {
			dispatch(deleteNote(notebooksId, noteId, token));
			props.history.push(`/users/${currentUser.userId}/notebooks/${notebooksId}/notes`);
		}
	};

	useEffect(
		() => {
			if (currentUser) {
				dispatch(getNote(currentUser.userId, notebooksId, noteId));
			}
		},
		[ currentUser, dispatch, noteId, notebooksId ]
	);

	const classes = useStyles();

	const modules = {
		toolbar: [
			[ { font: [] } ],
			[ { size: [ 'small', false, 'large', 'huge' ] } ],
			[ 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block' ],
			[ { list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' } ],
			[ { color: [] }, { background: [] } ],
			[ 'link', 'image', 'video' ],
			[ 'clean' ]
		]
	};

	const formats = [
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'code-block',
		'list',
		'bullet',
		'indent',
		'color',
		'background',
		'link',
		'image',
		'video'
	];
	return (
		<main className={classes.root}>
			{note && (
				<React.Fragment>
					<div className={classes.note__header}>
						<div>
							<Typography variant="h4">{note.title}</Typography>
						</div>
						<div>
							<DeleteForeverIcon onClick={deleteNoteHandler} className={classes.delete} />
						</div>
					</div>
					{/* <input type="text" value="" placeholder="Title of your note" /> */}
					<div>
						<ReactQuill
							theme="snow"
							value={note.content}
							onChange={setValue}
							formats={formats}
							modules={modules}
							className={classes.editor}
							placeholder="Start typing here..."
						/>
					</div>
				</React.Fragment>
			)}
		</main>
	);
};

export default withRouter(RichTextEditor);
