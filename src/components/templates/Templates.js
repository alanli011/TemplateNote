import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTemplates, deleteTemplate } from '../../store/templates';
import CreateTemplateModal from './CreateTemplateModal';
import ReactQuill from 'react-quill';

import { Typography, Container, Grid, Card, CardContent, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// styles for Templates component
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '100vh',
		padding: 20
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	red: {
		color: 'red',
		float: 'right',
		'&:hover': {
			cursor: 'pointer'
		}
	},
	cardHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: theme.spacing(2)
	}
}));

const Templates = (props) => {
	const dispatch = useDispatch();
	const templates = useSelector((state) => state.templates);
	const currentUser = useSelector((state) => state.authentication.currentUser);
	const token = useSelector((state) => state.authentication.token);
	const [ open, setOpen ] = useState(false);

	// opens up a modal to create template
	const handleClickOpen = () => {
		setOpen(true);
	};

	// handles the cancel/close of the modal
	const handleClose = () => {
		setOpen(false);
	};

	// handles the deleting of the template. dispatches to the redux store to handle
	const handleDeleteTemplate = (id) => {
		if (token) {
			dispatch(deleteTemplate(id, token));
		}
	};

	// useEffect will grab all the templates
	useEffect(
		() => {
			if (currentUser) {
				dispatch(getTemplates(currentUser.userId));
			}
		},
		[ currentUser, dispatch ]
	);

	// useEffect to handle the browser tab title
	useEffect(() => {
		document.title = 'TemplateNote - Templates';
	}, []);

	// do not render the toolbar for the displayed template(pulled from react quill js)
	const modules = {
		toolbar: false
	};

	const classes = useStyles();
	return (
		<Container maxWidth="lg" className={classes.root} spacing={2}>
			<header className={classes.header}>
				<div>
					<Typography variant="h2">Templates</Typography>
				</div>
				<div>
					<Button variant="contained" color="primary" onClick={handleClickOpen}>
						Create Template
					</Button>
					<CreateTemplateModal open={open} handleClose={handleClose} />
				</div>
			</header>
			<Grid container spacing={2}>
				{templates &&
					templates.map((template) => (
						<Grid item xs={12} sm={12} md={6} lg={4} key={`template-${template.id}`}>
							<Card id={`template-${template.id}`}>
								<CardContent>
									<div className={classes.cardHeader}>
										<Typography variant="h5">{template.name}</Typography>
										<DeleteForeverIcon
											className={classes.red}
											onClick={() => handleDeleteTemplate(template.id)}
										/>
									</div>
									<ReactQuill value={template.content} modules={modules} readOnly={true} />
								</CardContent>
							</Card>
						</Grid>
					))}
			</Grid>
		</Container>
	);
};

export default Templates;
