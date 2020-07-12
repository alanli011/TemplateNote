import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTemplates } from '../../store/templates';

import { Dialog, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core';
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
	const { onClose, open, selectedTemplate } = props;
	const dispatch = useDispatch();
	const templates = useSelector((state) => state.templates);
	const currentUser = useSelector((state) => state.authentication.currentUser);

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

	return (
		<div className={classes.root}>
			<Dialog fullScreen onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
				<DialogTitle id="simple-dialog-title">Choose A Template</DialogTitle>
				<List>
					{templates &&
						templates.map((template) => (
							<ListItem
								button
								onClick={() => handleSelectTemplate(template.content)}
								key={`template-${template.id}`}
							>
								<ListItemText>{template.name}</ListItemText>
							</ListItem>
						))}
				</List>
			</Dialog>
		</div>
	);
};

export default TemplateButton;
