import React from 'react';
import { Link } from 'react-router-dom';
import config from 'config';

function Home() {
	const siteMap = config.get().siteMap;

	return (
		<div className='site-container'>
			<div className='main-hero'>
				<div className='main-hero__call-to-action'>
					<h4>A platform for open and free epxression</h4>
					<p>
						Share your voice with the world now,
						<br />
						No censorship, no fear full anonymity.
					</p>
					<Link to={siteMap.wall.defaultPath} class='button'>Share Now</Link>
				</div>
				<div className='main-hero__instructions'>
					<h4>How It works</h4>
					<ul>
						<li>
							Select a <em>wall</em> to post under
							<br />
							A <em>wall</em> is a collection of posts, grouped by category
						</li>
						<li>
							Click post and share something with the world
						</li>
						<li>
							Find a post you like and <em>star</em> it to show your appreciation for it
						</li>
						<li>
							You can also comment on other posts
							<br />
							<em>But you can&#39;t comment on a comment</em>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Home;
