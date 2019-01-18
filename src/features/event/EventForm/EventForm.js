/* global google */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { reduxForm, Field } from 'redux-form';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { createEvent, updateEvent, cancelToggle } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlacesInput from '../../../app/common/form/PlacesInput';

const category = [
	{ key: 'drinks', text: 'Drinks', value: 'drinks' },
	{ key: 'culture', text: 'Culture', value: 'culture' },
	{ key: 'film', text: 'Film', value: 'film' },
	{ key: 'food', text: 'Food', value: 'food' },
	{ key: 'music', text: 'Music', value: 'music' },
	{ key: 'travel', text: 'Travel', value: 'travel' },
];

const validate = combineValidators({
	title: isRequired({ message: 'The event title is required' }),
	category: isRequired({ message: 'Please select a category' }),
	description: composeValidators(
		isRequired({ message: 'Please provide a description' }),
		hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' }),
	)(),
	city: isRequired('City'),
	venue: isRequired('Venue'),
	date: isRequired('Date'),
});

class EventForm extends Component {
	state = {
		cityLatLng: {},
		venueLatLng: {},
		scriptLoaded: false,
	};

	componentDidMount = async () => {
		const { firestore, match } = this.props;
		await firestore.setListener(`events/${match.params.id}`);
	};

	componentWillUnmount = async () => {
		const { firestore, match } = this.props;
		await firestore.unsetListener(`events/${match.params.id}`);
	};

	handleCitySelect = async selectedCity => {
		const geocode = await geocodeByAddress(selectedCity);
		const latLng = await getLatLng(geocode[0]);

		this.setState({
			cityLatLng: latLng,
		});

		this.props.change('city', selectedCity);
	};

	handleVenueSelect = async selectedVenue => {
		const geocode = await geocodeByAddress(selectedVenue);
		const latLng = await getLatLng(geocode[0]);

		this.setState({
			venueLatLng: latLng,
		});

		this.props.change('venue', selectedVenue);
	};

	handleFormSubmit = values => {
		values.venueLatLng = this.state.venueLatLng;
		if (this.props.initialValues.id) {
			if (Object.keys(values.venueLatLng).length === 0) {
				values.venueLatLng = this.props.event.venueLatLng;
			}
			this.props.updateEvent(values);
			this.props.history.goBack();
		} else {
			this.props.createEvent(values);
			this.props.history.push('/events');
		}
	};

	handleCancel = () => {
		if (this.props.history.location.pathname === '/createEvent') {
			this.props.history.push('/events');
		} else {
			this.props.history.goBack();
		}
	};

	handleScriptLoad = () => this.setState({ scriptLoaded: true });

	render() {
		const { invalid, submitting, pristine, event, cancelToggle } = this.props;
		return (
			<Grid>
				<Script
					url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTpd2uOfb62neLfmzit7yrUf6vYFkbZb0&libraries=places"
					onLoad={this.handleScriptLoad}
				/>
				<Grid.Column width={10}>
					<Segment>
						<Header sub color="teal" content="Event Details" />
						<Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
							<Field
								name="title"
								type="text"
								component={TextInput}
								placeholder="Give your event a name"
							/>
							<Field
								name="category"
								type="text"
								component={SelectInput}
								placeholder="What is your event about"
								options={category}
								multiple={false}
							/>
							<Field
								name="description"
								type="text"
								rows={3}
								component={TextArea}
								placeholder="Tell us about your event"
							/>
							<Header sub color="teal" content="Event Location Details" />
							<Field
								name="city"
								type="text"
								component={PlacesInput}
								options={{ types: ['(cities)'] }}
								placeholder="Event city"
								onSelect={this.handleCitySelect}
							/>
							{this.state.scriptLoaded && (
								<Field
									name="venue"
									type="text"
									component={PlacesInput}
									options={{
										location: new google.maps.LatLng(this.state.cityLatLng),
										radius: 1000,
										types: ['establishment'],
									}}
									placeholder="Event venue"
									onSelect={this.handleVenueSelect}
								/>
							)}
							<Field
								name="date"
								type="text"
								component={DateInput}
								dateFormat="YYYY-MM-DD HH:mm"
								timeFormat="HH:mm"
								showTimeSelect
								placeholder="Date and time of event"
							/>
							<Button disabled={invalid || submitting || pristine} positive type="submit">
								Submit
							</Button>
							<Button type="button" onClick={this.handleCancel}>
								Cancel
							</Button>
							{Object.keys(event).length !== 0 && (
								<Button
									onClick={() => cancelToggle(!event.cancelled, event.id)}
									type="button"
									color={event.cancelled ? 'green' : 'red'}
									floated="right"
									content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
								/>
							)}
						</Form>
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapState = (state, ownProps) => {
	let event = {};
	let eventArray = [];
	if (state.firestore.ordered.events && ownProps.history.location.pathname !== '/createEvent') {
		eventArray = state.firestore.ordered.events.filter(
			event => event.id === ownProps.match.params.id,
		);
		event = eventArray[0];
	}
	return {
		initialValues: event,
		event,
	};
};

const actions = {
	createEvent,
	updateEvent,
	cancelToggle,
};

export default withFirestore(
	connect(
		mapState,
		actions,
	)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm)),
);
