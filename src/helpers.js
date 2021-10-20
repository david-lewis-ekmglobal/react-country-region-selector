import C from './constants';

// reduces the subset of countries depending on whether the user specified a white/blacklist, and lists priority
// countries first
export const filterCountries = (countries, priorityCountries, whitelist, blacklist) => {
	let countriesListedFirst = [];
	let filteredCountries = countries;

	if (whitelist.length > 0) {
		filteredCountries = countries.filter(([, countrySlug]) => whitelist.indexOf(countrySlug) > -1);
	} else if (blacklist.length > 0) {
		filteredCountries = countries.filter(([, countrySlug]) => blacklist.indexOf(countrySlug) === -1);
	}

	if (priorityCountries.length > 0) {

		// ensure the countries are added in the order in which they are specified by the user
		priorityCountries.forEach((slug) => {
			const result = filteredCountries.find(([, countrySlug]) => countrySlug === slug);
			if (result) {
				countriesListedFirst.push(result);
			}
		});

		filteredCountries = filteredCountries.filter(([, countrySlug]) => priorityCountries.indexOf(countrySlug) === -1);
	}

	return countriesListedFirst.length ? [...countriesListedFirst, ...filteredCountries] : filteredCountries;
};

// called when requesting new regions. It reduces the subset of regions depending on whether the user specifies
// a white/blacklist and region types
export const filterRegions = (regionsObject, whitelistObject, blacklistObject, regionTypesObject) => {
	const [country, countryCode, regions] = regionsObject;
	const whitelist = whitelistObject.hasOwnProperty(countryCode) ? whitelistObject[countryCode] : [];
	const blacklist = blacklistObject.hasOwnProperty(countryCode) ? blacklistObject[countryCode] : [];
	const regiontypes = regionTypesObject.hasOwnProperty(countryCode) ? regionTypesObject[countryCode] : [];
	let filteredRegions = regions.split(C.REGION_LIST_DELIMITER);

	if (whitelist.length > 0 && filteredRegions.length > 0) {
		filteredRegions = filteredRegions.filter((region) => {
			for (let i = 0, n = whitelist.length; i < n; i++) {
				if (region.indexOf(whitelist[i]) > -1) {
					return true;
				}
			}
			return false;
		});
	} else if (blacklist.length > 0 && filteredRegions.length > 0) {
		filteredRegions = filteredRegions.filter((region) => {
			for (let i = 0, n = blacklist.length; i < n; i++) {
				if (region.indexOf(blacklist[i]) > -1) {
					return false;
				}
			}

			return true;
		});
	}

	if (regiontypes.length) {
		filteredRegions = filteredRegions.filter((region) => {
			for (let i = 0, n = regiontypes.length; i < n; i++) {
				const regionData = region.split(C.SINGLE_REGION_DELIMITER);
				if (regionData.length < 3) { return true; }
				if (regionData[2] === regiontypes[i]) {
					return true;
				} else if (regionData[2].indexOf(C.REGION_TYPE_LIST_DELIMITER) > -1) {
					let regionTypeOptions = regionData[2].split(C.REGION_TYPE_LIST_DELIMITER);
					for (let j = 0, m = regionTypeOptions.length; j < m; j++) {
						if (regionTypeOptions[j] === regiontypes[i]) {
							return true;
						}
					}
				}
			}
			return false;
		});
	}

	return [
		country,
		countryCode,
		filteredRegions.join(C.REGION_LIST_DELIMITER)
	];
};
