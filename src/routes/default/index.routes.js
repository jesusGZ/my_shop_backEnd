module.exports = (app) => {
	app.post('*', (response) => {
		response.status(404).json({ status: 'error', data: '', message: 'Ruta no definida' });
	});

	app.get('*', (response) => {
		response.status(404).json({ status: 'error', data: '', message: 'Ruta no definida' });
	});

	app.put('*', (response) => {
		response.status(404).json({ status: 'error', data: '', message: 'Ruta no definida' });
	});

	app.delete('*', (response) => {
		response.status(404).json({ status: 'error', data: '', message: 'Ruta no definida' });
	});
};
