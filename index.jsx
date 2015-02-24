'use strict';

var React     = require('react')
var TimeField = require('./src')

var value = '19:05:03'

function onChange(v){
	console.log(v)
	field.setProps({value: v})
}

var field = React.render(
	<TimeField
		clearTool={false}
		value={value}
		onChange={onChange}
	/>
	, document.getElementById('content')
)