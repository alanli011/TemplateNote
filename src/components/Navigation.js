import React from 'react';
import PropTypes from 'prop-types';

import { Tab, Tabs, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		height: '100vh'
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`
	}
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function Navigation(props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Tabs orientation="vertical" className={classes.tabs}>
				<Tab>
					<Typography>Not sure...</Typography>
				</Tab>
			</Tabs>
		</div>
	);
}

export default Navigation;
