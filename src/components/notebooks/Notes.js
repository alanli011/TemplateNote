import React from 'react';
import RichTextEditor from '../editor/RichTextEditor';
import SingleNoteBook from './SingleNotebook';

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		flexGrow: 1
// 	}
// }));

const Notes = (props) => {
	// const classes = useStyles();

	return (
		<React.Fragment>
			<div>
				<SingleNoteBook />
			</div>
			<RichTextEditor />
		</React.Fragment>
	);
};

export default Notes;
