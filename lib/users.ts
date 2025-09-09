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

	/**
	 * `shutter.users.me()`
	 *
	 * Example:
	 *
	 * ```ts
	 * try {
	 *   const me = await shutter.users.me();
	 *   console.log(me); // logs response data
	 * } catch (err) {
	 *   console.log(err); // logs any error
	 * }
	 * ```
	 *
	 * Promise Returns:
	 *
	 * ```json
	 * {
	 *   "id": "109bec0f8aaef2395f481059",
	 *   "name": "Example",
	 *   "surname": "test",
	 *   "email": "example@shutter.com",
	 *   "type": "ACCOUNT",
	 *   "organizations": [
	 *     {
	 *       "id": "109bec1d8aaef2395f48105c",
	 *       "name": "Test Org",
	 *       "logo": "<logo_url>",
	 *       "created": "1620831261329"
	 *     }
	 *   ],
	 *   "language": "en",
	 *   "state": "UNCONFIRMED",
	 *   "created": "1620831247972"
	 * }
	 * ```
	 */
	async me() {
		const variables = {};

		const response = await this.gqlClient.query<{ me: any }>({
			query: ME,
			variables
		});

		handleError(response);
		
		return response.data!.me;
	}

	/**
	 * `shutter.users.create({ user })`
	 *
	 * Example:
	 *
	 * ```ts
	 * try {
	 *   const createdUser = await shutter.users.create({
	 *     user: {
	 *       name: "test",
	 *       email: "test@shutter.com",
	 *     },
	 *   });
	 *   console.log(createdUser); // logs response data
	 * } catch (err) {
	 *   console.log(err); // logs any error
	 * }
	 * ```
	 *
	 * Promise Returns:
	 *
	 * ```json
	 * {
	 *   "id": "609ab5190ae391f4e90d10f1",
	 *   "name": "test",
	 *   "email": "test@shutter.com"
	 * }
	 * ```
	 */
	async create({ user }) {
		const variables = { user };

		const response = await this.gqlClient.mutate<{ createUser: any }>({
			mutation: CREATE,
			variables,
		});

		handleError(response);

		return response.data!.createUser;
	}

	/**
	 * `shutter.users.delete({ id })`
	 *
	 * Example:
	 *
	 * ```ts
	 * try {
	 *   const deletedUser = await shutter.users.delete({
	 *     id: "109e4d75ec5805340e6ccaf7",
	 *   });
	 *   console.log(deletedUser); // logs response data
	 * } catch (err) {
	 *   console.log(err); // logs any error
	 * }
	 * ```
	 *
	 * Promise Returns:
	 *
	 * ```json
	 * {
	 *   "id": "109e4d75ec5805340e6ccaf7",
	 *   "name": "Test",
	 *   "surname": "User",
	 *   "email": "test@shutter.com",
	 *   "type": "BASIC",
	 *   "language": "en",
	 *   "state": "UNCONFIRMED",
	 *   "created": "1620987253103",
	 *   "organizations": []
	 * }
	 * ```
	 */
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
