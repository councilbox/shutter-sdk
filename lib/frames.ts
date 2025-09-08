import { ApolloClient, gql } from '@apollo/client';
import { handleError } from './errors';

const GET = gql`
	query frame($roomNumber: String!, $frameID: String) {
		frame(roomNumber: $roomNumber, frameID: $frameID) {
			id
			status
			date
			roomNumber
			attendeeID
			hash
			hashType
			url
		}
	}
`;

const LIST = gql`
	query frames($roomNumber: String!, $attendeeID: String) {
		frames(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			status
			date
			roomNumber
			attendeeID
			hash
			hashType
			url
		}
	}
`;

const CAPTURE_ROOM = gql`
	mutation captureRoomFrame($roomNumber: String!) {
		captureRoomFrame(roomNumber: $roomNumber) {
			id
			status
			date
			roomNumber
			attendeeID
			hash
			hashType
		}
	}
`;

const CAPTURE_ATTENDEE = gql`
	mutation captureAttendeeFrame($roomNumber: String!, $attendeeID: String!) {
		captureAttendeeFrame(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			status
			date
			roomNumber
			attendeeID
			hash
			hashType
		}
	}
`;


export class Frames {
	private gqlClient: ApolloClient;

	constructor(gqlClient: ApolloClient) {
		this.gqlClient = gqlClient;
	}

	async get({ roomNumber, id }) {
		const variables = { roomNumber, frameID: id };

		const response = await this.gqlClient.query<{ frames: any }>({
			query: GET,
			variables
		});

		handleError(response);

		return response.data!.frames;
	}

	async list({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.query<{ frames: any }>({
			query: LIST,
			variables
		});

		handleError(response);

		return response.data!.frames;
	}

	async captureRoom({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.mutate<{ captureRoomFrame: any }>({
			mutation: CAPTURE_ROOM,
			variables
		});

		handleError(response);

		return response.data!.captureRoomFrame;
	}

	async captureAttendee({ roomNumber, attendeeID }) {
		const variables = { roomNumber, attendeeID };

		const response = await this.gqlClient.mutate<{ captureAttendeeFrame: any }>({
			mutation: CAPTURE_ATTENDEE,
			variables
		});

		handleError(response);

		return response.data!.captureAttendeeFrame;
	}
}
