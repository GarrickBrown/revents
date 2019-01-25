import React from 'react';

const HomePage = ({ history }) => {
	return (
		<div>
			<div className="ui inverted vertical masthead center aligned segment">
				<div className="ui text container">
					<h1 className="ui inverted stackable header">
						<div className="content">Error: 404</div>
					</h1>
					<h2>Oops, the page you're looking for is not found</h2>
					<div className="ui huge white inverted button" onClick={() => history.push('/events')}>
						Back Home
						<i className="right arrow icon" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
