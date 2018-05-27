import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: false };
	}

	componentDidCatch(error, info) {
		console.error('ERROR BOUNDARY CAUGHT AN ERROR - ERROR -> ', error, ' INFO ->', info); // eslint-disable-line no-console
		this.setState({ error: true });
	}

	render() {
		if (this.state.error === false) {
			return this.props.children;
		}

		return (
			<div className='site-container not-found'>
				<img src='/images/500.jpg' alt='Something went wrong on our end. Try again later please' />
				<div className='not-found__content'>
					<h3>Sorry - Something went wrong on our end - Try again later</h3>
				</div>
			</div>
		);
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired
};

export default ErrorBoundary;
