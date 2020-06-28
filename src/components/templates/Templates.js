import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTemplates } from '../../store/templates';
import CreateTemplateModal from './CreateTemplateModal';

import { Typography, Container, Grid, Card, CardContent, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
	}
}));

const Templates = (props) => {
	const dispatch = useDispatch();
	const templates = useSelector((state) => state.templates);
	const currentUser = useSelector((state) => state.authentication.currentUser);
	const [ open, setOpen ] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(
		() => {
			if (currentUser) {
				dispatch(getTemplates(currentUser.userId));
			}
		},
		[ currentUser, dispatch ]
	);

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
						<Grid item xs={4} sm={4} md={4} lg={4} key={`template-${template.id}`}>
							<Card>
								<CardContent>
									<Typography variant="h5">{template.name}</Typography>
									<Typography variant="body1">{template.content}</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
			</Grid>
		</Container>
	);
};

export default Templates;
