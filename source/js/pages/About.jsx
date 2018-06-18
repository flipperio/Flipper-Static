import React from 'react';


function About() {
	return (
		<div className='site-container'>
			<div className='swig-swag-container'>
				<div className='swig-swag__row'>
					<div className='swig-swag__text'>
						<h4>Full Anonymity</h4>
						<p>
							Share your posts and ideas without fear. All interactions on Flipper are fully anonymous. No personally identifiable data is collected or shared with others.
						</p>
					</div>
					<div className='swig-swag__img' style={{ backgroundImage: 'url(./images/anonymity.svg)' }} />
				</div>
				<div className='swig-swag__row'>
					<div className='swig-swag__text'>
						<h4>No Censorship</h4>
						<p>
							Express yourself without limit. Flipper will never discriminate, based on race or sex, religion or disability, political beliefs or ideology, moral or immoral character. Wheather you&#39;re a radical or a troll, you&#39;re welcome here..<br /><br />
							<small><em>Spam, pornography, gore, and content strongly connected with or directly supporting terrorist organizations will not be permitted.</em></small>

						</p>
					</div>
					<div className='swig-swag__img' style={{ backgroundImage: 'url(./images/expression-hands.svg)' }} />
				</div>
			</div>
		</div>
	);
}

export default About;
