import { ApolloClient } from '@apollo/client';

import { version } from '../package.json';

import { Users } from './users';
import { Organizations } from './organizations';
import { Rooms } from './rooms';
import { Attendees } from './attendees';
import { Events } from './events';
import { Recordings } from './recordings';
import { Frames } from './frames';
import GqlClient from './graphqlClient';

export default class Client {
	public version: string = version;
	public users: Users;
	public organizations: Organizations;
	public rooms: Rooms;
	public attendees: Attendees;
	public events: Events;
	public recordings: Recordings;
	public frames: Frames;

	constructor({ email, password, uri }) {
		if (!email) {
			throw new Error('Parameter "email" is required');
		}

		if (!password) {
			throw new Error('Parameter "password" is required');
		}

		if (!uri) {
			throw new Error('Parameter "uri" is required');
		}

		const gqlClient: ApolloClient = GqlClient({ email, password, uri });

		this.users = new Users(gqlClient);
		this.organizations = new Organizations(gqlClient);
		this.rooms = new Rooms(gqlClient);
		this.attendees = new Attendees(gqlClient);
		this.events = new Events(gqlClient);
		this.recordings = new Recordings(gqlClient);
		this.frames = new Frames(gqlClient);
	}
}
