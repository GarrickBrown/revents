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
			<div style={{ textAlign: 'center' }}>
				Icons made by{' '}
				<a href="http://www.freepik.com" title="Freepik">
					Freepik
				</a>{' '}
				from{' '}
				<a href="https://www.flaticon.com/" title="Flaticon">
					www.flaticon.com
				</a>{' '}
				is licensed by{' '}
				<a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">
					CC 3.0 BY
				</a>
			</div>
		</div>
	);
};

export default HomePage;
