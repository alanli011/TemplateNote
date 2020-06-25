import React from 'react';
import SingleNoteBook from './SingleNotebook';

const Notes = (props) => {
	return (
		<React.Fragment>
			<div>
				<SingleNoteBook />
			</div>
			<h1>My notes</h1>
		</React.Fragment>
	);
};

export default Notes;
