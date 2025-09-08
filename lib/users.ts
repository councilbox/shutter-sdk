import { ApolloClient, gql } from '@apollo/client';
import { handleError } from './errors';

const ME = gql`
	query me {
		me {
			id
			name
			surname
			email
			type
			organizations {
				id
				name
				logo
				created
			}
			language
			state
			created
		}
	}
`;

const CREATE = gql`
	mutation createUser($user: UserInfo!) {
		createUser(user: $user) {
			id
			name
			surname
			email
			type
			language
			state
			created
			organizations{
				id
				name
				logo
				created
			}
		}
	}
`;

const DELETE = gql`
	mutation removeUser($id: String!) {
		removeUser(id: $id) {
			id
			name
			surname
			email
			type
			language
			state
			created
			organizations{
				id
				name
				logo
				created
			}
		}
	}
`;


export class Users {
	private gqlClient: ApolloClient;

	constructor(gqlClient: ApolloClient) {
		this.gqlClient = gqlClient;
	}

	async me() {
		const variables = {};

		const response = await this.gqlClient.query<{ me: any }>({
			query: ME,
			variables
		});

		handleError(response);
		
		return response.data!.me;
	}

	async create({ user }) {
		const variables = { user };

		const response = await this.gqlClient.mutate<{ createUser: any }>({
			mutation: CREATE,
			variables,
		});

		handleError(response);

		return response.data!.createUser;
	}

	async delete({ id }) {
		const variables = { id };

		const response = await this.gqlClient.mutate<{ removeUser: any }>({
			mutation: DELETE,
			variables,
		});

		handleError(response);

		return response.data!.removeUser;
	}
}
