import React from 'react';
import ReactQuill from 'react-quill';

import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2)
	},
	editor: {
		height: '80vh'
	}
}));

const TemplateEditor = (props) => {
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

	const classes = useStyles();

	return (
		<main className={classes.root}>
			<TextField
				value={props.title}
				onChange={props.handleTitleChange}
				fullWidth
				type="text"
				variant="outlined"
				label="Title"
			/>
			<div className={classes.maxHeight}>
				<ReactQuill
					theme="snow"
					value={props.content}
					onChange={props.handleQuillChange}
					formats={formats}
					modules={modules}
					className={classes.editor}
					placeholder="Start Creating Your Own Templates"
				/>
			</div>
		</main>
	);
};

export default TemplateEditor;
