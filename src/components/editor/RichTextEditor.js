import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import { getNote } from '../../store/notes';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column'
	},
	editor: {
		height: '100vh'
	}
}));

const RichTextEditor = (props) => {
	const { notebooksId, noteId } = useParams();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authentication.currentUser);
	const note = useSelector((state) => state.note.note);

	const [ value, setValue ] = useState('');

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
					<div>
						<h1>{note.title}</h1>
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

export default RichTextEditor;
