import PropTypes from 'prop-types';

const postPropType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	timestamp: PropTypes.string.isRequired,
	comments: PropTypes.number.isRequired,
	stars: PropTypes.number.isRequired,
	parent: PropTypes.string
});

export default postPropType;
