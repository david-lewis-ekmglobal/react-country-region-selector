import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CountryRegionData from '../node_modules/country-region-data/data.json';
import C from './constants';
import * as helpers from './helpers';
import Select from 'react-select'; // https://react-select.com/home

export default class CountryDropdownSelect extends Component {
	constructor (props) {
		super(props);

		this.state = {
			countries: helpers.filterCountries(CountryRegionData, props.priorityOptions, props.whitelist, props.blacklist)
		};
	}

	getCountry (index) {
		const { valueType, labelType } = this.props;

		const selectedCountry = this.state.countries[index];
		return {
			value: valueType === C.DISPLAY_TYPE_SHORT ? selectedCountry[1] : selectedCountry[0],
			label: labelType === C.DISPLAY_TYPE_SHORT ? selectedCountry[1] : selectedCountry[0]
		};
	}

	getCountries () {
		const { valueType, labelType } = this.props;

		return this.state.countries.map(([countryName, countrySlug]) => ({
			value: valueType === C.DISPLAY_TYPE_SHORT ? countrySlug : countryName,
			label: labelType === C.DISPLAY_TYPE_SHORT ? countrySlug : countryName
		}));
	}

	getDefaultOption () {
		const { showDefaultOption, defaultOptionLabel } = this.props;
		if (!showDefaultOption) {
			const initialCountry = this.getCountry(0);
			return initialCountry.label;
		}
		return defaultOptionLabel;
	}

	render () {
		// unused properties deliberately added so arbitraryProps gets populated with anything else the user specifies
		const { name, id, classes, value, onChange, onBlur, disabled, showDefaultOption, defaultOptionLabel,
			labelType, valueType, whitelist, blacklist, priorityOptions, selectRef, ...arbitraryProps } = this.props;

		const attrs = {
			...arbitraryProps,
			name,
			value,
			placeholder: this.getDefaultOption(),
			options: this.getCountries(),
			onChange: (value) => onChange(value),
			isDisabled: disabled
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

CountryDropdownSelect.propTypes = {
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	name: PropTypes.string,
	id: PropTypes.string,
	classes: PropTypes.string,
	showDefaultOption: PropTypes.bool,
	defaultOptionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	priorityOptions: PropTypes.array,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	labelType: PropTypes.oneOf([C.DISPLAY_TYPE_FULL, C.DISPLAY_TYPE_SHORT]),
	valueType: PropTypes.oneOf([C.DISPLAY_TYPE_FULL, C.DISPLAY_TYPE_SHORT]),
	whitelist: PropTypes.array,
	blacklist: PropTypes.array,
	disabled: PropTypes.bool,
	selectRef: PropTypes.string
};
CountryDropdownSelect.defaultProps = {
	value: null,
	name: 'rcrs-country',
	id: '',
	classes: '',
	showDefaultOption: true,
	defaultOptionLabel: 'Select Country',
	priorityOptions: [],
	onChange: () => {},
	onBlur: () => {},
	labelType: C.DISPLAY_TYPE_FULL,
	valueType: C.DISPLAY_TYPE_FULL,
	whitelist: [],
	blacklist: [],
	disabled: false,
	selectRef: 'rcrs-country'
};
