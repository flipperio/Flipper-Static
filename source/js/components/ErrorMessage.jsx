import React from 'react';
import PropTypes from 'prop-types';

function ErrorMessage(props) {
	return (
		<p className='error-message'>{props.children}</p>
	);
}

ErrorMessage.propTypes = {
	children: PropTypes.node.isRequired
};

export default ErrorMessage;
