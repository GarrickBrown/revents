import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';

class NavBar extends Component {
	handleLogin = () => {
		this.props.openModal('LoginModal');
	};

	handleRegister = () => {
		this.props.openModal('RegisterModal');
	};

	handleLogout = () => {
		this.props.firebase.logout();
		this.props.history.push('/');
	};

	render() {
		const { auth } = this.props;
		const authenticated = auth.isLoaded && !auth.isEmpty;
		return (
			<div>
				<Menu inverted fixed="top">
					<Container>
						<Menu.Item as={Link} to="/" header>
							<img src="/assets/logo.png" alt="logo" />
							Re-vents
						</Menu.Item>
						<Menu.Item as={NavLink} to="/test" name="Test" />
						<Menu.Item as={NavLink} to="/events" name="Events" />
						{authenticated && <Menu.Item as={NavLink} to="/people" name="People" />}
						{authenticated && (
							<Menu.Item>
								<Button
									as={Link}
									to="/createEvent"
									floated="right"
									positive
									inverted
									content="Create Event"
								/>
							</Menu.Item>
						)}
						{authenticated ? (
							<SignedInMenu auth={auth} logout={this.handleLogout} />
						) : (
							<SignedOutMenu login={this.handleLogin} register={this.handleRegister} />
						)}
					</Container>
				</Menu>
			</div>
		);
	}
}

const mapState = state => ({
	auth: state.firebase.auth,
});

const actions = {
	openModal,
};

export default withRouter(
	withFirebase(
		connect(
			mapState,
			actions,
		)(NavBar),
	),
);
