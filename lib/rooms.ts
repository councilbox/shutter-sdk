import { ApolloClient, gql } from '@apollo/client';
import { handleError } from './errors';

const LIST = gql`
	query rooms($type: RoomTypes, $security: Security, $state: RoomStates, $filters: [Filter], $pagination: Pagination){
        rooms(type: $type, security: $security, state: $state, filters: $filters, pagination: $pagination) {
			list {
				roomNumber
				userID
				organizationID
				type
				created
				started
				ended
				displayName
				externalID
				agenda
				presenterID
				massive
				massiveStreaming
				urlExternalLiveStreaming
				canExternalLiveStreaming
				autoExternalLiveStreaming
				externalLiveStreaming
				locked
				enabledWaitingRoom
				webhook
				data
				attendees{
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
				url
				canRecord
				autoRecord
				recording
				state
				deletedAt
				view
				theme
				maxAttendees
				canScreenshot
				audioExtractFile
			}
			total
		}
	}
`;

const GET = gql`
	query room($roomNumber: String!){
		room(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			created
			started
			ended
			displayName
			externalID
			agenda
			presenterID
			massive
			massiveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			locked
			enabledWaitingRoom
			webhook
			data
			attendees{
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
			url
			canRecord
			autoRecord
			recording
			state
			deletedAt
			view
			theme
			maxAttendees
			canScreenshot
			audioExtractFile
		}
	}
`;

const CREATE = gql`
	mutation createRoom($room: RoomInfo!, $organizationID: String!) {
		createRoom(room: $room, organizationID: $organizationID) {
			userID
			organizationID
			type
			created
			started
			ended
			displayName
			externalID
			agenda
			presenterID
			massive
			massiveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			locked
			enabledWaitingRoom
			webhook
			data
			attendees{
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
			url
			canRecord
			autoRecord
			recording
			state
			roomNumber
			view
			theme
			maxAttendees
			canScreenshot
			audioExtractFile
		}
	}
`;

const UPDATE = gql`
	mutation updateRoom($room: UpdateRoomInfo!) {
		updateRoom(room: $room) {
			userID
			organizationID
			type
			created
			started
			ended
			displayName
			externalID
			agenda
			presenterID
			massive
			massiveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			locked
			enabledWaitingRoom
			webhook
			data
			attendees{
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
			url
			canRecord
			autoRecord
			recording
			state
			roomNumber
			view
			theme
			maxAttendees
			canScreenshot
			audioExtractFile
		}
	}
`;

const DELETE = gql`
	mutation deleteRoom($roomNumber: String!) {
		deleteRoom(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			canRecord
			autoRecord
			recording
			deletedAt
		}
	}
`;

const START = gql`
	mutation startRoom($roomNumber: String!) {
		startRoom(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			massive
			massiveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			canRecord
			autoRecord
			recording
			state
			canScreenshot
			audioExtractFile
		}
	}
`;

const CLOSE = gql`
	mutation closeRoom($roomNumber: String!) {
		closeRoom(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			massive
			massiveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			canRecord
			autoRecord
			recording
			state
		}
	}
`;

const START_RECORDING = gql`
	mutation startRecording($roomNumber: String!) {
		startRecording(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			massive
			massiveStreaming
			canRecord
			autoRecord
			recording
			audioExtractFile
		}
	}
`;

const STOP_RECORDING = gql`
	mutation stopRecording($roomNumber: String!) {
		stopRecording(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			massive
			massiveStreaming
			canRecord
			autoRecord
			recording
		}
	}
`;

const START_MASSIVE_STREAMING = gql`
	mutation startMassiveStreaming($roomNumber: String!) {
		startMassiveStreaming(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			massive
			massiveStreaming
			canRecord
			autoRecord
			recording
		}
	}
`;

const STOP_MASSIVE_STREAMING = gql`
	mutation stopMassiveStreaming($roomNumber: String!) {
		stopMassiveStreaming(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			massive
			massiveStreaming
			canRecord
			autoRecord
			recording
		}
	}
`;

const START_EXTERNAL_STREAMING = gql`
	mutation startExternalLiveStreaming($roomNumber: String!) {
		startExternalLiveStreaming(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			urlExternalLiveStreaming
			canExternalLiveStreaming
			autoExternalLiveStreaming
			externalLiveStreaming
		}
	}
`;

const STOP_EXTERNAL_STREAMING = gql`
	mutation stopExternalLiveStreaming($roomNumber: String!) {
		stopExternalLiveStreaming(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			urlExternalLiveStreaming
			canExternalLiveStreaming
			autoExternalLiveStreaming
			externalLiveStreaming
		}
	}
`;

const ATTENDEES_URLS = gql`
	query attendeesURLs($roomNumber: String!){
		attendeesURLs(roomNumber: $roomNumber) {
			attendee{
				id
				role
				canShareScreen
				canBroadcast
				broadcasting
				canChat
				canMuteAudio
				canMuteVideo
				canMuteAudioAll
				canMuteVideoAll
				canShareFiles
				canSeeAttendeesList
				canRaiseHand
				mutedMic
				mutedCam
				displayName
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
			url
		}
	}
`;

const UPDATE_STATUS = gql`
	mutation updateRoomStatus($roomNumber: String!, $type: String!, $status: String!) {
		updateRoomStatus(roomNumber: $roomNumber, type: $type, status: $status) {
			userID
			organizationID
			type
			displayName
			status
		}
	}
`;


export class Rooms {
	private gqlClient: ApolloClient;

	constructor(gqlClient: ApolloClient) {
		this.gqlClient = gqlClient;
	}

	async list() {
		const variables = {};

		const response = await this.gqlClient.query<{ rooms: any }>({
			query: LIST,
			variables
		});

		handleError(response);

		return response.data!.rooms.list;
	}

	async get({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.query<{ room: any }>({
			query: GET,
			variables
		});

		handleError(response);

		return response.data!.room;
	}

	async create({ room, organizationID }) {
		const variables = { room, organizationID };

		const response = await this.gqlClient.mutate<{ createRoom: any }>({
			mutation: CREATE,
			variables
		});

		handleError(response);

		return response.data!.createRoom;
	}

	async update({ room }) {
		const variables = { room };

		const response = await this.gqlClient.mutate<{ updateRoom: any }>({
			mutation: UPDATE,
			variables
		});

		handleError(response);

		return response.data!.updateRoom;
	}

	async delete({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.mutate<{ deleteRoom: any }>({
			mutation: DELETE,
			variables
		});

		handleError(response);

		return response.data!.deleteRoom;
	}

	async start({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.mutate<{ startRoom: any }>({
			mutation: START,
			variables
		});

		handleError(response);

		return response.data!.startRoom;
	}

	async close({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.mutate<{ closeRoom: any }>({
			mutation: CLOSE,
			variables
		});

		handleError(response);

		return response.data!.closeRoom;
	}

	async startRecording({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.mutate<{ startRecording: any }>({
			mutation: START_RECORDING,
			variables
		});

		handleError(response);

		return response.data!.startRecording;
	}

	async stopRecording({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.mutate<{ stopRecording: any }>({
			mutation: STOP_RECORDING,
			variables
		});

		handleError(response);

		return response.data!.stopRecording;
	}

	async startMassiveStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.mutate<{ startLiveStreaming: any }>({
			mutation: START_MASSIVE_STREAMING,
			variables
		});

		handleError(response);

		return response.data!.startLiveStreaming;
	}

	async stopMassiveStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.mutate<{ stopLiveStreaming: any }>({
			mutation: STOP_MASSIVE_STREAMING,
			variables
		});

		handleError(response);

		return response.data!.stopLiveStreaming;
	}

	async startExternalStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.mutate<{ startExternalLiveStreaming: any }>({
			mutation: START_EXTERNAL_STREAMING,
			variables
		});

		handleError(response);

		return response.data!.startExternalLiveStreaming;
	}

	async stopExternalStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.mutate<{ stopExternalLiveStreaming: any }>({
			mutation: STOP_EXTERNAL_STREAMING,
			variables
		});

		handleError(response);

		return response.data!.stopExternalLiveStreaming;
	}

	async attendeesUrls({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.query<{ attendeesURLs: any }>({
			query: ATTENDEES_URLS,
			variables
		});

		handleError(response);

		return response.data!.attendeesURLs;
	}

	async updateStatus({ roomNumber, type, status }) {
		const variables = { roomNumber, type, status };

		const response = await this.gqlClient.mutate<{ updateRoomStatus: any }>({
			mutation: UPDATE_STATUS,
			variables
		});

		handleError(response);

		return response.data!.updateRoomStatus;
	}
}
