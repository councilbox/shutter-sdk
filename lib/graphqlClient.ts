import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

export default function createApolloClient({ email, password, uri }): ApolloClient {
	const authLink = new SetContextLink((prevContext, _operation) => {
		const basic = Buffer.from(`${email}:${password}`).toString('base64');

		return {
			headers: {
				...prevContext?.headers,
				authorization: `Basic ${basic}`,
			}
		};
	});

	const httpLink = new HttpLink({ uri, fetch });

	const link = ApolloLink.from([authLink, httpLink]);

	return new ApolloClient({
		link,
		cache: new InMemoryCache(),
	});
}