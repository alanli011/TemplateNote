import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getNoteBooks } from '../store/notebooks';
import { useAuth0 } from '../react-auth0-spa';
import { getUser } from '../store/authentication';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Container,
	Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	typeText: {
		color: 'white'
	},
	title: {
		padding: theme.spacing(3, 0)
	},
	hoverStyle: {
		'&:hover': {
			backgroundColor: '#8fbac7'
		}
	},
	linkStyle: {
		textDecoration: 'none',
		color: 'inherit',
		'&:hover': {
			textDecoration: 'underline'
		}
	}
}));

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover
		}
	}
}))(TableRow);

const Notebooks = (props) => {
	const { user } = useAuth0();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authentication.currentUser);
	const notebooks = useSelector((state) => state.notebooks.notebooks);

	useEffect(
		() => {
			dispatch(getUser(user));
		},
		// eslint-disable-next-line
		[ user ]
	);

	useEffect(
		() => {
			if (currentUser) {
				dispatch(getNoteBooks(currentUser.userId));
			}
		},
		// eslint-disable-next-line
		[ currentUser ]
	);

	const classes = useStyles();

	return (
		<Container>
			<Typography variant="h5" className={classes.title}>
				My Notebook List
			</Typography>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>NAME</StyledTableCell>
							<StyledTableCell>CREATED BY</StyledTableCell>
							<StyledTableCell align="center">ACTIONS</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{notebooks.data &&
							notebooks.data.map((notebook) => (
								<StyledTableRow key={notebook.id} className={classes.hoverStyle}>
									<StyledTableCell component="th" scope="row">
										<Link to={`/notebooks/${notebook.id}`} className={classes.linkStyle}>
											{notebook.name}
										</Link>
									</StyledTableCell>
									<StyledTableCell>{currentUser.nickname}</StyledTableCell>
									<StyledTableCell align="center">
										<EditIcon color="secondary" />
									</StyledTableCell>
								</StyledTableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default Notebooks;
