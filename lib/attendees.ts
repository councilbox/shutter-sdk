import { ApolloClient, gql } from '@apollo/client';
import { handleError } from './errors';

const LIST = gql`
	query attendees($roomNumber: String!){
		attendees(roomNumber: $roomNumber) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const GET = gql`
	query attendee($roomNumber: String!, $attendeeID: String!){
		attendee(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const GET_URL = gql`
	query attendeeURL($roomNumber: String!, $attendeeID: String!){
		attendeeURL(roomNumber: $roomNumber, attendeeID: $attendeeID)
	}
`;

const CREATE = gql`
	mutation addAttendee($roomNumber: String!, $attendee: AttendeeInfo!) {
		addAttendee(roomNumber: $roomNumber, attendee: $attendee) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const UPDATE = gql`
	mutation updateAttendee($roomNumber: String!, $attendee: UpdateAttendeeInfo!) {
		updateAttendee(roomNumber: $roomNumber, attendee: $attendee) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const DELETE = gql`
	mutation deleteAttendee($roomNumber: String!, $attendeeID: String!) {
		deleteAttendee(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const MUTE = gql`
	mutation muteAttendee($roomNumber: String!, $attendeeID: String!, $type: String!) {
		muteAttendee(roomNumber: $roomNumber, attendeeID: $attendeeID, type: $type) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const RAISE_HAND = gql`
	mutation raiseHand($roomNumber: String!, $attendeeID: String!) {
		raiseHand(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const LOWER_HAND = gql`
	mutation lowerHand($roomNumber: String!, $attendeeID: String!) {
		lowerHand(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const GRANT_WORD = gql`
	mutation grantWord($roomNumber: String!, $attendeeID: String!) {
		grantWord(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const DENY_WORD = gql`
	mutation denyWord($roomNumber: String!, $attendeeID: String!) {
		denyWord(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			externalID
			role
			canShareScreen
			canBroadcast
			canChat
			canMuteAudio
			canMuteVideo
			canMuteAudioAll
			canMuteVideoAll
			canShareFiles
			canSeeAttendeesList
			canRaiseHand
			raisedHand
			broadcasting
			mutedMic
			mutedCam
			displayName
			email
			language
			online
			data
			toolbarShortcuts {
				shareScreen
				captureFrame
			}
			requiredMediaPermits {
				video
				audio
			}
		}
	}
`;

const START_TRACK = gql`
	mutation startTrack($roomNumber: String!, $attendeeID: String!, $type: String!) {
		startTrack(roomNumber: $roomNumber, attendeeID: $attendeeID, type: $type) {
			id
			externalID
			role
			broadcasting
			mutedMic
			mutedCam
		}
	}
`;

const STOP_TRACK = gql`
	mutation stopTrack($roomNumber: String!, $attendeeID: String!, $type: String!) {
		stopTrack(roomNumber: $roomNumber, attendeeID: $attendeeID, type: $type) {
			id
			externalID
			role
			broadcasting
			mutedMic
			mutedCam
		}
	}
`;


export class Attendees {
	private gqlClient: ApolloClient;

	constructor(gqlClient: ApolloClient) {
		this.gqlClient = gqlClient;
	}

	async list({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.query<{ attendees: any }>({
			query: LIST,
			variables
		});

		handleError(response);

		return response.data!.attendees;
	}

	async get({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.gqlClient.query<{ attendee: any }>({
			query: GET,
			variables
		});

		handleError(response);

		return response.data!.attendee;
	}

	async getURL({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.gqlClient.query<{ attendeeURL: any }>({
			query: GET_URL,
			variables
		});

		handleError(response);

		return response.data!.attendeeURL;
	}

	async create({ roomNumber, attendee }) {
		const variables = { roomNumber, attendee };

		const response = await this.gqlClient.mutate<{ addAttendee: any }>({
			mutation: CREATE,
			variables
		});

		handleError(response);

		return response.data!.addAttendee;
	}

	async update({ roomNumber, attendee }) {
		const variables = { roomNumber, attendee };

		const response = await this.gqlClient.mutate<{ updateAttendee: any }>({
			mutation: UPDATE,
			variables
		});

		handleError(response);

		return response.data!.updateAttendee;
	}

	async delete({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.gqlClient.mutate<{ deleteAttendee: any }>({
			mutation: DELETE,
			variables
		});

		handleError(response);

		return response.data!.deleteAttendee;
	}

	async mute({ roomNumber, id, type }) {
		const variables = { roomNumber, attendeeID: id, type };

		const response = await this.gqlClient.mutate<{ muteAttendee: any }>({
			mutation: MUTE,
			variables
		});

		handleError(response);

		return response.data!.muteAttendee;
	}

	async raiseHand({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.gqlClient.mutate<{ raiseHand: any }>({
			mutation: RAISE_HAND,
			variables
		});

		handleError(response);

		return response.data!.raiseHand;
	}

	async lowerHand({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.gqlClient.mutate<{ lowerHand: any }>({
			mutation: LOWER_HAND,
			variables
		});

		handleError(response);

		return response.data!.lowerHand;
	}

	async grantWord({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.gqlClient.mutate<{ grantWord: any }>({
			mutation: GRANT_WORD,
			variables
		});

		handleError(response);

		return response.data!.grantWord;
	}

	async denyWord({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.gqlClient.mutate<{ denyWord: any }>({
			mutation: DENY_WORD,
			variables
		});

		handleError(response);

		return response.data!.denyWord;
	}

	async startTrack({ roomNumber, id, type }) {
		const variables = { roomNumber, attendeeID: id, type };

		const response = await this.gqlClient.mutate<{ startTrack: any }>({
			mutation: START_TRACK,
			variables
		});

		handleError(response);

		return response.data!.startTrack;
	}

	async stopTrack({ roomNumber, id, type }) {
		const variables = { roomNumber, attendeeID: id, type };

		const response = await this.gqlClient.mutate<{ stopTrack: any }>({
			mutation: STOP_TRACK,
			variables
		});

		handleError(response);

		return response.data!.stopTrack;
	}
}
