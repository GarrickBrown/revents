import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

class NavBar extends Component {
	state = {
		auth: false,
	};

	handleSignIn = () => {
		this.setState({
			auth: true,
		});
	};

	handleSignOut = () => {
		this.setState({
			auth: false,
		});
		this.props.history.push('/');
	};

	render() {
		const { auth } = this.state;
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
						{auth && <Menu.Item as={NavLink} to="/people" name="People" />}
						{auth && (
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
						{auth ? (
							<SignedInMenu signOut={this.handleSignOut} />
						) : (
							<SignedOutMenu signIn={this.handleSignIn} />
						)}
					</Container>
				</Menu>
			</div>
		);
	}
}

export default withRouter(NavBar);
