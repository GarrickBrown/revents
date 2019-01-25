import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export class Reroute extends Component {
	componentWillMount = () => {
		this.props.history.push('/error');
	};
	render() {
		return <div />;
	}
}

export default withRouter(Reroute);
