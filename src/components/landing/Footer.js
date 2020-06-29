import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	footer: {
		padding: theme.spacing(3, 2),
		backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
		color: 'black'
	}
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<footer className={classes.footer}>
				<Container maxWidth="sm">
					<Typography variant="body1">Welcome to TemplateNote</Typography>
					<Typography variant="body2" color="textSecondary">
						{'Copyright © '}
						{'TemplateNote '}
						{new Date().getFullYear()}
						{'.'}
					</Typography>
				</Container>
			</footer>
		</React.Fragment>
	);
};

export default Footer;
