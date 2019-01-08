import { createReducer } from '../../app/common/util/reducerUtil';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './eventConstants';

const initialState = [
	{
		id: '1',
		title: 'Trip to Tower of London',
		date: '2019-01-25T18:00:00+08:00',
		category: 'culture',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
		city: 'London, UK',
		venue: "Tower of London, St Katharine's & Wapping, London",
		hostedBy: 'Bob',
		hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
		attendees: [
			{
				id: 'a',
				name: 'Bob',
				photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
			},
			{
				id: 'b',
				name: 'Tom',
				photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
			},
		],
	},
	{
		id: '2',
		title: 'Trip to Punch and Judy Pub',
		date: '2019-01-25T18:00:00+08:00',
		category: 'drinks',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
		city: 'London, UK',
		venue: 'Punch & Judy, Henrietta Street, London, UK',
		hostedBy: 'Tom',
		hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
		attendees: [
			{
				id: 'b',
				name: 'Tom',
				photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
			},
			{
				id: 'a',
				name: 'Bob',
				photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
			},
		],
	},
];

export const createEvent = (state, payload) => {
	return [Object.assign({}, payload.event), ...state];
};

export const updateEvent = (state, payload) => {
	return state.map(event => {
		if (event.id === payload.event.id) {
			return payload.event;
		} else {
			return event;
		}
	});
	/* Perform operation this way if updated event to move to the top
    [Object.assign({}, payload.event),
		...state.filter(event => event.id !== payload.event.id),];
 */
};

export const deleteEvent = (state, payload) => {
	return state.filter(event => event.id !== payload.eventId);
};

export default createReducer(initialState, {
	[CREATE_EVENT]: createEvent,
	[UPDATE_EVENT]: updateEvent,
	[DELETE_EVENT]: deleteEvent,
});
