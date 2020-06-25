import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

import SingleNoteBook from './SingleNotebook';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	maxWidth: {
		width: '100%'
	}
}));

const Notes = (props) => {
	const [ value, setValue ] = useState('');
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
		<React.Fragment>
			<div>
				<SingleNoteBook />
			</div>
			<ReactQuill
				theme="snow"
				defaultValue={value}
				onChange={setValue}
				className={classes.maxWidth}
				modules={modules}
				formats={formats}
			/>
		</React.Fragment>
	);
};

Notes.propTypes = {
	id: PropTypes.string
};

export default Notes;
