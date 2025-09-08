import { ApolloClient, gql } from '@apollo/client';
import { handleError } from './errors';

const LIST = gql`
	query recordings($roomNumber: String!){
        recordings(roomNumber: $roomNumber){
			id
            name
			mixed
			mixProgress
			uploaded
			uploadProgress
			duration
			size
			hash
			hashType
			creationDate
			finishDate
			posterUrl
			downloadUrl
			streamingUrl
			audioFile
			extractedAudio
			extractAudioProgress
			uploadedAudio
			uploadAudioProgress
			audioDuration
			audioSize
			audioHash
			audioHashType
			downloadAudioUrl
			streamingAudioUrl
        }
    }
`;

const GET_IFRAME_URL = gql`
	query recordingsIframeUrl($roomNumber: String!) {
		recordingsIframeUrl(roomNumber: $roomNumber)
	}
`;


export class Recordings {
	private gqlClient: ApolloClient;

	constructor(gqlClient: ApolloClient) {
		this.gqlClient = gqlClient;
	}

	async list({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.query<{ recordings: any }>({
			query: LIST,
			variables
		});

		handleError(response);

		return response.data!.recordings;
	}

	async getIframeUrl({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.gqlClient.query<{ recordingsIframeUrl: any }>({
			query: GET_IFRAME_URL,
			variables
		});

		handleError(response);

		return response.data!.recordingsIframeUrl;
	}
}
