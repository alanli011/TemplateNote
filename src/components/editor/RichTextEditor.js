import React, { useState } from 'react';
import ReactQuill from 'react-quill';

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
	const [ value, setValue ] = useState('some string');
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
			<div>
				<h1>Note title</h1>
			</div>
			{/* <input type="text" value="" placeholder="Title of your note" /> */}
			<div>
				<ReactQuill
					theme="snow"
					value={value}
					onChange={setValue}
					formats={formats}
					modules={modules}
					className={classes.editor}
					placeholder="Start typing here..."
				/>
			</div>
		</main>
	);
};

export default RichTextEditor;
