import React, { useState, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TemplateEditor from './TemplateEditor';
import { createTemplate } from '../../store/templates';

import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Slide, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	}
}));

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const CreateTemplateModal = (props) => {
	const [ content, setContent ] = useState('');
	const [ title, setTitle ] = useState('');
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authentication.currentUser);
	const token = useSelector((state) => state.authentication.token);

	const handleCreateTemplate = () => {
		if (currentUser && token) {
			dispatch(createTemplate(title, content, currentUser.userId, token));
			props.handleClose();
		}
	};

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleQuillChange = (content, delta, source, editor) => {
		setContent(content);
	};
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
				<TemplateEditor
					title={title}
					content={content}
					handleTitleChange={handleTitleChange}
					handleQuillChange={handleQuillChange}
				/>
				<Button autoFocus variant="contained" color="primary" onClick={handleCreateTemplate}>
					save
				</Button>
				<Button autoFocus color="inherit" onClick={props.handleClose}>
					Cancel
				</Button>
			</Dialog>
		</div>
	);
};

export default CreateTemplateModal;
