import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CountryRegionData from '../node_modules/country-region-data/data.json';
import { filterRegions } from './helpers';
import C from './constants';
import Select from 'react-select'; // https://react-select.com/home

class RegionDropdownSelect extends PureComponent {
	constructor (props) {
		super(props);
		this.state = {
			regions: this.getRegions(props.country),
			styles: this.props.styles
		};
		this.getRegions = this.getRegions.bind(this);
	}

	componentDidUpdate (prevProps) {
		const { country } = this.props;
		if (country === prevProps.country) {
			return;
		}

		const defaultRegions = this.getRegions(country);

		this.setState({
			regions: [
				...defaultRegions,
				...this.getCustomOptions(defaultRegions)
			]
		});
	}

	getCustomOptions (regions) {
		const { customOptions } = this.props;

		const duplicateRegions = this.getDuplicates(regions);

		if (duplicateRegions.length) {
			console.error('Error: Duplicate regions present: ' + duplicateRegions.toString() + '.\nThe above item(s) is/are already getting added to the region dropdown by the library.');
			return [];
		}

		return customOptions.map((option) => {
			if (option) {
				return { regionName: option, regionShortCode: option };
			}
		});
	}

	getDuplicates (regions) {
		const { customOptions, valueType } = this.props;
		const regionKey = valueType === C.DISPLAY_TYPE_FULL ? 'regionName' : 'regionShortCode';

		return regions.filter((region) => customOptions.indexOf(region[regionKey]) !== -1).map(region => region[regionKey]);
	}

	getRegions (country) {
		if (!country) {
			return [];
		}

		const { countryValueType, whitelist, blacklist, regionTypes } = this.props;
		const searchIndex = (countryValueType === C.DISPLAY_TYPE_FULL) ? 0 : 1;
		let regions = [];
		CountryRegionData.forEach((i) => {
			if (i[searchIndex] === country) {
				regions = i;
			}
		});

		// this could happen if the user is managing the state of the region/country themselves and screws up passing
		// in a valid country
		if (!regions || regions.length === 0) {
			console.error('Error. Unknown country passed: ' + country + '. If you\'re passing a country shortcode, be sure to include countryValueType="short" on the RegionDropdown');
			return [];
		}

		const filteredRegions = filterRegions(regions, whitelist, blacklist, regionTypes);

		return filteredRegions[2].split(C.REGION_LIST_DELIMITER).map((regionPair) => {
			let [regionName, regionShortCode = null] = regionPair.split(C.SINGLE_REGION_DELIMITER);
			return { regionName, regionShortCode };
		});
	}

	getRegionList () {
		const { labelType, valueType } = this.props;
		return this.state.regions.map(({ regionName, regionShortCode }) => ({
			label: labelType === C.DISPLAY_TYPE_FULL ? regionName : regionShortCode,
			value: valueType === C.DISPLAY_TYPE_FULL ? regionName : regionShortCode
		}));
	}

	// there are two default options. The "blank" option which shows up when the user hasn't selected a country yet, and
	// a "default" option which shows
	getDefaultOption () {
		const { blankOptionLabel, showDefaultOption, defaultOptionLabel, country } = this.props;
		if (!country && !showDefaultOption) {
			return blankOptionLabel;
		}
		if (showDefaultOption) {
			return defaultOptionLabel;
		}
		return null;
	}

	render () {
		const {
			value, country, onChange, onBlur, id, name, classes, disabled, blankOptionLabel, showDefaultOption,
			defaultOptionLabel, labelType, valueType, countryValueType, disableWhenEmpty, customOptions,
			whitelist, blacklist, regionTypes, selectRef, ...arbitraryProps
		} = this.props;

		const isDisabled = disabled || (disableWhenEmpty && !country);
		const attrs = {
			...arbitraryProps,
			name,
			value,
			placeholder: this.getDefaultOption(),
			options: this.getRegionList(),
			onChange: (value) => onChange(value),
			isDisabled: isDisabled
		};
		if (id) {
			attrs.id = id;
		}
		if (classes) {
			attrs.className = classes;
		}

		return (
			<Select ref={selectRef} {...attrs} />
		);
	}
}

RegionDropdownSelect.propTypes = {
	country: PropTypes.string,
	countryValueType: PropTypes.oneOf([C.DISPLAY_TYPE_FULL, C.DISPLAY_TYPE_SHORT]),
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	name: PropTypes.string,
	id: PropTypes.string,
	classes: PropTypes.string,
	blankOptionLabel: PropTypes.string,
	showDefaultOption: PropTypes.bool,
	defaultOptionLabel: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	labelType: PropTypes.string,
	valueType: PropTypes.string,
	whitelist: PropTypes.object,
	blacklist: PropTypes.object,
	disabled: PropTypes.bool,
	disableWhenEmpty: PropTypes.bool,
	customOptions: PropTypes.array,
	regionTypes: PropTypes.object,
	styles: PropTypes.object,
	selectRef: PropTypes.string
};
RegionDropdownSelect.defaultProps = {
	country: '',
	value: null,
	name: 'rcrs-region',
	id: '',
	classes: '',
	blankOptionLabel: '-',
	showDefaultOption: true,
	defaultOptionLabel: 'Select Region',
	onChange: () => {},
	onBlur: () => {},
	countryValueType: C.DISPLAY_TYPE_FULL,
	labelType: C.DISPLAY_TYPE_FULL,
	valueType: C.DISPLAY_TYPE_FULL,
	whitelist: {},
	blacklist: {},
	disabled: false,
	disableWhenEmpty: false,
	customOptions: [],
	regionTypes: {},
	styles: {},
	selectRef: 'rcrs-region'
};

export default RegionDropdownSelect;
