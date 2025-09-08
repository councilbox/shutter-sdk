import { ApolloClient, gql } from '@apollo/client';
import { handleError } from './errors';

const ADD_EVENT = gql`
	mutation addEvent($event: EventInfo!) {
		addEvent(event: $event) {
			id
			type
			roomNumber
			attendeeID
			date
			ip
			platform {
				osName
				osVersion
				browserName
				browserVersion
				userAgent
			}
			audioSource
			videoSource
			audioDevices {
				deviceId
				label
				kind
				groupId
			}
			videoDevices {
				deviceId
				label
				kind
				groupId
			}
			peerID
			displayName
			error
			reason
			content
			old
		}
	}
`;


export class Events {
	private gqlClient: ApolloClient;

	constructor(gqlClient: ApolloClient) {
		this.gqlClient = gqlClient;
	}

	async create(event) {
		const variables = {
			event
		};

		const response = await this.gqlClient.mutate<{ addEvent: any }>({
			mutation: ADD_EVENT,
			variables
		});

		handleError(response);

		return response.data!.addEvent;
	}
}
