import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import { getNote, deleteNote, updateNote } from '../../store/notes';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column'
	},
	editor: {
		height: 'inherit',
		overflow: 'scroll'
	},
	maxHeight: {
		height: '100%'
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
	},
	hover: {
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

	useEffect(
		() => {
			if (note) {
				setValue(note.content);
			}
		},
		[ note ]
	);

	const deleteNoteHandler = () => {
		if (token) {
			dispatch(deleteNote(notebooksId, noteId, token));
			props.history.push(`/users/${currentUser.userId}/notebooks/${notebooksId}/notes`);
		}
	};

	const handleQuillChange = (content, delta, source, editor) => {
		if (note) {
			setValue(content);
		}
	};

	const saveNoteHandler = () => {
		if (currentUser && note) {
			dispatch(updateNote(currentUser.userId, notebooksId, noteId, note.title, value, token));
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
							<SaveIcon onClick={saveNoteHandler} color="primary" className={classes.hover} />
							<DeleteForeverIcon onClick={deleteNoteHandler} className={classes.delete} />
						</div>
					</div>
					{/* <input type="text" value="" placeholder="Title of your note" /> */}
					<div className={classes.maxHeight}>
						<ReactQuill
							theme="snow"
							value={value}
							onChange={handleQuillChange}
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
