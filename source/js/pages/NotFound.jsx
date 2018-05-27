import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<div className='site-container not-found'>
			<img src='/images/404.jpg' alt='The page you are looking for could not be fround' />
			<div className='not-found__content'>
				<h3> Is this the page you were looking for</h3>
				<Link to='/wall/main'>Wall</Link>
			</div>
		</div>
	);
}

export default NotFound;
