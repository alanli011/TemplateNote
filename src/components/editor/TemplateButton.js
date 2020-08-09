import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTemplates } from '../../store/templates';
import ReactQuill from 'react-quill';

import { Dialog, Button, DialogTitle, Typography, Card, Grid, CardContent, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	cardHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: theme.spacing(2)
	},
	action: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: theme.spacing(3)
	},
	cursor: {
		cursor: 'pointer'
	}
}));

const TemplateButton = (props) => {
	// destructure props that is threaded from the RichTextEditor component
	const { onClose, open, selectedTemplate } = props;
	const dispatch = useDispatch();
	const templates = useSelector((state) => state.templates);
	const currentUser = useSelector((state) => state.authentication.currentUser);

	// this useEffect handles dispatching of templates from the redux store
	useEffect(
		() => {
			if (currentUser) {
				dispatch(getTemplates(currentUser.userId));
			}
		},
		[ currentUser, dispatch ]
	);

	const handleClose = () => {
		onClose(selectedTemplate);
	};

	const handleSelectTemplate = (value) => {
		onClose(value);
	};

	const classes = useStyles();

	const modules = {
		toolbar: false
	};

	return (
		<div className={classes.root}>
			<Dialog fullScreen onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
				<DialogTitle id="simple-dialog-title">Choose A Template</DialogTitle>
				<Grid container spacing={2}>
					{templates &&
						templates.map((template) => (
							<Grid item xs={12} sm={12} md={6} lg={6} key={`template-${template.id}`}>
								<Card id={`template-${template.id}`}>
									<CardActionArea onClick={() => handleSelectTemplate(template.content)}>
										<CardContent>
											<div className={classes.cardHeader}>
												<Typography variant="h5">{template.name}</Typography>
											</div>
											<ReactQuill value={template.content} modules={modules} readOnly={true} />
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						))}
				</Grid>
				<div className={classes.action}>
					<Button autoFocus color="inherit" onClick={props.handleClose}>
						Cancel
					</Button>
				</div>
			</Dialog>
		</div>
	);
};

export default TemplateButton;
