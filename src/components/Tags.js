import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTags } from '../store/tags';

import { Typography, Container, Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '100vh'
	}
}));

const Tags = (props) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const tags = useSelector((state) => state.tags);
	console.log(tags);

	useEffect(
		() => {
			dispatch(getTags());
		},
		[ dispatch ]
	);

	return (
		<Container maxWidth="lg" className={classes.root}>
			<Typography variant="h2">Tags</Typography>
			<Grid container spacing={2}>
				{tags &&
					tags.map((tag) => (
						<Grid item xs={4} sm={4} md={4} lg={4} key={tag.id}>
							<Card>
								<CardContent>
									<Typography variant="h3">{tag.name}</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
			</Grid>
		</Container>
	);
};

export default Tags;
