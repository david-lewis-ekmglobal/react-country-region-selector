import pkg from './package.json';

export default (options = {}) => {
	const convertFormat = (countries) => {
		return countries.map((countryData) => [
			countryData.countryName,
			countryData.countryShortCode,
			countryData.regions.map((regionData) => `${regionData.name}~${regionData.shortCode}~${regionData.type}`).join('|')
		]);
	};

	return {
		name: 'ParseCountryList',
		transform: (source, id) => {
			if ((!pkg.os.includes('win32') && !(/country-region-data\/data\.json$/.test(id))) ||
				(pkg.os.includes('win32') && !(/country-region-data\\data\.json$/.test(id)))) {
				return;
			}

			let json = JSON.parse(source);

			// filter out those countries that the user wants
			if (options.countries.length > 0) {
				json = json.filter((countryData) => options.countries.indexOf(countryData.countryShortCode) !== -1);
			}

			// and return the converted data structure for bundling with the script
			return {
				code: JSON.stringify(convertFormat(json)),
				map: { mappings: '' }
			};
		}
	};
};
