import { ApolloClient, gql } from '@apollo/client';
import { handleError } from './errors';

const LIST = gql`
	query organizations ($filters: [Filter], $pagination: Pagination) {
        organizations(filters: $filters, pagination: $pagination) {
			list {
				id
				name
				logo
				created
				owner {
					id
					name
					surname
					email
					language
					created
				}
			}
			total
		}
	}
`;

const CREATE = gql`
	mutation createOrganization($organization: OrganizationInfo!) {
		createOrganization(organization: $organization) {
			id
			name
			logo
		}
	}
`;

const UPDATE = gql`
	mutation updateOrganization($organization: OrganizationUpdateInfo!) {
		updateOrganization(organization: $organization) {
			id
			name
			logo
		}
	}
`;

const DELETE = gql`
	mutation removeOrganization($id: String!) {
		removeOrganization(id: $id) {
			id
			name
			logo
		}
	}
`;


export class Organizations {
	private gqlClient: ApolloClient;

	constructor(gqlClient: ApolloClient) {
		this.gqlClient = gqlClient;
	}

	async list() {
		const variables = {};

		const response = await this.gqlClient.query<{ organizations: any }>({
			query: LIST,
			variables
		});

		handleError(response);

		return response.data!.organizations.list;
	}

	async create({ organization }) {
		const variables = { organization };

		const response = await this.gqlClient.mutate<{ createOrganization: any }>({
			mutation: CREATE,
			variables
		});

		handleError(response);

		return response.data!.createOrganization;
	}

	async update({ organization }) {
		const variables = { organization };

		const response = await this.gqlClient.mutate<{ updateOrganization: any }>({
			mutation: UPDATE,
			variables
		});

		handleError(response);

		return response.data!.updateOrganization;
	}

	async delete({ id }) {
		const variables = { id };

		const response = await this.gqlClient.mutate<{ removeOrganization: any }>({
			mutation: DELETE,
			variables
		});

		handleError(response);

		return response.data!.removeOrganization;
	}
}
