import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import GoogleMapReact from 'google-map-react';
import { incrementCounter, decrementCounter } from './testActions';

const Marker = () => <Icon name="marker" size="big" color="red" />;

class TestComponent extends Component {
	static defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33,
		},
		zoom: 11,
	};

	state = {
		address: '',
		scriptLoaded: false,
	};

	handleFormSubmit = event => {
		event.preventDefault();

		geocodeByAddress(this.state.address)
			.then(results => getLatLng(results[0]))
			.then(latLng => console.log('Success', latLng))
			.catch(error => console.error('Error', error));
	};

	onChange = address => this.setState({ address });

	handleScriptLoad = () => this.setState({ scriptLoaded: true });

	render() {
		const inputProps = {
			value: this.state.address,
			onChange: this.onChange,
		};
		const { data, incrementCounter, decrementCounter } = this.props;
		return (
			<div>
				<Script
					url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTpd2uOfb62neLfmzit7yrUf6vYFkbZb0&libraries=places"
					onLoad={this.handleScriptLoad}
				/>
				<h1>Test Component</h1>
				<h3>The answer is: {data}</h3>
				<Button onClick={incrementCounter} color="green" content="Increment" />
				<Button onClick={decrementCounter} color="red" content="Decrement" />
				<br />
				<br />
				<form onSubmit={this.handleFormSubmit}>
					{this.state.scriptLoaded && <PlacesAutocomplete inputProps={inputProps} />}
					<button type="submit">Submit</button>
				</form>
				<br />
				<br />
				<div style={{ height: '300px', width: '100%' }}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: 'AIzaSyCTpd2uOfb62neLfmzit7yrUf6vYFkbZb0' }}
						defaultCenter={this.props.center}
						defaultZoom={this.props.zoom}
					>
						<Marker lat={59.955413} lng={30.337844} text="My Marker" />
					</GoogleMapReact>
				</div>
			</div>
		);
	}
}

const mapState = state => ({
	data: state.test.data,
});

const actions = {
	incrementCounter,
	decrementCounter,
};

export default connect(
	mapState,
	actions,
)(TestComponent);
