export const handleError = response => {
	if (response.error) throw response.error;
	
	if (!response.data) {
		throw new Error('No data received from server');
	}
	
	return response.data;
};