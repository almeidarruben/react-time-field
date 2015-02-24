'use strict';

var React  = require('react')
var assign = require('object-assign')
var Utils  = require('react-field-component-utils')
var Field  = require('react-input-field/src')

var TimePicker = require('react-time-picker/src')
var TimePickerFactory = React.createFactory(TimePicker)

var parseTime       = require('parse-time')
var pickerParseTime = require('react-time-picker/src/parseTime')
var formatTime      = require('react-time-picker/src/formatTime')
var getFormatInfo      = require('react-time-picker/src/getFormatInfo')

function emptyFn(){}

module.exports = React.createClass({

	displayName: 'ReactTimeField',

	mixins: [
		Utils
	],

	getInitialState: function(){
		return {
			defaultValue: this.props.defaultValue
		}
	},

	getDefaultProps: function(){
		return {
			invalidStyle: {
				border: '1px solid red'
			},
			validate: true,
			showPickerOnFocus: true,
			defaultPickerFactory: TimePickerFactory,
			defaultPickerStyle: {
			    background: 'white',
			    zIndex  : 1,
			    position: 'absolute',
			    left: 0,
			    top: '100%'
			},

			defaultStyle: {
			    display: 'inline-block',
			    boxSizing: 'border-box'
			},
			defaultFieldStyle: {
			    width: '100%'
			},
			constrainTo: true,
			format: null
		}
	},

	render: function(){

		var props = this.prepareProps(this.props, this.state)

		var picker = this.renderPicker(props, this.state)

		return <div {...props.wrapperProps}>
			<Field {...props.fieldProps}>
				{picker}
			</Field>
		</div>
	},

	renderPicker: function(props, state){
	    return this._renderPicker(props, state)
	},

	getValue: function(props, state){
	    var theValue = props.value === undefined?
	                        state.defaultValue:
	                        props.value

	    return theValue
	},

	prepareProps: function(thisProps, state) {
		var props = assign({}, thisProps)

		this.prepareTime(props, state)

		props.style        = this.prepareStyle(props)
		props.fieldProps   = this.prepareFieldProps(props, state)
		props.pickerProps  = this.preparePickerProps(props)
		props.wrapperProps = this.prepareWrapperProps(props, state)

		return props
	},

	getTime: function(value){
		var strict = this.props.strict

		var formatInfo = this.formatInfo = getFormatInfo(this.props.format)

		return parseTime(value || this.getValue(this.props, this.state) || '00:00:00', {
			strict: strict,

			hour    : formatInfo.hour,
			minute  : formatInfo.minute,
			second  : formatInfo.second,
			meridian: formatInfo.meridian
		})
	},

	isValidTime: function(value){
		return this.getTime(value).valid
	},

	prepareTime: function(props, state) {
		var value = this.getValue(props, state) || ''
		var valueIsString = typeof value == 'string'

		props.fieldValue = value
		props.time = valueIsString?
							this.getTime():
							value

		var valid = !props.time.invalid
		var formatInfo = this.formatInfo

		props.valid = valid

		props.value = pickerParseTime(props.time, {
			strict: props.strict,

			hour    : formatInfo.hour,
			minute  : formatInfo.minute,
			second  : formatInfo.second,
			meridian: formatInfo.meridian
		})

		props.timeString = !valueIsString?
							this.formatTime(props.value, props.format):
							value
	},

	prepareStyle: function(props) {
	    var style = {}

	    assign(style, props.defaultStyle, props.style)

	    return style
	},

	prepareFieldProps: function(props, state) {

	    var fieldProps = this._prepareFieldProps(props, state)
		var value = props.fieldValue

	    if (typeof value != 'string'){
	    	value = this.formatTime(value, props.format)
	    }

	    fieldProps.time = props.time
	    fieldProps.value = value

	    if (fieldProps.validate === true){
	        fieldProps.validate = function(){
	            return props.valid
	        }
	    }

	    return fieldProps
	},

	preparePickerProps: function(props){
	    var pickerProps = this._preparePickerProps(props)

	    pickerProps.value       = props.value
		pickerProps.format       = props.format
		pickerProps.onMouseDown = this.handlePickerMouseDown.bind(this, props, pickerProps)
		pickerProps.onChange    = this.handlePickerChange.bind(this, props, pickerProps)

	    return pickerProps
	},

	prepareWrapperProps: function(props, state){

	    var wrapperProps = this._prepareWrapperProps(props, state)

	    wrapperProps.style = this.prepareWrapperStyle(props, wrapperProps)
	    wrapperProps['data-value'] = props.timeString

	    return wrapperProps
	},

	prepareWrapperStyle: function(props, wrapperProps){
	    var style = assign({}, wrapperProps.style)

	    if (style.position != 'absolute'){
	        //in order for the
	        style.position = 'relative'
	    }

	    return style
	},

	formatTime: function(value, format){
		return formatTime(value, format)
	},

	handlePickerMouseDown: function(props, pickerProps, event){
	    var initialPickerProps = this.props.pickerProps

	    if (initialPickerProps && initialPickerProps.onMouseDown){
	        initialPickerProps.onMouseDown(event)
	    }

	    event.preventDefault()
	},

	handlePickerChange: function(props, pickerProps, timeString, timeObject){

	    var initialPickerProps = this.props.pickerProps || {}
	    var args = [].slice.call(arguments, 2)

	    ;(initialPickerProps.onChange || emptyFn).apply(null, args)

	    this.notify({
	    	text: timeString,
	    	time: timeObject
	    })
	},

	handleChange: function(props, source, fieldProps, event){
		var fromInput = event && event.type === 'input'
		var timeString
		var timeObject
		var value

		if (fromInput){

			timeString = source
			value = timeString

			timeObject = parseTime(value)

			if (props.readOnly){
			    //cancel change event from input
			    return
			}
		} else {

			timeString = source.text
			timeObject = source.time

			value = timeObject
		}

		if (this.props.value === undefined){
			this.setState({
		        defaultValue: value
		    })
		}

		var args = [timeString, timeObject, event]
		;(props.onChange || emptyFn).apply(null, args)

		var fieldProps = this.props.fieldProps || {}
		;(fieldProps.onChange || emptyFn).apply(null, args)
	},

	notify: function(){
	    return this._notify.apply(this, arguments)
	},

	focus: function(){
	    return this._focus.apply(this, arguments)
	},

	getInput: function(){
	    return this._getInput.apply(this, arguments)
	},

	isFocused: function(){
	    return this._isFocused.apply(this, arguments)
	},

	handleFocus: function(event){
	    if (this.props.showPickerOnFocus){
	        this.setPickerVisible(true)
	    }

	    var fieldProps = this.props.fieldProps

	    if (fieldProps && fieldProps.onFocus){
	        fieldProps.onFocus(event)
	    }

	    if (this.props.onFocus){
	        this.props.onFocus(event)
	    }
	},

	handleBlur: function(event){
	    this.setPickerVisible(false)

	    var fieldProps = this.props.fieldProps

	    if (fieldProps && fieldProps.onBlur){
	        fieldProps.onBlur(event)
	    }

	    if (this.props.onBlur){
	        this.props.onBlur(event)
	    }
	},

	isPickerVisible: function(){
	    return this._isPickerVisible()
	},

	setPickerVisible: function(bool){
	    if (bool != this.state.pickerVisible){

	        var value = this.getValue(this.props, this.state)

	        var fn = bool?
	                    this.props.onPickerShow:
	                    this.props.onPickerHide

	        ;(fn || emptyFn)(value)

	        this.setState({
	            pickerVisible: bool
	        })
	    }
	},

	togglePicker: function(){
	    this.setState({
	        pickerVisible: !this.state.pickerVisible
	    })
	}
})