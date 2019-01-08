import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import cuid from 'cuid';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import moment from 'moment';
import { createEvent, updateEvent } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';

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
	handleFormSubmit = values => {
		values.date = moment(values.date).format();
		if (this.props.initialValues.id) {
			this.props.updateEvent(values);
			this.props.history.goBack();
		} else {
			const newEvent = {
				...values,
				id: cuid(),
				hostPhotoURL: '/assets/user.png',
				hostedBy: 'User Name',
			};
			this.props.createEvent(newEvent);
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

	render() {
		const { invalid, submitting, pristine } = this.props;
		return (
			<Grid>
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
							<Field name="city" type="text" component={TextInput} placeholder="Event city" />
							<Field name="venue" type="text" component={TextInput} placeholder="Event venue" />
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
						</Form>
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapState = (state, ownProps) => {
	const eventId = ownProps.match.params.id;
	let event = {};

	if (eventId && state.events.length > 0) {
		event = state.events.filter(event => event.id === eventId)[0];
	}

	return {
		initialValues: event,
	};
};

const actions = {
	createEvent,
	updateEvent,
};

export default connect(
	mapState,
	actions,
)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm));
