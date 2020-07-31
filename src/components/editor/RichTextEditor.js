import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import { getNote, deleteNote, updateNote } from '../../store/notes';
import TemplateButton from './TemplateButton';

import { TextField, Button } from '@material-ui/core';
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
	},
	input__width: {
		width: '35vw'
	},
	inputStyles: {
		width: 'inherit'
	},
	action__section: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	margin: {
		marginRight: theme.spacing(2)
	}
}));

const RichTextEditor = (props) => {
	const { notebooksId, noteId } = useParams();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authentication.currentUser);
	const note = useSelector((state) => state.note.note);
	const token = useSelector((state) => state.authentication.token);

	const [ content, setContent ] = useState('');
	const [ latestContent, setLatestContent ] = useState('');
	const [ noteTitle, setNoteTitle ] = useState('');
	const [ open, setOpen ] = useState(false);
	const [ selectedTemplate, setSelectedTemplate ] = useState(null);

	const deleteNoteHandler = () => {
		if (token) {
			dispatch(deleteNote(notebooksId, noteId, token));
			props.history.push(`/users/${currentUser.userId}/notebooks/${notebooksId}/notes`);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
		setSelectedTemplate(value);
		setContent(value);
	};

	const handleTitleChange = (e) => {
		setNoteTitle(e.target.value);
	};

	const handleQuillChange = (content, delta, source, editor) => {
		if (note) {
			setContent(content);
		}
	};

	const saveNoteHandler = () => {
		if (currentUser && note) {
			dispatch(updateNote(currentUser.userId, notebooksId, noteId, noteTitle, content, token));
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

	useEffect(
		() => {
			if (note) {
				setContent(note.content);
				setNoteTitle(note.title);
			}
		},
		[ note ]
	);

	useEffect(
		() => {
			if (currentUser && note) {
				const timer = setTimeout(() => {
					if (latestContent !== content) {
						dispatch(updateNote(currentUser.userId, notebooksId, noteId, noteTitle, content, token));
						setLatestContent(content);
						// console.log('this useEffect is hit');
					}
				}, 3000);
				return () => clearTimeout(timer);
			}
		},
		// eslint-disable-next-line
		[ content ]
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
						<div className={classes.input__width}>
							<TextField
								value={noteTitle}
								onChange={handleTitleChange}
								placeholder="Untitled"
								fullWidth
								type="text"
								className={classes.inputStyles}
								variant="outlined"
								label="Title"
							/>
						</div>
						<div className={classes.action__section}>
							<Button
								variant="outlined"
								color="secondary"
								className={classes.margin}
								onClick={handleClickOpen}
							>
								Apply Templates
							</Button>
							<TemplateButton selectedTemplate={selectedTemplate} open={open} onClose={handleClose} />
							<SaveIcon onClick={saveNoteHandler} color="primary" className={classes.hover} />
							<DeleteForeverIcon onClick={deleteNoteHandler} className={classes.delete} />
						</div>
					</div>
					{selectedTemplate ? (
						<div className={classes.maxHeight}>
							<ReactQuill
								theme="snow"
								value={content}
								onChange={handleQuillChange}
								formats={formats}
								modules={modules}
								className={classes.editor}
								placeholder="Start typing here..."
							/>
						</div>
					) : (
						<div className={classes.maxHeight}>
							<ReactQuill
								theme="snow"
								value={content}
								onChange={handleQuillChange}
								formats={formats}
								modules={modules}
								className={classes.editor}
								placeholder="Start typing here..."
							/>
						</div>
					)}
				</React.Fragment>
			)}
		</main>
	);
};

export default withRouter(RichTextEditor);
