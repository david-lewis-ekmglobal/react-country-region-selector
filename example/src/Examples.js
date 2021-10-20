import React, { Component } from 'react';
import { CountryDropdown, CountryDropdownSelect, RegionDropdown, RegionDropdownSelect } from 'react-country-region-selector';

class Examples extends Component {
	constructor (props) {
		super(props);

		this.getCountryValue = this.getCountryValue.bind(this);
		this.getRegionValue = this.getRegionValue.bind(this);

		this.state = {
			examples: [
				{
					label: 'Simple, no-frills example.',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									value={this.getCountryValue(0)}
									onChange={(val) => this.selectCountry(0, val)} />
								<RegionDropdownSelect
									country={this.getCountry(0)}
									value={this.getRegionValue(0)}
									onChange={(val) => this.selectRegion(0, val)} />
								<RegionDropdownSelect
									country={this.getCountry(0)}
									value={this.getRegionTwoValue(0)}
									onChange={(val) => this.selectRegionTwo(0, val)} />
							</div>
						);
					},
					codeVisible: false,
					code: '&lt;CountryDropdown\n  value={country}\n  onChange={selectCountry} />\n&lt;RegionDropdown\n  country={country}\n  value={region}\n  onChange={selectRegion} />',
					country: null,
					region: null,
					region2: null
				},

				{
					label: 'Region field disabled until a country is selected.',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									value={this.getCountryValue(1)}
									onChange={(val) => this.selectCountry(1, val)}/>
								<RegionDropdownSelect
									disableWhenEmpty={true}
									country={this.getCountry(1)}
									value={this.getRegionValue(1)}
									onChange={(val) => this.selectRegion(1, val)}/>
							</div>
						);
					},
					codeVisible: false,
					code: '&lt;CountryDropdown\n  value={country}\n  onChange={selectCountry} />\n&lt;RegionDropdown\n  disableWhenEmpty={true}\n  country={country}\n  value={region}\n  onChange={selectRegion} />',
					country: null,
					region: null
				},

				{
					label: 'No country or region dropdown default option.',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									showDefaultOption={false}
									value={this.getCountryValue(2)}
									onChange={(val) => this.selectCountry(2, val)}/>
								<RegionDropdownSelect
									showDefaultOption={false}
									country={this.getCountry(2)}
									value={this.getRegionValue(2)}
									onChange={(val) => this.selectRegion(2, val)}/>
							</div>
						);
					},
					codeVisible: false,
					code: '&lt;CountryDropdown\n  showDefaultOption={false}\n  value={country}\n  onChange={selectCountry} />\n&lt;RegionDropdown\n  showDefaultOption={false}\n  country={country}\n  value={region}\n  onChange={selectRegion} />',
					country: null,
					region: null
				},

				{
					label: 'Custom default option texts for both the country and region dropdowns.',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									defaultOptionLabel="Select a country, man."
									value={this.getCountryValue(3)}
									onChange={(val) => this.selectCountry(3, val)}/>
								<RegionDropdownSelect
									blankOptionLabel="No country selected, man."
									defaultOptionLabel="Now select a region, pal."
									country={this.getCountry(3)}
									value={this.getRegionValue(3)}
									onChange={(val) => this.selectRegion(3, val)}/>
							</div>
						);
					},
					codeVisible: false,
					code: '&lt;CountryDropdown\n  defaultOptionLabel="Select a country, man."\n  value={country}\n  onChange={selectCountry} />\n&lt;RegionDropdown\n  blankOptionLabel="No country selected, man."\n  defaultOptionLabel="Now select a region, pal."\n  country={country}\n  value={region}\n  onChange={selectRegion} />',
					country: null,
					region: null
				},

				{
					label: 'Custom name, class and ID attributes for both dropdowns.',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									value={this.getCountryValue(4)}
									id="my-country-field-id"
									name="my-country-field"
									classes="my-custom-class second-class"
									onChange={(val) => this.selectCountry(4, val)}/>
								<RegionDropdownSelect
									country={this.getCountry(4)}
									value={this.getRegionValue(4)}
									name="my-region-field-name"
									id="my-region-field-id"
									classes="another-custom-class"
									onChange={(val) => this.selectRegion(4, val)}/>
							</div>
						);
					},
					codeVisible: false,
					code: '&lt;CountryDropdown\n  value={country}\n  id="my-country-field-id"\n  name="my-country-field"\n  classes="my-custom-class second-class"\n  onChange={selectCountry} />\n&lt;RegionDropdown\n  country={country}\n  value={region}\n  name="my-region-field-name"\n  id="my-region-field-id"\n  classes="another-custom-class"\n  onChange={selectRegion} />',
					country: null,
					region: null
				},

				{
					label: 'Abbreviated country and region names.',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									value={this.getCountryValue(5)}
									labelType="short"
									valueType="short"
									onChange={(val) => this.selectCountry(5, val)}/>
								<RegionDropdownSelect
									country={this.getCountry(5)}
									value={this.getRegionValue(5)}
									countryValueType="short"
									labelType="short"
									valueType="short"
									onChange={(val) => this.selectRegion(5, val)}/>
							</div>
						);
					},
					codeVisible: false,
					code: '&lt;CountryDropdown\n  value={country}\n  labelType="short"\n  valueType="short"\n  onChange={selectCountry} />\n&lt;RegionDropdown\n  country={country}\n  value={region}\n  countryValueType="short"\n  labelType="short"\n  valueType="short"\n  onChange={selectRegion} />',
					country: null,
					region: null
				},

				{
					label: 'Specify which countries should appear. This just shows the UK, United States and Canada. See the countryShortCode property in the source data for the country shortcodes you need to pass here.',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									value={this.getCountryValue(6)}
									onChange={(val) => this.selectCountry(6, val)}
									whitelist={['GB', 'US', 'CA']} />
								<RegionDropdownSelect
									country={this.getCountry(6)}
									value={this.getRegionValue(6)}
									onChange={(val) => this.selectRegion(6, val)}/>
							</div>
						);
					},
					codeVisible: false,
					code: '&lt;CountryDropdown\n  value={country}\n  labelType="short"\n  valueType="short"\n  onChange={selectCountry} />\n&lt;RegionDropdown\n  country={country}\n  value={region}\n  countryValueType="short"\n  labelType="short"\n  valueType="short"\n  onChange={selectRegion} />',
					country: null,
					region: null
				},

				{
					label: 'Specify which countries should NOT appear. This omits all countries that start with "A".',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									value={this.getCountryValue(7)}
									onChange={(val) => this.selectCountry(7, val)}
									blacklist={['AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ']}/>
								<RegionDropdownSelect
									country={this.getCountry(7)}
									value={this.getRegionValue(7)}
									onChange={(val) => this.selectRegion(7, val)}/>
							</div>
						);
					},
					codeVisible: false,
					code: "&lt;CountryDropdown\n  value={country}\n  onChange={selectCountry}\n  blacklist={['AF','AX','AL','DZ','AS','AD','AO','AI','AQ','AG']} />\n&lt;RegionDropdown\n  country={country}\n  value={region}\n  onChange={selectRegion} />",
					country: null,
					region: null
				},

				{
					label: 'Explicitly disabling the country and region dropdowns (with defaults).',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									value={this.getCountryValue(8)}
									onChange={(val) => this.selectCountry(8, val)}
									blacklist={['AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ']}
									disabled={true}/>
								<RegionDropdownSelect
									country={this.getCountry(8)}
									value={this.getRegionValue(8)}
									onChange={(val) => this.selectRegion(8, val)}
									disabled={true}/>
							</div>
						);
					},
					codeVisible: false,
					code: "&lt;CountryDropdown\n  value=\"United States\"\n  onChange={selectCountry}\n  disabled={true} />\n&lt;RegionDropdown\n  country={country}\n  value=\"Washington\"\n  onChange={selectRegion}\n disabled={true} />",
					country: { value: 'United States', label: 'United States' },
					region: { value: 'Washington', label: 'Washington' }
				},

				{
					label: 'Blacklist specific regions. Alberta is removed from the Canadian provinces list and Washington and Oregon are omitted from the US state list.',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									value={this.getCountryValue(9)}
									onChange={(val) => this.selectCountry(9, val)}
								/>
								<RegionDropdownSelect
									country={this.getCountry(9)}
									value={this.getRegionValue(9)}
									onChange={(val) => this.selectRegion(9, val)}
									blacklist={{
										CA: ['Alberta'],
										US: ['Washington', 'Oregon']
									}}
								/>
							</div>
						);
					},
					codeVisible: false,
					code: "&lt;CountryDropdown\n  value={this.getCountryValue(9)}\n  onChange={(val) => this.selectCountry(9, val)}\n  whitelist={[\"CA\", \"US\"]} />\n&lt;RegionDropdown\n  country={this.getCountryValue(9)}\n  value={this.getRegionValue(9)}\\n  onChange={(val) => this.selectRegion(9, val)}\n  blacklist={{\n    CA: [\"Alberta\"],\n    US: [\"Washington\", \"Oregon\"]\n  }}\n/>",
					country: { value: 'United States', label: 'United States' },
					region: { value: 'Alabama', label: 'Alabama' }
				},

				{
					label: 'Whitelist specific regions.',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									value={this.getCountryValue(10)}
									onChange={(val) => this.selectCountry(10, val)}
									whitelist={['CA', 'US']}
								/>
								<RegionDropdownSelect
									country={this.getCountry(10)}
									value={this.getRegionValue(10)}
									onChange={(val) => this.selectRegion(10, val)}
									whitelist={{
										CA: ['BC', 'AB', 'MB'],
										US: ['Washington', 'Oregon', 'Illinois']
									}}
								/>
							</div>
						);
					},
					codeVisible: false,
					code: "&lt;CountryDropdown\n  value={this.getCountryValue(10)}\n  onChange={(val) => this.selectCountry(10, val)}\n  whitelist={[\"CA\", \"US\"]}\n/>\n&lt;RegionDropdown\n  country={this.getCountryValue(10)}\n  value={this.getRegionValue(10)}\n  onChange={(val) => this.selectRegion(10, val)}\n  whitelist={{\n    CA: [\"BC\", \"AB\", \"MB\"],\n    US: [\"Washington\", \"Oregon\", \"Illinois\"]\n  }}\n/>",
					country: { value: 'United States', label: 'United States' },
					region: { value: 'Washington', label: 'Washington' }
				},

				{
					label: 'Include specific region types (US States).',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									value={this.getCountryValue(11)}
									onChange={(val) => this.selectCountry(11, val)}
									whitelist={['CA', 'US']}
								/>
								<RegionDropdownSelect
									country={this.getCountry(11)}
									value={this.getRegionValue(11)}
									onChange={(val) => this.selectRegion(11, val)}
									regionTypes={{
										US: ['110']
									}}
								/>
							</div>
						);
					},
					codeVisible: false,
					code: "&lt;CountryDropdown\n  value={this.getCountryValue(10)}\n  onChange={(val) => this.selectCountry(10, val)}\n  whitelist={[\"CA\", \"US\"]}\n/>\n&lt;RegionDropdown\n  country={this.getCountryValue(10)}\n  value={this.getRegionValue(10)}\n  onChange={(val) => this.selectRegion(10, val)}\n  regionTypes={{\n    US: [\"110\"]\n  }}\n/>",
					country: { value: 'United States', label: 'United States' },
					region: null
				},
				
				{
					label: 'Arbitrary attributes (style, tabindex) passed to Country and Region dropdown',
					jsx: () => {
						return (
							<div>
								<CountryDropdown
									value={this.getCountryValue(12)}
									onChange={(val) => this.selectCountry(12, val)}
									style={{
										backgroundColor: 'blue',
										color: 'white',
										fontSize: 20
									}}
									tabIndex={1000}/>
								<RegionDropdown
									country={this.getCountryValue(12)}
									value={this.getRegionValue(12) ? this.getRegionValue(12) : undefined}
									onChange={(val) => this.selectRegion(12, val)}
									style={{
										backgroundColor: 'green',
										color: 'white'
									}}
									tabIndex={1001}/>
							</div>
						);
					},
					codeVisible: false,
					code: "&lt;CountryDropdown\n  value=\"United States\"\n  onChange={selectCountry}\n  style={{\n    backgroundColor: 'blue',\n    color: 'white',\n    fontSize: 20\n}}\n  tabIndex={1000}\n  disabled={true} />\n&lt;RegionDropdown\n  country={country}\n  value=\"Washington\"\n  onChange={selectRegion}\n  style={{\n    backgroundColor: 'green',\n    color: 'white']\n  }}\n  tabIndex={1001}\n  disabled={true} />",
					country: '',
					region: ''
				},

				{
					label: 'Styles passed to Country and Region dropdown Select',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									value={this.getCountryValue(13)}
									onChange={(val) => this.selectCountry(13, val)}
									styles={{ control: base => ({
										...base,
										backgroundColor: 'blue'
									}),
									menuList: base => ({
										...base,
										backgroundColor: 'blue',
										color: 'white',
										fontSize: 20
									}),
									option: (base, { data, isDisabled, isFocused, isSelected }) => ({
										...base,
										backgroundColor: isFocused
											? 'lightgrey'
											: isSelected
											? 'lightgrey'
											: null 
									}),
									placeholder: base => ({
										...base,
										color: 'white',
										fontSize: 20
									}),
									singleValue: base => ({
										...base,
										color: 'white',
										fontSize: 20
									}) }}/>
								<RegionDropdownSelect
									country={this.getCountry(13)}
									value={this.getRegionValue(13)}
									onChange={(val) => this.selectRegion(13, val)}
									styles={{ control: base => ({
										...base,
										backgroundColor: 'green'
									}),
									menuList: base => ({
										...base,
										backgroundColor: 'green',
										color: 'white'
									}),
									option: (base, { data, isDisabled, isFocused, isSelected }) => ({
										...base,
										backgroundColor: isFocused
											? 'lightgrey'
											: isSelected
											? 'lightgrey'
											: null 
									}),
									placeholder: base => ({
										...base,
										color: 'white'
									}),
									singleValue: base => ({
										...base,
										color: 'white'
									}) }}/>
							</div>
						);
					},
					codeVisible: false,
					code: "&lt;CountryDropdown\n  value=\"United States\"\n  onChange={selectCountry}\n  style={{\n    backgroundColor: 'blue',\n    color: 'white',\n    fontSize: 20\n}}\n  tabIndex={1000}\n  disabled={true} />\n&lt;RegionDropdown\n  country={country}\n  value=\"Washington\"\n  onChange={selectRegion}\n  style={{\n    backgroundColor: 'green',\n    color: 'white']\n  }}\n  tabIndex={1001}\n  disabled={true} />",
					country: null,
					region: null
				},
				
				{
					label: 'With custom options in the RegionDropdown.',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									value={this.getCountryValue(14)}
									onChange={(val) => this.selectCountry(14, val)}/>
								<RegionDropdownSelect
									country={this.getCountry(14)}
									value={this.getRegionValue(14)}
									customOptions={['-- Custom option 1', '-- Custom option 2']}
									onChange={(val) => this.selectRegion(14, val)}/>
							</div>
						);
					},
					codeVisible: false,
					code: '&lt;CountryDropdown\n  value={country}\n  onChange={selectCountry} />\n&lt;RegionDropdown\n  country={country}\n  value={region}\n  onChange={selectRegion}\n  customOptions={[\'-- Custom option 1\', \'-- Custom option 2\']} />',
					country: null,
					region: null
				},

				{
					label: 'Make Canada, United States and the UK appear first in the dropdown list.',
					jsx: () => {
						return (
							<div>
								<CountryDropdownSelect
									value={this.getCountryValue(15)}
									onChange={(val) => this.selectCountry(15, val)}
									priorityOptions={['CA', 'US', 'GB']} />
								<RegionDropdownSelect
									country={this.getCountry(15)}
									value={this.getRegionValue(15)}
									onChange={(val) => this.selectRegion(15, val)} />
							</div>
						);
					},
					codeVisible: false,
					code: '&lt;CountryDropdown\n  value={country}\n  onChange={selectCountry}\n  priorityOptions={["CA", "US", "GB"]} />\n&lt;RegionDropdown\n  country={country}\n  value={region}\n  onChange={selectRegion} />',
					country: null,
					region: null
				}
								
			]
		};
	}

	selectCountry (exampleIndex, val) {
		const updatedValues = this.state.examples;
		updatedValues[exampleIndex].country = val;
		updatedValues[exampleIndex].region = null;
		this.setState({ examples: updatedValues });
	}

	selectRegion (exampleIndex, val) {
		const updatedValues = this.state.examples;
		updatedValues[exampleIndex].region = val;
		this.setState({ examples: updatedValues });
	}

	selectRegionTwo (exampleIndex, val) {
		const updatedValues = this.state.examples;
		updatedValues[exampleIndex].region2 = val;
		this.setState({ examples: updatedValues });
	}

	getCountryValue (index) {
		return this.state.examples[index].country;
	}

	getCountry (index) {
		return this.state.examples[index].country ? this.state.examples[index].country.value : null;
	}

	getRegionValue (index) {
		return this.state.examples[index].region;
	}

	getRegionTwoValue (index) {
		return this.state.examples[index].region2;
	}

	toggleCode (exampleIndex) {
		const updatedValues = this.state.examples;
		updatedValues[exampleIndex].codeVisible = !updatedValues[exampleIndex].codeVisible;
		this.setState({ examples: updatedValues });
	}

	getExamples () {
		let i = 0;
		return this.state.examples.map((example) => {
			let j = i++;
			return (
				<section key={i}>
					<p>
						<span className="counter">{i}.</span>
						{example.label}
						<span className="toggleCode" title="Toggle code"
						      onClick={() => this.toggleCode(j)}>&lt;/&gt;</span>
					</p>
					{example.jsx()}
					<pre className="hljs html" style={{ display: example.codeVisible ? 'block' : 'none' }}>
						<code className="html" dangerouslySetInnerHTML={{ __html: example.code }}/>
					</pre>
				</section>
			);
		});
	}

	render () {
		return (
			<div>
				{this.getExamples()}
			</div>
		);
	}
}

export default Examples;





