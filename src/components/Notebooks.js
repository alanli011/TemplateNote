import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getNoteBooks } from '../store/notebooks';
import { useAuth0 } from '../react-auth0-spa';
import { setUser, setToken } from '../store/authentication';
import { createNotebook } from '../store/notebooks';

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
	Typography,
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

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
	},
	headSection: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	headSectionRight: {
		display: 'flex',
		alignItems: 'center'
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
	const [ notebookName, setNotebookName ] = useState('');
	const [ open, setOpen ] = React.useState(false);

	const { user, getTokenSilently } = useAuth0();

	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.authentication.currentUser);
	const token = useSelector((state) => state.authentication.token);
	const notebooks = useSelector((state) => state.notebooks.notebooks);

	useEffect(() => {
		document.title = 'TemplateNote - Notebooks';
	}, []);

	useEffect(
		() => {
			dispatch(setUser(user));
			(async () => {
				const silentToken = await getTokenSilently();
				dispatch(setToken(silentToken));
			})();
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

	// the following functions handles the modal and submission to create a new notebook
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const nameInputChange = (e) => {
		setNotebookName(e.target.value);
	};

	const createNotebookHandler = (e) => {
		e.preventDefault();
		try {
			if (currentUser && token) {
				dispatch(createNotebook(currentUser.userId, notebookName, token));
			}
		} catch (error) {
			console.error(error);
		} finally {
			handleClose();
			window.location.reload();
		}
	};

	// instantiate the classes variable to be used with material ui classname
	const classes = useStyles();

	return (
		<Container>
			<div className={classes.headSection}>
				<div>
					<Typography variant="h5" className={classes.title}>
						My Notebook List
					</Typography>
				</div>
				<div className={classes.headSectionRight}>
					<Button onClick={handleClickOpen}>
						<NoteAddIcon color="primary" />
						<Typography color="secondary" variant="body1" className={classes.title}>
							New Notebook
						</Typography>
					</Button>
					<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
						<DialogTitle id="form-dialog-title">Create New Notebook</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Notebooks are useful for grouping notes around a common topic.
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Notebook Name"
								type="name"
								value={notebookName}
								onChange={nameInputChange}
								fullWidth
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button color="secondary" onClick={createNotebookHandler}>
								Create
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
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
