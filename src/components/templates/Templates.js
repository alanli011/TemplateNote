import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTemplates } from '../../store/templates';
import CreateTemplateModal from './CreateTemplateModal';
import ReactQuill from 'react-quill';
import { deleteTemplate } from '../../store/templates';

import { Typography, Container, Grid, Card, CardContent, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDeleteTemplate = (id) => {
		if (token) {
			dispatch(deleteTemplate(id, token));
		}
	};

	useEffect(
		() => {
			if (currentUser) {
				dispatch(getTemplates(currentUser.userId));
			}
		},
		[ currentUser, dispatch ]
	);

	useEffect(() => {
		document.title = 'TemplateNote - Templates';
	}, []);

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
