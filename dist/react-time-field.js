(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactTimeField"] = factory(require("React"));
	else
		root["ReactTimeField"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React  = __webpack_require__(1)
	var assign = __webpack_require__(2)
	var Utils  = __webpack_require__(3)
	var Field  = __webpack_require__(7)

	var TimePicker = __webpack_require__(6)
	var TimePickerFactory = React.createFactory(TimePicker)

	var parseTime = __webpack_require__(8)
	var pickerParseTime = __webpack_require__(4)
	var timeToString = __webpack_require__(5)

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
				constrainTo: true
			}
		},

		render: function(){

			var props = this.prepareProps(this.props, this.state)

			var picker = this.renderPicker(props, this.state)

			return React.createElement("div", React.__spread({},  props.wrapperProps), 
				React.createElement(Field, React.__spread({},  props.fieldProps), 
					picker
				)
			)
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

		prepareValue: function(props, state) {
			var value = this.getValue(props, state) || '00:00'

			var parsed = pickerParseTime(value)

			return parsed
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

		prepareTime: function(props, state) {
			var value = this.getValue(props, state) || ''
			var valueIsString = typeof value == 'string'

			props.fieldValue = value
			props.time = valueIsString?
								parseTime(value || '00:00'):
								value

			var valid = !props.time.invalid

			props.valid = valid
			props.value = pickerParseTime(props.time, {
				strict: props.strict
			})

			props.timeString = !valueIsString?
								timeToString(props.value):
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
		    	value = timeToString(value)
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(22)

	var hasOwn = function(obj, prop){
	    return Object.prototype.hasOwnProperty.call(obj, prop)
	}

	var toUpperFirst = __webpack_require__(9)
	var constrainPicker = __webpack_require__(10)

	function emptyFn(){}

	function copyKeys(which, target, src){
	    Object.keys(which).forEach(function(key){
	        if (hasOwn(src, key)){
	            target[key] = src[key]
	        }
	    })
	}

	var PROP_NAMES = {
	    style    : true,
	    className: true
	}

	module.exports = {

	    _prepareWrapperProps: function(props) {

	        var wrapperProps = assign({}, props.wrapperProps)

	        copyKeys(PROP_NAMES, wrapperProps, props)

	        return wrapperProps
	    },

	    _prepareFieldProps: function(props, state) {

	        var fieldProps = assign({}, props)

	        delete fieldProps.style
	        delete fieldProps.className
	        delete fieldProps.fieldProps
	        delete fieldProps.defaultStyle
	        delete fieldProps.readOnly

	        assign(fieldProps, props.defaultFieldProps, props.fieldProps)

	        if (props.readOnly){
	            fieldProps.inputProps = assign({}, fieldProps.inputProps)
	            fieldProps.inputProps.style = assign({
	                cursor: 'pointer'
	            }, fieldProps.inputProps.style)
	        }

	        fieldProps.ref = 'field'

	        fieldProps.style       = assign({}, props.defaultFieldStyle, props.fieldStyle, fieldProps.style)
	        fieldProps.onFocus     = this.handleFocus
	        fieldProps.onBlur      = this.handleBlur
	        fieldProps.onKeyDown   = (this.handleKeyDown || emptyFn).bind(this, props)
	        fieldProps.onChange    = (this.handleChange || emptyFn).bind(this, props)

	        delete fieldProps.data

	        return fieldProps
	    },

	    _preparePickerProps: function(props) {
	        var pickerProps   = assign({}, props.defaultPickerProps, props.pickerProps)
	        pickerProps.style = assign({}, props.defaultPickerStyle, props.pickerStyle, pickerProps.style)

	        pickerProps.ref = "picker"
	        pickerProps.owner = this

	        return pickerProps
	    },

	    _constrainPicker: constrainPicker,

	    _renderPicker: function(props, state){
	        var pickerProps = props.pickerProps
	        var visible     = state.pickerVisible

	        pickerProps.visible = visible

	        if (!visible){
	            pickerProps.style.display = 'none'
	        }

	        if (visible){
	            if (props.constrainTo){
	                ;(this.constrainPicker || this._constrainPicker)(props, pickerProps, props.constrainTo)
	            }
	        }

	        var defaultFactory = this.props.defaultPickerFactory
	        var picker = (props.pickerFactory || defaultFactory)(pickerProps)

	        if (picker === undefined){
	            picker = defaultFactory(pickerProps)
	        }

	        return picker
	    },

	    _isFocused: function(){
	        return this.refs.field.isFocused()
	    },

	    _getInput: function(){
	        return this.refs.field?
	                    this.refs.field.getInput():
	                    null
	    },

	    _focus: function(){
	        this.refs.field.focus()
	    },

	    _notify: function(value, event) {
	        this.refs.field.notify(value, event)
	    },

	    _isPickerVisible: function(){
	        return this.props.pickerVisible == null?
	                    this.state.pickerVisible:
	                    this.props.pickerVisible
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var parseTime      = __webpack_require__(31)
	var adjustOverflow = parseTime.adjustOverflow

	var defaults = {}

	function onInvalid(timeValue, config){

		timeValue.invalid.forEach(function(info){

			var name  = info.name
			var value = info.value * 1

			if (!isNaN(value)){
				timeValue[name] = value
			}
		})

		return adjustOverflow(timeValue, config)
	}

	module.exports = function(value, config){

		config = config || defaults

		value = value || ''

		if (typeof value == 'string'){
			value = parseTime(value)
		}

		var definedParts = {}

		if (value){

			config.withMeridian = value.meridian != null

			if (value.invalid){
				value.invalid.forEach(function(info){
					definedParts[info.name] = true
				})
			}

			if (!config.strict && value.invalid){
				value = onInvalid(value, config)
			}

			if (definedParts.hour){
				value.hour = value.hour || 0
			}

			if (definedParts.minute){
				value.minute = value.minute || 0
			}

			if (definedParts.second){
				value.second = value.second || 0
			}

			// value.hour   = value.hour || 0
			// value.minute = value.minute || 0
			// value.second = value.second || 0

			if (config.strict && value.meridian && value.hour === 12){
				if (value.minute !== undefined){
					value.minute = 0
				}
				if (value.second !== undefined){
					value.second = 0
				}
			}
		}

		var result = {
			hour  : value.hour
		}
		if (value.minute !== undefined){
			result.minute = value.minute
		}
		if (value.second !== undefined){
			result.second = value.second
		}

		if (config.withMeridian){
			result.meridian = value.meridian
		}

		return result
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function twoDigits(value){
		return value < 10?
				'0' + value:
				value
	}

	module.exports = function(time){
		var str = twoDigits(time.hour)

		if (time.minute != null){
		 	str += ':' + twoDigits(time.minute)
		}

		if (time.second != null){
			str += ':' + twoDigits(time.second)
		}

		if (time.meridian){
			str += ' ' + time.meridian
		}

		return str
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React       = __webpack_require__(1)
	var assign      = __webpack_require__(23)
	var normalize   = __webpack_require__(27)

	var parseTime    = __webpack_require__(4)
	var updateTime   = __webpack_require__(20)
	var toUpperFirst = __webpack_require__(21)
	var timeToString = __webpack_require__(5)

	var hasTouch = __webpack_require__(24)
	var EVENT_NAMES = __webpack_require__(25)

	var WHITESPACE = '\u00a0'

	function twoDigits(value){
		return value < 10?
				'0' + value:
				value
	}

	function emptyFn(){}

	module.exports = React.createClass({

		displayName: 'ReactTimePicker',

		componentWillUnmount: function(){
			this.stopInterval()
		},

		getInitialState: function(){
			return {
				defaultValue: this.props.defaultValue,
				focused: {
					hour    : null,
					minute  : null,
					second  : null,
					meridian: null
				}
			}
		},

		getDefaultProps: function() {
			return {
				stopChangePropagation: true,


				//makes 15:78 be converted to 15:00, and not to 16:18
				strict: true,
				overflowHourToMeridian: true,

				step: 1,
				hourStep: null,
				minuteStep: 10,
				secondStep: 30,

				stepDelay:60,
				showArrows: true,

				// showMinute: true,
				// showSecond: true,
				defaultStyle: {
					border: '1px solid gray',
					padding: 20,
					display: 'inline-flex',
					alignItems: 'center',
					boxSizing: 'border-box',
					flexFlow: 'row',
					width: 200
				},
				defaultArrowStyle: {
					cursor: 'pointer',
					userSelect: 'none'
				},
				defaultBoxStyle: {
					boxSizing: 'border-box',
					display: 'flex',
					flexFlow: 'column',
					alignItems: 'center'
				},
				defaultInputStyle: {
					boxSizing: 'border-box',
					width: '100%',
					textAlign: 'center'
				},
				defaultSeparatorStyle: {
					flex: 'none'
				},
				defaultMeridianInputStyle: {
					cursor: 'pointer'
				},
				defaultMeridianInputProps: {
					readOnly: true
				},
				format: twoDigits,
				formatHour: null,
				formatMinute: null,
				formatSecond: null,
				formatMeridian: null,

				defaultArrowFactory: React.DOM.span,

				arrowFactory: null,
				arrowUpFactory: null,
				arrowDownFactory: null,

				defaultInputFactory: React.DOM.input,
				inputFactory: null,

				hourInputFactory: null,
				minuteInputFactory: null,
				secondInputFactory: null,
				meridianInputFactory: null,

				timeToString: timeToString
			}
		},

		render: function(){
			var props = this.prepareProps(this.props, this.state)

			var hour     = this.renderHour(props)
			var minute   = this.renderMinute(props)
			var second   = this.renderSecond(props)
			var meridian = this.renderMeridian(props)

			var separator       = props.separator || React.createElement("span", {style: props.separatorStyle}, WHITESPACE + ':' + WHITESPACE)
			var hourSeparator   = props.hourSeparator || separator
			var minuteSeparator = minute && (second || meridian)? props.minuteSeparator || separator: null
			var secondSeparator = (second && meridian)? props.secondSeparator || separator: null


			return React.createElement("div", React.__spread({},  props), 
				hour, 
				hourSeparator, 
				minute, 
				minuteSeparator, 
				second, 
				secondSeparator, 
				meridian
			)
		},

		onArrowMouseDown: function(props, dir, name, event){

			if (name == 'meridian'){
				this.onArrowMeridianAction(props, dir, name)
				return
			}

			var target = hasTouch?
			                event.target:
			                window
			var eventName = hasTouch? 'touchend': 'click'

			target.addEventListener(eventName, this.onWindowClick)

			this.startInterval(props, dir, name)
		},

		onWindowClick: function(){
			this.stopInterval()
		},

		stopInterval: function(){
			clearInterval(this.intervalId)
		},

		startInterval: function(props, dir, name){
			this.intervalId = setInterval(function(){
				this.onArrowAction(props, dir, name)
			}.bind(this), props.stepDelay)
		},

		onMeridianInputMouseDown: function(props, event){
			event.preventDefault()
			this.onArrowMeridianAction(props, 1, 'meridian')
		},

		onArrowMeridianAction: function(props, dir, name){
			this.updateValue(name, this.time.meridian == 'AM'? 'PM': 'AM')
		},

		onArrowAction: function(props, dir, name) {

			var dirName = dir == 1? 'Up': 'Down'
			var methodName = 'onArrow' + dirName + toUpperFirst(name) + 'Action'

			if (typeof this[methodName] == 'function'){
				this[methodName](props)
			}

			methodName = 'onArrow' + toUpperFirst(name) + 'Action'

			if (typeof this[methodName] == 'function'){
				this[methodName](props, dir)
			}

			this.incValue(props, name, dir)
		},

		incValue: function(props, name, dir){
			dir = dir || 0

			var step     = props[name + 'Step'] || props.step
			var amount   = dir * step
			var time     = this.time
			var oldValue = time[name]
			var newValue = oldValue + amount

			this.setValue(time)
			this.updateValue(name, newValue)
		},

		updateValue: function(name, newValue, config){
			this.setValue(this.updateTime(name, newValue, config))
		},

		updateTime: function(name, newValue, config){
			config = config || {}
			config.overflowHourToMeridian = this.props.overflowHourToMeridian

			var time = this.time

			time = updateTime(time, name, newValue, config)

			return this.time = time
		},

		setValue: function(time){

			if (this.props.value == null){
				this.setState({
					defaultValue: time
				})
			}

			;(this.props.onChange || emptyFn)(this.props.timeToString(time), assign({}, time))
		},

		format: function(props, name, value){
			var formatFn

			if (arguments.length < 3){
				value = props.time[name]
			}

			if (name != 'meridian'){
				formatFn = props['format' + toUpperFirst(name)] || props.format
			} else {
				formatFn = props.formatMeridian
			}

			if (typeof formatFn == 'function'){
				value = formatFn(value)
			}

			return value
		},

		renderBox: function(props, name){
			var state = this.state
			var style      = props[name + 'Style']
			var inputStyle = props[name + 'InputStyle']
			var upperName  = toUpperFirst(name)

			var value

			if (!state.focused[name]){
				value = this.format(props, name)
			} else {
				value = state.focused[name].value
			}

			var arrowUp
			var arrowDown

			if (props.showArrows){
				var arrowUpProps = {
					style      : props.arrowUpStyle,
					children   : '▴'
				}

				arrowUpProps[EVENT_NAMES.onMouseDown] = this.onArrowMouseDown.bind(this, props, 1, name)

				var arrowDownProps = {
					style      : props.arrowDownStyle,
					children   : '▾'
				}

				arrowDownProps[EVENT_NAMES.onMouseDown] = this.onArrowMouseDown.bind(this, props, -1, name)

				var defaultArrowFactory = props.defaultArrowFactory
				var arrowUpFactory = props.arrowUpFactory || props.arrowFactory || defaultArrowFactory
				var arrowDownFactory = props.arrowDownFactory || props.arrowFactory || defaultArrowFactory

				arrowUp = arrowUpFactory(arrowUpProps)
				if (arrowUp === undefined){
					arrowUp = defaultArrowFactory(arrowUpProps)
				}

				arrowDown = arrowDownFactory(arrowDownProps)
				if (arrowDown === undefined){
					arrowDown = defaultArrowFactory(arrowDownProps)
				}
			}

			var defaultInputFactory = props.defaultInputFactory
			var inputFactory = props[name + 'InputFactory'] || props.inputFactory || defaultInputFactory

			var defaultInputProps = props['default' + upperName + 'InputProps']
			var inputProps = assign({}, defaultInputProps, {
				style   : inputStyle,
				value   : value,
				onFocus : this.handleInputFocus.bind(this, props, name),
				onBlur  : this.handleInputBlur.bind(this, props, name),
				onChange: this.handleInputChange.bind(this, props, name)
			})

			if (name == 'meridian'){
				inputProps.onMouseDown = this.onMeridianInputMouseDown.bind(this, props)
			}

			var input = inputFactory(inputProps)
			if (input === undefined){
				input = defaultInputFactory(inputProps)
			}


			return React.createElement("div", {style: style}, 
				arrowUp, 
				input, 
				arrowDown
			)
		},

		handleInputFocus: function(props, name, event){
			var focused = this.state.focused

			focused[name] = {
				value: this.format(props, name)
			}

			this.setState({})
		},

		handleInputBlur: function(props, name, event){

			this.state.focused[name] = null
			this.setState({})

			var time
			var value = event.target.value * 1

			this.updateValue(name, value, {
				clamp: props.clamp
			})
		},

		handleInputChange: function(props, name, event){
			if (this.state.focused[name]){
				this.state.focused[name].value = event.target.value
			}

			this.setState({})
			props.stopChangePropagation && event.stopPropagation()
		},

		getTime: function(){
			return parseTime(this.getValue(), {
				strict: this.props.strict
			})
		},

		prepareTime: function(props, state) {
			var timeValue = this.getTime()

			props.showSecond = timeValue.second !== undefined
			props.showMinute = timeValue.minute !== undefined
			props.withMeridian = timeValue.meridian != null

			return timeValue
		},

		getValue: function() {
		    var value = this.props.value == null?
		                    this.state.defaultValue:
		                    this.props.value

		    return value
		},

		renderHour: function(props) {
			return this.renderBox(props, 'hour')
		},

		renderMinute: function(props) {
			if (props.showMinute){
				return this.renderBox(props, 'minute')
			}
		},

		renderSecond: function(props) {
			if (props.showSecond){
				return this.renderBox(props, 'second')
			}
		},

		renderMeridian: function(props) {
			if (props.withMeridian){
				return this.renderBox(props, 'meridian')
			}
		},

		prepareProps: function(thisProps, state) {
			var props = assign({}, thisProps)

			this.time = props.time = this.prepareTime(props, state)
			this.prepareStyles(props, state)

			return props
		},

		prepareStyles: function(props, state) {

			props.style = this.prepareStyle(props, state)
			props.separatorStyle = this.prepareSeparatorStyle(props, state)
			this.prepareArrowStyles(props, state)

			this.prepareHourStyles(props, state)
			this.prepareMinuteStyles(props, state)
			this.prepareSecondStyles(props, state)
			this.prepareMeridianStyles(props, state)

		},

		prepareStyle: function(props, state) {
			return normalize(assign({}, props.defaultStyle, props.style))
		},

		prepareSeparatorStyle: function(props, state) {
			return normalize(assign({}, props.defaultSeparatorStyle, props.separatorStyle))
		},

		prepareArrowStyles: function(props, state) {
			props.arrowUpStyle = normalize(assign({}, props.defaultArrowStyle, props.defaultArrowUpStyle, props.arrowUpStyle))
			props.arrowDownStyle = normalize(assign({}, props.defaultArrowStyle, props.defaultArrowDownStyle, props.arrowDownStyle))
		},

		prepareHourStyles: function(props, state) {
			props.hourStyle = this.prepareHourStyle(props, state)
			props.hourInputStyle = this.prepareHourInputStyle(props, state)
		},

		prepareHourStyle: function(props, state) {
			return normalize(assign({}, props.defaultBoxStyle, props.defaultHourStyle, props.hourStyle))
		},

		prepareHourInputStyle: function(props, state) {
			return normalize(assign({}, props.defaultInputStyle, props.defaultHourInputStyle, props.hourInputStyle))
		},

		prepareMinuteStyles: function(props, state) {
			props.minuteStyle = this.prepareMinuteStyle(props, state)
			props.minuteInputStyle = this.prepareMinuteInputStyle(props, state)
		},

		prepareMinuteStyle: function(props, state) {
			return normalize(assign({}, props.defaultBoxStyle, props.defaultMinuteStyle, props.minuteStyle))
		},

		prepareMinuteInputStyle: function(props, state) {
			return normalize(assign({}, props.defaultInputStyle, props.defaultMinuteInputStyle, props.minuteInputStyle))
		},

		prepareSecondStyles: function(props, state) {
			if (props.showSecond){
				props.secondStyle = this.prepareSecondStyle(props, state)
				props.secondInputStyle = this.prepareSecondInputStyle(props, state)
			}
		},

		prepareSecondStyle: function(props, state) {
			return normalize(assign({}, props.defaultBoxStyle, props.defaultSecondStyle, props.secondStyle))
		},

		prepareSecondInputStyle: function(props, state) {
			return normalize(assign({}, props.defaultInputStyle, props.defaultSecondInputStyle, props.secondInputStyle))
		},

		prepareMeridianStyles: function(props, state){
			if (props.withMeridian){
				props.meridianStyle = this.prepareMeridianStyle(props, state)
				props.meridianInputStyle = this.prepareMeridianInputStyle(props, state)
			}
		},

		prepareMeridianStyle: function(props, state) {
			return normalize(assign({}, props.defaultBoxStyle, props.defaultMeridianStyle, props.meridianStyle))
		},

		prepareMeridianInputStyle: function(props, state) {
			return normalize(assign({}, props.defaultInputStyle, props.defaultMeridianInputStyle, props.meridianInputStyle))
		}
	})

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var assign = __webpack_require__(26)
	var React  = __webpack_require__(1)
	var normalize = __webpack_require__(28)

	function emptyFn() {}

	var TOOL_STYLES = {
	    true : {display: 'inline-block'},
	    false: {cursor: 'text', color: 'transparent'}
	}

	var INDEX = 0

	var DESCRIPTOR = {

	    displayName: 'ReactInputField',

	    propTypes: {
	        validate : React.PropTypes.oneOfType([
	            React.PropTypes.func,
	            React.PropTypes.bool
	        ]),
	        isEmpty  : React.PropTypes.func,
	        clearTool: React.PropTypes.bool
	    },

	    getInitialState: function(){
	        return {
	            defaultValue: this.props.defaultValue
	        }
	    },

	    getDefaultProps: function () {
	        return {
	            focusOnClick: true,
	            stopChangePropagation: true,
	            stopSelectPropagation: true,

	            defaultClearToolStyle: {
	                fontSize   : 20,
	                paddingRight: 5,
	                paddingLeft : 5,

	                alignSelf  : 'center',
	                cursor     : 'pointer',
	                userSelect : 'none',
	                boxSizing: 'border-box'
	            },
	            clearToolColor    : '#a8a8a8',
	            clearToolOverColor: '#7F7C7C',
	            defaultStyle: {
	                border    : '1px solid #a8a8a8',
	                boxSizing : 'border-box'
	                // ,
	                // height    : 30
	            },

	            defaultInnerStyle: {
	                userSelect: 'none',
	                width     : '100%',
	                display   : 'inline-flex',
	                flexFlow  : 'row',
	                alignItems: 'stretch'
	            },

	            defaultInvalidStyle: {
	                border : '1px solid rgb(248, 144, 144)'
	            },

	            defaultInputStyle: {
	                flex   : 1,
	                border : 0,
	                height : '100%',
	                padding: '6px 2px',
	                outline: 'none',
	                boxSizing: 'border-box'
	            },

	            defaultInputInvalidStyle: {

	            },

	            emptyValue: '',
	            inputClassName: '',
	            inputProps    : null,

	            clearTool: true,

	            defaultClassName: 'z-field',
	            emptyClassName  : 'z-empty-value',
	            invalidClassName: 'z-invalid',

	            toolsPosition: 'right'
	        }
	    },

	    render: function() {

	        if (this.valid === undefined){
	            this.valid = true
	        }

	        var props = this.prepareProps(this.props, this.state)

	        if (this.valid !== props.valid && typeof props.onValidityChange === 'function'){
	            setTimeout(function(){
	                props.onValidityChange(props.valid, props.value, props)
	            }, 0)
	        }

	        this.valid = props.valid

	        var children = this.renderChildren(props, this.state)

	        // delete props.value

	        var divProps = assign({}, props)
	        delete divProps.value
	        delete divProps.placeholder

	        return React.createElement("div", React.__spread({},  divProps, {"data-display-name": "react-input-field"}), 
	            React.createElement("div", {style: props.innerStyle}, 
	                children
	            )
	        )
	    },

	    renderChildren: function(props, state){
	        var field = this.renderField(props, state)
	        var tools = this.renderTools(props, state)

	        var children = [field, props.children]

	        if (props.toolsPosition == 'after' || props.toolsPosition == 'right'){
	            children.push.apply(children, tools)
	        } else {
	            children = (tools || []).concat(field)
	        }

	        if (typeof props.renderChildren == 'function'){
	            children = props.renderChildren(children)
	        }

	        return children
	    },

	    renderField: function(props) {
	        var inputProps = this.prepareInputProps(props)

	        inputProps.ref = 'input'

	        if (props.inputFactory){
	            return props.inputFactory(inputProps, props)
	        }

	        return React.createElement("input", React.__spread({},  inputProps))
	    },

	    renderTools: function(props, state) {

	        var clearTool = this.renderClearTool(props, state)
	        var result    = [clearTool]

	        if (typeof props.tools === 'function'){
	            result = props.tools(props, clearTool)
	        }

	        return result
	    },

	    renderClearTool: function(props, state) {

	        var visible

	        if (props.forceClearTool && !props.clearTool){
	            return
	        }

	        if (!props.forceClearTool){
	            if (!props.clearTool || props.readOnly || props.disabled){
	                return
	            }
	        }

	        visible         = props.forceClearTool?
	                            true:
	                            !this.isEmpty(props)

	        var visibilityStyle = TOOL_STYLES[visible]
	        var style           = assign({}, visibilityStyle, this.prepareClearToolStyle(props, state))

	        if (!visible){
	            assign(style, visibilityStyle)
	        }

	        return React.createElement("div", {
	            key: "clearTool", 
	            className: "z-clear-tool", 
	            onClick: this.handleClearToolClick, 
	            onMouseDown: this.handleClearToolMouseDown, 
	            onMouseOver: this.handleClearToolOver, 
	            onMouseOut: this.handleClearToolOut, 
	            style: style
	        }, "✖")
	    },

	    handleClearToolMouseDown: function(event) {
	        event.preventDefault()
	    },

	    handleClearToolOver: function(){
	        this.setState({
	            clearToolOver: true
	        })
	    },

	    handleClearToolOut: function(){
	        this.setState({
	            clearToolOver: false
	        })
	    },

	    isEmpty: function(props) {
	        var emptyValue = this.getEmptyValue(props)

	        if (typeof props.isEmpty === 'function'){
	            return props.isEmpty(props, emptyValue)
	        }

	        var value = props.value

	        if (value == null){
	            value = ''
	        }

	        return value === emptyValue
	    },

	    getEmptyValue: function(props){
	        var value = props.emptyValue

	        if (typeof value === 'function'){
	            value = value(props)
	        }

	        return value
	    },

	    isValid: function(props) {
	        var value = props.value
	        var result = true

	        if (typeof props.validate === 'function'){
	            result = props.validate(value, props) !== false
	        }

	        return result
	    },

	    getInput: function() {
	        return this.refs.input.getDOMNode()
	    },

	    focus: function(){
	        var input = this.getInput()

	        if (input && typeof input.focus === 'function'){
	            input.focus()
	        }
	    },

	    handleClick: function(event){
	        if (this.props.focusOnClick && !this.isFocused()){
	            this.focus()
	        }

	        ;(this.props.onClick || emptyFn)(event)
	    },

	    handleMouseDown: function(event) {
	        ;(this.props.onMouseDown || emptyFn)(event)
	        // event.preventDefault()
	    },

	    handleClearToolClick: function(event) {
	        var emptyValue = this.getEmptyValue(this.props)

	        this.notify(emptyValue, event)

	        ;(this.props.onClearToolClick || emptyFn)(emptyValue, event)
	    },

	    handleChange: function(event) {
	        this.props.stopChangePropagation && event.stopPropagation()
	        this.notify(event.target.value, event)
	    },

	    handleSelect: function(event) {
	        this.props.stopSelectPropagation && event.stopPropagation()
	        ;(this.props.onSelect || emptyFn)(event)
	    },

	    notify: function(value, event) {
	        if (this.props.value === undefined){
	            this.setState({
	                defaultValue: value
	            })
	        }
	        ;(this.props.onChange || emptyFn)(value, this.props, event)
	    },

	    //*****************//
	    // PREPARE METHODS //
	    //*****************//
	    prepareProps: function(thisProps, state) {

	        var props = {}

	        assign(props, thisProps)

	        props.value = this.prepareValue(props, state)
	        props.valid = this.isValid(props)
	        props.onClick = this.handleClick
	        props.onMouseDown = this.handleMouseDown

	        props.className  = this.prepareClassName(props)
	        props.style      = this.prepareStyle(props)
	        props.innerStyle = this.prepareInnerStyle(props)

	        return props
	    },

	    getValue: function() {
	        var value = this.props.value === undefined?
	                        this.state.defaultValue:
	                        this.props.value

	        return value
	    },

	    prepareValue: function(props, state) {
	        return this.getValue()
	    },

	    prepareClassName: function(props) {
	        var result = [props.className, props.defaultClassName]

	        if (this.isEmpty(props)){
	            result.push(props.emptyClassName)
	        }

	        if (!props.valid){
	            result.push(props.invalidClassName)
	        }

	        return result.join(' ')
	    },

	    prepareStyle: function(props) {
	        var style = assign({}, props.defaultStyle, props.style)

	        if (!props.valid){
	            assign(style, props.defaultInvalidStyle, props.invalidStyle)
	        }

	        return style
	    },

	    prepareInnerStyle: function(props) {
	        var style = assign({}, props.defaultInnerStyle, props.innerStyle)

	        return normalize(style)
	    },

	    prepareInputProps: function(props) {

	        var inputProps = {
	            className: props.inputClassName
	        }

	        assign(inputProps, props.defaultInputProps, props.inputProps)

	        inputProps.key         = 'field'
	        inputProps.value       = props.value
	        inputProps.placeholder = props.placeholder
	        inputProps.onChange    = this.handleChange
	        inputProps.onSelect    = this.handleSelect
	        inputProps.style       = this.prepareInputStyle(props)
	        inputProps.onFocus     = this.handleFocus
	        inputProps.onBlur      = this.handleBlur
	        inputProps.name        = props.name
	        inputProps.disabled    = props.disabled
	        inputProps.readOnly    = props.readOnly

	        return inputProps
	    },

	    handleFocus: function(){
	        this._focused = true
	    },

	    handleBlur: function(){
	        this._focused = false
	    },

	    isFocused: function(){
	        return !!this._focused
	    },

	    prepareInputStyle: function(props) {
	        var inputStyle = props.inputProps?
	                            props.inputProps.style:
	                            null

	        var style = assign({}, props.defaultInputStyle, props.inputStyle, inputStyle)

	        if (!props.valid){
	            assign(style, props.defaultInputInvalidStyle, props.inputInvalidStyle)
	        }

	        return normalize(style)
	    },

	    prepareClearToolStyle: function(props, state) {
	        var defaultClearToolOverStyle
	        var clearToolOverStyle
	        var clearToolColor

	        if (state && state.clearToolOver){
	            defaultClearToolOverStyle = props.defaultClearToolOverStyle
	            clearToolOverStyle = props.clearToolOverStyle
	        }

	        if (props.clearToolColor){
	            clearToolColor = {
	                color: props.clearToolColor
	            }
	            if (state && state.clearToolOver && props.clearToolOverColor){
	                clearToolColor = {
	                    color: props.clearToolOverColor
	                }
	            }
	        }

	        var style = assign(
	                        {},
	                        props.defaultClearToolStyle,
	                        defaultClearToolOverStyle,
	                        clearToolColor,
	                        props.clearToolStyle,
	                        clearToolOverStyle
	                    )

	        return style
	    }
	}

	var ReactClass = React.createClass(DESCRIPTOR)

	ReactClass.descriptor = DESCRIPTOR

	module.exports = ReactClass

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(2)
	var defaults = __webpack_require__(11)

	function trim(str){
		return str.trim()
	}

	var validHour     = __webpack_require__(12)
	var validMinute   = __webpack_require__(13)
	var validSecond   = __webpack_require__(14)
	var validMeridian = __webpack_require__(15)

	function getHour(value, config){
		if (validHour(value, config)){
			return value * 1
		}
	}

	function getMinute(value){
		if (validMinute(value)){
			return value * 1
		}
	}

	function getSecond(value){
		if (validSecond(value)){
			return value * 1
		}
	}

	function getMeridian(value){
		if (validMeridian(value)){
			return value
		}
	}

	function hasMeridian(str){
		var parts = str.split(' ')

		return parts.length > 1
	}

	var GET_MAP = {
		hour    : getHour,
		minute  : getMinute,
		second  : getSecond,
		meridian: getMeridian
	}

	function get(name){
		return GET_MAP[name]
	}

	function parseLast(str, partName, config){
		var withMeridian = config && config.meridian

		var parts = str.split(' ').map(trim)
		var getFn = get(partName)
		var result = {
			invalid: []
		}

		var partValue
		var meridian

		if (isValidPart(partName, parts[0], config)){
			if (getFn){
				partValue = getFn(parts[0], config)
			}
		} else {
			result.invalid.push({
				name: partName,
				value: parts[0]
			})
		}

		if (withMeridian){
			meridian = getMeridian(parts[1])

			if (meridian === undefined){
				result.invalid.push({
					name: 'meridian',
					value: parts[1]
				})
			}
		}

		if (meridian !== undefined){
			result.meridian = meridian
		}
		if (partValue !== undefined){
			result[partName] = partValue
		}

		return result
	}

	function PARSE(time, config){

		config = assign({}, defaults, config)

		var parts        = time.split(config.separator).map(trim)
		var withMeridian = hasMeridian(parts[parts.length - 1])

		config.meridian = withMeridian

		var invalids = []
		var result = {}
		var hour
		var minute

		if (parts.length > 3){
			return
		}

		if (parts.length == 1){
			//hh am
			assign(result, parseLast(parts[0], 'hour', config))
		}
		if (parts.length == 2){
			//hh:mm am
			hour = getHour(parts[0], config)
			if (hour === undefined){
				invalids.push({
					name: 'hour',
					value: parts[0]
				})
			}
			assign(result, parseLast(parts[1], 'minute', config))
		}
		if (parts.length == 3){
			//hh:mm:ss am
			hour   = getHour(parts[0], config)
			minute = getMinute(parts[1])

			if (hour === undefined){
				invalids.push({
					name: 'hour',
					value: parts[0]
				})
			}

			if (minute === undefined){
				invalids.push({
					name: 'minute',
					value: parts[1]
				})
			}

			assign(result, parseLast(parts[2], 'second', config))
		}

		if (result.invalid){
			invalids.push.apply(invalids, result.invalid)
			result.invalid = invalids
		}

		if (hour !== undefined){
			result.hour = hour
		}

		if (minute !== undefined){
			result.minute = minute
		}

		if (!result.invalid.length){
			delete result.invalid
		}

		return result
	}

	var isValidPart = __webpack_require__(16)
	var isValidTime = __webpack_require__(17)
	var updateTime  = __webpack_require__(18)
	var adjustOverflow  = __webpack_require__(19)

	PARSE.isValidPart    = isValidPart
	PARSE.isValidTime    = isValidTime
	PARSE.updateTime     = updateTime
	PARSE.adjustOverflow = adjustOverflow

	module.exports = PARSE

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function toUpperFirst(str){
	    if (!str){
	        return str
	    }

	    return str.charAt(0).toUpperCase() + str.substring(1)
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Region = __webpack_require__(32)
	var assign = __webpack_require__(22)
	var selectParent = __webpack_require__(33)

	module.exports = function(props, pickerProps, constrainTo){
	    var constrainRegion

	    if (constrainTo === true){
	        constrainRegion = Region.getDocRegion()
	    }

	    if (!constrainRegion && typeof constrainTo === 'string'){
	        var parent = selectParent(constrainTo, this.getDOMNode())
	        constrainRegion = Region.from(parent)
	    }

	    if (!constrainRegion && typeof constrainTo === 'function'){
	        constrainRegion = Region.from(constrainTo())
	    }

	    var field = this.refs.field

	    if (!field){
	        return
	    }

	    var fieldRegion = Region.from(field.getDOMNode())

	    if (typeof props.constrainPicker === 'function'){
	        props.constrainPicker(pickerProps, fieldRegion, constrainRegion)
	        return
	    }

	    if (!constrainRegion || !(constrainRegion instanceof Region)){
	        return
	    }

	    var topAvailable    = fieldRegion.top - constrainRegion.top
	    var bottomAvailable = constrainRegion.bottom - fieldRegion.bottom

	    var max = bottomAvailable

	    var style = pickerProps.style

	    if (topAvailable > bottomAvailable){
			style.bottom = '100%'
	        delete style.top
	    }
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
		separator: ':',
		twoDigits: true
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validNumber = __webpack_require__(29)

	module.exports = function validHour(value, config){
		var meridian = config && config.meridian

		if (validNumber(value, config)){
			value *= 1

			if (meridian){
				return 0 <= value && value <= 12
			}

			return 0 <= value && value < 24
		}

		return false
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validNumber = __webpack_require__(29)

	module.exports = function validMinute(value, config){

		if (validNumber(value, config)){
			value *= 1

			return 0 <= value && value < 60
		}

		return false
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validMinute = __webpack_require__(13)

	module.exports = function validSecond(value, config){
		return validMinute(value, config)
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function validMeridian(value){
		if (!value){
			return false
		}

		value = value.toUpperCase()

		return value == 'AM' || value == 'PM'
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validHour     = __webpack_require__(12)
	var validMinute   = __webpack_require__(13)
	var validSecond   = __webpack_require__(14)
	var validMeridian = __webpack_require__(15)

	var VALIDATION_MAP = {
		hour    : validHour,
		minute  : validMinute,
		second  : validSecond,
		meridian: validMeridian
	}

	/**
	 * VALIDATES TIME PART [name, value] eg ['hour', '15']
	 *
	 * Returns whether the given value is valid for the given time part.
	 *
	 * EG:
	 * 	name: 'hour', value: 15 => true
	 * 	name: 'hour', value: '07' => true
	 *  name: 'hour', value: 15, config={meridian: true} => false
	 *
	 *  name: 'minute', value: '05' => true
	 *
	 *  name: 'second', value: 55 => true
	 *  name: 'second', value: 5 => true
	 *  name: 'second', value: '5' => false (string without two digits)
	 *  name: 'second', value: '5', {twoDigits: false} => true

	 *  name: 'meridian', value: 'PM' => true
	 *  name: 'meridian', value: 'am' => true
	 *  name: 'meridian', value: 'apm' => false
	 *
	 * @param {String} name
	 * @param {Number/String} value
	 * @param {Object} config
	 * @param {Boolean} config.meridian
	 * @param {Boolean} config.twoDigits
	 *
	 * @return {Boolean}
	 */
	module.exports = function isValidPart(name, value, config){
		var fn = VALIDATION_MAP[name]

		return !!(fn && fn(value, config))
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isValidPart = __webpack_require__(16)
	var assign = __webpack_require__(2)

	module.exports = function isValidTime(time, config){

		var validSecond = time.second === undefined || isValidPart('second', time.second, config)

		var validMinute = validSecond && (time.minute === undefined || isValidPart('minute', time.minute, config))
		var validHour   = validMinute && isValidPart('hour', time.hour, assign({meridian: time.meridian}, config))

		var meridian      = time.meridian
		var validMeridian = validHour && (meridian? isValidPart('meridian', meridian, config): true)

		var valid = validMeridian
		if (valid && meridian){
			//for 24 hour clock, we're done
			//BUT there is a special case when we have meridian specified:
			//12:00:00 am/pm is ok, but >= 12:00:01 is not
			var hour = time.hour * 1
			if (hour === 12){
				valid = time.minute * 1 === 0 && time.second * 1 === 0
			}
		}

		return valid
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign      = __webpack_require__(2)
	var isValidNumber = __webpack_require__(29)
	var isValidPart = __webpack_require__(16)
	var isValidTime = __webpack_require__(17)
	var adjustOverflow = __webpack_require__(19)

	var clamp = __webpack_require__(30)

	/**
	 * @param {Object} time
	 * @param {String} name
	 * @param {String/Number} value
	 * @param {Object} [config]
	 * @param {Boolean} [config.clamp=false]
	 * @param {Boolean} [config.overflow=true]
	 * @param {Boolean} [config.rejectInvalid=false]
	 *
	 * @return {Object} time
	 */

	module.exports = function update(time, name, value, config){

		var initial = time
		var touched
		var validNumber = isValidNumber(value, config)
		var validPart   = isValidPart(name, value, config)

		time   = assign({}, time)
		config = config || {}

		if (validNumber){
			value *= 1
		}

		if (validPart || validNumber){
			time[name] = value
		}

		if (!isValidTime(time, config) && config.clamp){
			time[name] = clamp(time, name, time[name])
		}

		if (!isValidTime(time, config)){

			if (config.rejectInvalid){
				return initial
			}

			if (config.overflow !== false){
				time = adjustOverflow(time, config)
			}
		}

		return time
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * See documentation below
	 */

	var defaults = {}

	var MAP = {
		hour: overflowHour,
		minute: overflowMinute,
		second: overflowSecond
	}

	function overflowHour(values, name, value, config){
		if (values.hour === undefined){
			return
		}

		var overflowHourToMeridian = !config || config.overflowHourToMeridian !== false
		var meridian = values.meridian || config && config.meridian
		var limit    = meridian? 12: 23
		var plusOne  = meridian? 12: 24

		var extra = 0

		if (value > limit){
			extra += Math.floor(value / limit)
			value = value % plusOne
		}
		if (value < 0){
			extra = Math.ceil(-value / limit)
			value = plusOne + value
		}

		if (meridian && value === limit && (values.minute > 0 || values.second > 0)){
			extra += 1
			value = 0
		}

		if (meridian && extra % 2 == 1 && overflowHourToMeridian){
			if (typeof meridian == 'string'){
				meridian = meridian.toUpperCase()
			}

			//change meridian
			values.meridian = meridian == 'PM'? 'AM': 'PM'
		}

		values.hour = value
	}

	function overflowMinuteOrSecond(values, name, value, config, nextName){

		if (values[name] === undefined){
			return
		}

		var extra = 0

		if (value > 59){
			extra += Math.floor(value / 60)
			value = value % 60
		}
		if (value < 0){
			extra -= Math.ceil(-value / 60)
			value = 60 + value
		}

		values[name || 'minute'] = value

		if (extra){
			values[nextName || 'hour'] += extra
		}
	}

	function overflowMinute(values, name, value, config){
		overflowMinuteOrSecond(values, 'minute', values.minute, config) // minute -> hour
		overflowHour(values, 'hour', values.hour, config) //overflow hour
	}

	function overflowSecond(values, name, value, config){
		overflowMinuteOrSecond(values, 'second', values.second, config, 'minute') //second -> minute
		overflowMinute(values, 'minute', values.minute, config) //minute -> hour
	}

	/**
	 *
	 * This method receives an object with hour, minute and second properties.
	 * It adjusts any overflowing values and moves the overflow to the next value:
	 *
	 * EG: extra seconds go to minute; extra minutes go to hour;
	 * hours beyond 23 (in 24 hour format, so without values.meridian specified) restart from 0,
	 * or beyond 12:00:00 (when meridian is specified) restart from 0
	 *
	 * @param  {Object} values [description]
	 * @param  {Number} values.hour
	 * @param  {Number} values.minute
	 * @param  {Number} values.second
	 * @param  {Number} values.meridian
	 *
	 * @param  {String} [name="second"]   "hour"|"minute"|"second"
	 * @param  {Number} [value]
	 * @param  {Object} config
	 *
	 * Both {name} and {value} are optional. If not given, they default to "second" and value for second.
	 *
	 * @return {Object}
	 */
	module.exports = function(values, name, value, config){

		if (arguments.length == 2){
			config = name
			name   = 'second'
			value  = values[name]
		}

		MAP[name](values, name, value, config || defaults)

		return values
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var update = __webpack_require__(31).updateTime

	module.exports = function(time, name, value, config){
		time = update(time, name, value, config)

		return time
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(str){
		return str?
				str.charAt(0).toUpperCase() + str.slice(1):
				''
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = 'ontouchstart' in global || (global.DocumentTouch && document instanceof DocumentTouch)
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(24)?
		{
			onMouseDown: 'onTouchStart',
			onMouseUp  : 'onTouchEnd',
			onMouseMove: 'onTouchMove'
		}:
		{
			onMouseDown: 'onMouseDown',
			onMouseUp  : 'onMouseUp',
			onMouseMove: 'onMouseMove'
		}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn      = __webpack_require__(34)
	var getPrefixed = __webpack_require__(35)

	var map      = __webpack_require__(36)
	var plugable = __webpack_require__(37)

	function plugins(key, value){

		var result = {
			key  : key,
			value: value
		}

		;(RESULT.plugins || []).forEach(function(fn){

			var tmp = map(function(res){
				return fn(key, value, res)
			}, result)

			if (tmp){
				result = tmp
			}
		})

		return result
	}

	function normalize(key, value){

		var result = plugins(key, value)

		return map(function(result){
			return {
				key  : getPrefixed(result.key, result.value),
				value: result.value
			}
		}, result)

		return result
	}

	var RESULT = function(style){
		var k
		var item
		var result = {}

		for (k in style) if (hasOwn(style, k)){
			item = normalize(k, style[k])

			if (!item){
				continue
			}

			map(function(item){
				result[item.key] = item.value
			}, item)
		}

		return result
	}

	module.exports = plugable(RESULT)

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn      = __webpack_require__(38)
	var getPrefixed = __webpack_require__(39)

	var map      = __webpack_require__(40)
	var plugable = __webpack_require__(41)

	function plugins(key, value){

		var result = {
			key  : key,
			value: value
		}

		;(RESULT.plugins || []).forEach(function(fn){

			var tmp = map(function(res){
				return fn(key, value, res)
			}, result)

			if (tmp){
				result = tmp
			}
		})

		return result
	}

	function normalize(key, value){

		var result = plugins(key, value)

		return map(function(result){
			return {
				key  : getPrefixed(result.key, result.value),
				value: result.value
			}
		}, result)

		return result
	}

	var RESULT = function(style){
		var k
		var item
		var result = {}

		for (k in style) if (hasOwn(style, k)){
			item = normalize(k, style[k])

			if (!item){
				continue
			}

			map(function(item){
				result[item.key] = item.value
			}, item)
		}

		return result
	}

	module.exports = plugable(RESULT)

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign   = __webpack_require__(2)
	var defaults = __webpack_require__(11)

	module.exports = function validNumber(n, config){
		var valid = !isNaN(n * 1)

		if (config){
			config = assign({}, defaults, config)
		} else {
			config = defaults
		}

		if (valid && typeof n == 'string' && config.twoDigits){
			valid = n.length == 2
		}

		if (valid){
			n = n * 1
			valid = parseInt(n) === n
		}

		return valid
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function clamp(time, name, value){
		if (name == 'meridian'){
			return value
		}
		if (name == 'hour'){
			var limit = 24

			if (time.meridian){
				limit = (time.hour || time.minute)? 11: 12
			}

			return value < 0?
					0:
					value > limit?
						limit:
						value
		}

		return value < 0?
					0:
					value > 59?
						59:
						value
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(54)
	var defaults = __webpack_require__(45)

	function trim(str){
		return str.trim()
	}

	var validHour     = __webpack_require__(46)
	var validMinute   = __webpack_require__(47)
	var validSecond   = __webpack_require__(48)
	var validMeridian = __webpack_require__(49)

	function getHour(value, config){
		if (validHour(value, config)){
			return value * 1
		}
	}

	function getMinute(value){
		if (validMinute(value)){
			return value * 1
		}
	}

	function getSecond(value){
		if (validSecond(value)){
			return value * 1
		}
	}

	function getMeridian(value){
		if (validMeridian(value)){
			return value
		}
	}

	function hasMeridian(str){
		var parts = str.split(' ')

		return parts.length > 1
	}

	var GET_MAP = {
		hour    : getHour,
		minute  : getMinute,
		second  : getSecond,
		meridian: getMeridian
	}

	function get(name){
		return GET_MAP[name]
	}

	function parseLast(str, partName, config){
		var withMeridian = config && config.meridian

		var parts = str.split(' ').map(trim)
		var getFn = get(partName)
		var result = {
			invalid: []
		}

		var partValue
		var meridian

		if (isValidPart(partName, parts[0], config)){
			if (getFn){
				partValue = getFn(parts[0], config)
			}
		} else {
			result.invalid.push({
				name: partName,
				value: parts[0]
			})
		}

		if (withMeridian){
			meridian = getMeridian(parts[1])

			if (meridian === undefined){
				result.invalid.push({
					name: 'meridian',
					value: parts[1]
				})
			}
		}

		if (meridian !== undefined){
			result.meridian = meridian
		}
		if (partValue !== undefined){
			result[partName] = partValue
		}

		return result
	}

	function PARSE(time, config){

		config = assign({}, defaults, config)

		var parts        = time.split(config.separator).map(trim)
		var withMeridian = hasMeridian(parts[parts.length - 1])

		config.meridian = withMeridian

		var invalids = []
		var result = {}
		var hour
		var minute

		if (parts.length > 3){
			return
		}

		if (parts.length == 1){
			//hh am
			assign(result, parseLast(parts[0], 'hour', config))
		}
		if (parts.length == 2){
			//hh:mm am
			hour = getHour(parts[0], config)
			if (hour === undefined){
				invalids.push({
					name: 'hour',
					value: parts[0]
				})
			}
			assign(result, parseLast(parts[1], 'minute', config))
		}
		if (parts.length == 3){
			//hh:mm:ss am
			hour   = getHour(parts[0], config)
			minute = getMinute(parts[1])

			if (hour === undefined){
				invalids.push({
					name: 'hour',
					value: parts[0]
				})
			}

			if (minute === undefined){
				invalids.push({
					name: 'minute',
					value: parts[1]
				})
			}

			assign(result, parseLast(parts[2], 'second', config))
		}

		if (result.invalid){
			invalids.push.apply(invalids, result.invalid)
			result.invalid = invalids
		}

		if (hour !== undefined){
			result.hour = hour
		}

		if (minute !== undefined){
			result.minute = minute
		}

		if (!result.invalid.length){
			delete result.invalid
		}

		return result
	}

	var isValidPart = __webpack_require__(50)
	var isValidTime = __webpack_require__(51)
	var updateTime  = __webpack_require__(52)
	var adjustOverflow  = __webpack_require__(53)

	PARSE.isValidPart    = isValidPart
	PARSE.isValidTime    = isValidTime
	PARSE.updateTime     = updateTime
	PARSE.adjustOverflow = adjustOverflow

	module.exports = PARSE

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(44)

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var curry   = __webpack_require__(42)
	var matches = __webpack_require__(43)

	module.exports = curry(function(selector, node){
	    while (node = node.parentElement){
	        if (matches.call(node, selector)){
	            return node
	        }
	    }
	})

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(obj, prop){
		return Object.prototype.hasOwnProperty.call(obj, prop)
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getStylePrefixed = __webpack_require__(55)
	var properties       = __webpack_require__(56)

	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		return getStylePrefixed(key, value)
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(fn, item){

		if (!item){
			return
		}

		if (Array.isArray(item)){
			return item.map(fn).filter(function(x){
				return !!x
			})
		} else {
			return fn(item)
		}
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getCssPrefixedValue = __webpack_require__(57)

	module.exports = function(target){
		target.plugins = target.plugins || [
			(function(){
				var values = {
					'flex':1,
					'inline-flex':1
				}

				return function(key, value){
					if (key === 'display' && value in values){
						return {
							key  : key,
							value: getCssPrefixedValue(key, value)
						}
					}
				}
			})()
		]

		target.plugin = function(fn){
			target.plugins = target.plugins || []

			target.plugins.push(fn)
		}

		return target
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(obj, prop){
		return Object.prototype.hasOwnProperty.call(obj, prop)
	}


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getStylePrefixed = __webpack_require__(59)
	var properties       = __webpack_require__(60)

	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		return getStylePrefixed(key, value)
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(fn, item){

		if (!item){
			return
		}

		if (Array.isArray(item)){
			return item.map(fn).filter(function(x){
				return !!x
			})
		} else {
			return fn(item)
		}
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getCssPrefixedValue = __webpack_require__(58)

	module.exports = function(target){
		target.plugins = target.plugins || [
			(function(){
				var values = {
					'flex':1,
					'inline-flex':1
				}

				return function(key, value){
					if (key === 'display' && value in values){
						return {
							key  : key,
							value: getCssPrefixedValue(key, value)
						}
					}
				}
			})()
		]

		target.plugin = function(fn){
			target.plugins = target.plugins || []

			target.plugins.push(fn)
		}

		return target
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function curry(fn, n){

	    if (typeof n !== 'number'){
	        n = fn.length
	    }

	    function getCurryClosure(prevArgs){

	        function curryClosure() {

	            var len  = arguments.length
	            var args = [].concat(prevArgs)

	            if (len){
	                args.push.apply(args, arguments)
	            }

	            if (args.length < n){
	                return getCurryClosure(args)
	            }

	            return fn.apply(this, args)
	        }

	        return curryClosure
	    }

	    return getCurryClosure([])
	}

	module.exports = curry

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var proto = Element.prototype

	var nativeMatches = proto.matches ||
	  proto.mozMatchesSelector ||
	  proto.msMatchesSelector ||
	  proto.oMatchesSelector ||
	  proto.webkitMatchesSelector

	module.exports = nativeMatches


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn    = __webpack_require__(75)
	var newify    = __webpack_require__(76)

	var assign      = __webpack_require__(22);
	var EventEmitter = __webpack_require__(74).EventEmitter

	var inherits = __webpack_require__(61)
	var VALIDATE = __webpack_require__(62)

	var objectToString = Object.prototype.toString

	var isObject = function(value){
	    return objectToString.apply(value) === '[object Object]'
	}

	function copyList(source, target, list){
	    if (source){
	        list.forEach(function(key){
	            target[key] = source[key]
	        })
	    }

	    return target
	}

	/**
	 * @class Region
	 *
	 * The Region is an abstraction that allows the developer to refer to rectangles on the screen,
	 * and move them around, make diffs and unions, detect intersections, compute areas, etc.
	 *
	 * ## Creating a region
	 *      var region = require('region')({
	 *          top  : 10,
	 *          left : 10,
	 *          bottom: 100,
	 *          right : 100
	 *      })
	 *      //this region is a square, 90x90, starting from (10,10) to (100,100)
	 *
	 *      var second = require('region')({ top: 10, left: 100, right: 200, bottom: 60})
	 *      var union  = region.getUnion(second)
	 *
	 *      //the "union" region is a union between "region" and "second"
	 */

	var POINT_POSITIONS = {
	        cy: 'YCenter',
	        cx: 'XCenter',
	        t : 'Top',
	        tc: 'TopCenter',
	        tl: 'TopLeft',
	        tr: 'TopRight',
	        b : 'Bottom',
	        bc: 'BottomCenter',
	        bl: 'BottomLeft',
	        br: 'BottomRight',
	        l : 'Left',
	        lc: 'LeftCenter',
	        r : 'Right',
	        rc: 'RightCenter',
	        c : 'Center'
	    }

	/**
	 * @constructor
	 *
	 * Construct a new Region.
	 *
	 * Example:
	 *
	 *      var r = new Region({ top: 10, left: 20, bottom: 100, right: 200 })
	 *
	 *      //or, the same, but with numbers (can be used with new or without)
	 *
	 *      r = Region(10, 200, 100, 20)
	 *
	 *      //or, with width and height
	 *
	 *      r = Region({ top: 10, left: 20, width: 180, height: 90})
	 *
	 * @param {Number|Object} top The top pixel position, or an object with top, left, bottom, right properties. If an object is passed,
	 * instead of having bottom and right, it can have width and height.
	 *
	 * @param {Number} right The right pixel position
	 * @param {Number} bottom The bottom pixel position
	 * @param {Number} left The left pixel position
	 *
	 * @return {Region} this
	 */
	var REGION = function(top, right, bottom, left){

	    if (!(this instanceof REGION)){
	        return newify(REGION, arguments)
	    }

	    EventEmitter.call(this)

	    if (isObject(top)){
	        copyList(top, this, ['top','right','bottom','left'])

	        if (top.bottom == null && top.height != null){
	            this.bottom = this.top + top.height
	        }
	        if (top.right == null && top.width != null){
	            this.right = this.left + top.width
	        }

	        if (top.emitChangeEvents){
	            this.emitChangeEvents = top.emitChangeEvents
	        }
	    } else {
	        this.top    = top
	        this.right  = right
	        this.bottom = bottom
	        this.left   = left
	    }

	    this[0] = this.left
	    this[1] = this.top

	    VALIDATE(this)
	}

	inherits(REGION, EventEmitter)

	assign(REGION.prototype, {

	    /**
	     * @cfg {Boolean} emitChangeEvents If this is set to true, the region
	     * will emit 'changesize' and 'changeposition' whenever the size or the position changs
	     */
	    emitChangeEvents: false,

	    /**
	     * Returns this region, or a clone of this region
	     * @param  {Boolean} [clone] If true, this method will return a clone of this region
	     * @return {Region}       This region, or a clone of this
	     */
	    getRegion: function(clone){
	        return clone?
	                    this.clone():
	                    this
	    },

	    /**
	     * Sets the properties of this region to those of the given region
	     * @param {Region/Object} reg The region or object to use for setting properties of this region
	     * @return {Region} this
	     */
	    setRegion: function(reg){

	        if (reg instanceof REGION){
	            this.set(reg.get())
	        } else {
	            this.set(reg)
	        }

	        return this
	    },

	    /**
	     * Returns true if this region is valid, false otherwise
	     *
	     * @param  {Region} region The region to check
	     * @return {Boolean}        True, if the region is valid, false otherwise.
	     * A region is valid if
	     *  * left <= right  &&
	     *  * top  <= bottom
	     */
	    validate: function(){
	        return REGION.validate(this)
	    },

	    _before: function(){
	        if (this.emitChangeEvents){
	            return copyList(this, {}, ['left','top','bottom','right'])
	        }
	    },

	    _after: function(before){
	        if (this.emitChangeEvents){

	            if(this.top != before.top || this.left != before.left) {
	                this.emitPositionChange()
	            }

	            if(this.right != before.right || this.bottom != before.bottom) {
	                this.emitSizeChange()
	            }
	        }
	    },

	    notifyPositionChange: function(){
	        this.emit('changeposition', this)
	    },

	    emitPositionChange: function(){
	        this.notifyPositionChange()
	    },

	    notifySizeChange: function(){
	        this.emit('changesize', this)
	    },

	    emitSizeChange: function(){
	        this.notifySizeChange()
	    },

	    /**
	     * Add the given amounts to each specified side. Example
	     *
	     *      region.add({
	     *          top: 50,    //add 50 px to the top side
	     *          bottom: -100    //substract 100 px from the bottom side
	     *      })
	     *
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     * @param {Number} [directions.bottom]
	     * @param {Number} [directions.right]
	     *
	     * @return {Region} this
	     */
	    add: function(directions){

	        var before = this._before()
	        var direction

	        for (direction in directions) if ( hasOwn(directions, direction) ) {
	            this[direction] += directions[direction]
	        }

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * The same as {@link #add}, but substracts the given values
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     * @param {Number} [directions.bottom]
	     * @param {Number} [directions.right]
	     *
	     * @return {Region} this
	     */
	    substract: function(directions){

	        var before = this._before()
	        var direction

	        for (direction in directions) if (hasOwn(directions, direction) ) {
	            this[direction] -= directions[direction]
	        }

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * Retrieves the size of the region.
	     * @return {Object} An object with {width, height}, corresponding to the width and height of the region
	     */
	    getSize: function(){
	        return {
	            width  : this.width,
	            height : this.height
	        }
	    },

	    /**
	     * Move the region to the given position and keeps the region width and height.
	     *
	     * @param {Object} position An object with {top, left} properties. The values in {top,left} are used to move the region by the given amounts.
	     * @param {Number} [position.left]
	     * @param {Number} [position.top]
	     *
	     * @return {Region} this
	     */
	    setPosition: function(position){
	        var width  = this.width
	        var height = this.height

	        if (position.left != undefined){
	            position.right  = position.left + width
	        }

	        if (position.top != undefined){
	            position.bottom = position.top  + height
	        }

	        return this.set(position)
	    },

	    /**
	     * Sets both the height and the width of this region to the given size.
	     *
	     * @param {Number} size The new size for the region
	     * @return {Region} this
	     */
	    setSize: function(size){
	        if (size.height != undefined && size.width != undefined){
	            return this.set({
	                right  : this.left + size.width,
	                bottom : this.top  + size.height
	            })
	        }

	        if (size.width != undefined){
	            this.setWidth(size.width)
	        }

	        if (size.height != undefined){
	            this.setHeight(size.height)
	        }

	        return this
	    },



	    /**
	     * @chainable
	     *
	     * Sets the width of this region
	     * @param {Number} width The new width for this region
	     * @return {Region} this
	     */
	    setWidth: function(width){
	        return this.set({
	            right: this.left + width
	        })
	    },

	    /**
	     * @chainable
	     *
	     * Sets the height of this region
	     * @param {Number} height The new height for this region
	     * @return {Region} this
	     */
	    setHeight: function(height){
	        return this.set({
	            bottom: this.top + height
	        })
	    },

	    /**
	     * Sets the given properties on this region
	     *
	     * @param {Object} directions an object containing top, left, and EITHER bottom, right OR width, height
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     *
	     * @param {Number} [directions.bottom]
	     * @param {Number} [directions.right]
	     *
	     * @param {Number} [directions.width]
	     * @param {Number} [directions.height]
	     *
	     *
	     * @return {Region} this
	     */
	    set: function(directions){
	        var before = this._before()

	        copyList(directions, this, ['left','top','bottom','right'])

	        if (directions.bottom == null && directions.height != null){
	            this.bottom = this.top + directions.height
	        }
	        if (directions.right == null && directions.width != null){
	            this.right = this.left + directions.width
	        }

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * Retrieves the given property from this region. If no property is given, return an object
	     * with {left, top, right, bottom}
	     *
	     * @param {String} [dir] the property to retrieve from this region
	     * @return {Number/Object}
	     */
	    get: function(dir){
	        return dir? this[dir]:
	                    copyList(this, {}, ['left','right','top','bottom'])
	    },

	    /**
	     * Shifts this region to either top, or left or both.
	     * Shift is similar to {@link #add} by the fact that it adds the given dimensions to top/left sides, but also adds the given dimensions
	     * to bottom and right
	     *
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     *
	     * @return {Region} this
	     */
	    shift: function(directions){

	        var before = this._before()

	        if (directions.top){
	            this.top    += directions.top
	            this.bottom += directions.top
	        }

	        if (directions.left){
	            this.left  += directions.left
	            this.right += directions.left
	        }

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * Same as {@link #shift}, but substracts the given values
	     * @chainable
	     *
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     *
	     * @return {Region} this
	     */
	    unshift: function(directions){

	        if (directions.top){
	            directions.top *= -1
	        }

	        if (directions.left){
	            directions.left *= -1
	        }

	        return this.shift(directions)
	    },

	    /**
	     * Compare this region and the given region. Return true if they have all the same size and position
	     * @param  {Region} region The region to compare with
	     * @return {Boolean}       True if this and region have same size and position
	     */
	    equals: function(region){
	        return this.equalsPosition(region) && this.equalsSize(region)
	    },

	    /**
	     * Returns true if this region has the same bottom,right properties as the given region
	     * @param  {Region/Object} size The region to compare against
	     * @return {Boolean}       true if this region is the same size as the given size
	     */
	    equalsSize: function(size){
	        var isInstance = size instanceof REGION

	        var s = {
	            width: size.width == null && isInstance?
	                    size.getWidth():
	                    size.width,

	            height: size.height == null && isInstance?
	                    size.getHeight():
	                    size.height
	        }
	        return this.getWidth() == s.width && this.getHeight() == s.height
	    },

	    /**
	     * Returns true if this region has the same top,left properties as the given region
	     * @param  {Region} region The region to compare against
	     * @return {Boolean}       true if this.top == region.top and this.left == region.left
	     */
	    equalsPosition: function(region){
	        return this.top == region.top && this.left == region.left
	    },

	    /**
	     * Adds the given ammount to the left side of this region
	     * @param {Number} left The ammount to add
	     * @return {Region} this
	     */
	    addLeft: function(left){
	        var before = this._before()

	        this.left = this[0] = this.left + left

	        this._after(before)

	        return this
	    },

	    /**
	     * Adds the given ammount to the top side of this region
	     * @param {Number} top The ammount to add
	     * @return {Region} this
	     */
	    addTop: function(top){
	        var before = this._before()

	        this.top = this[1] = this.top + top

	        this._after(before)

	        return this
	    },

	    /**
	     * Adds the given ammount to the bottom side of this region
	     * @param {Number} bottom The ammount to add
	     * @return {Region} this
	     */
	    addBottom: function(bottom){
	        var before = this._before()

	        this.bottom += bottom

	        this._after(before)

	        return this
	    },

	    /**
	     * Adds the given ammount to the right side of this region
	     * @param {Number} right The ammount to add
	     * @return {Region} this
	     */
	    addRight: function(right){
	        var before = this._before()

	        this.right += right

	        this._after(before)

	        return this
	    },

	    /**
	     * Minimize the top side.
	     * @return {Region} this
	     */
	    minTop: function(){
	        return this.expand({top: 1})
	    },
	    /**
	     * Minimize the bottom side.
	     * @return {Region} this
	     */
	    maxBottom: function(){
	        return this.expand({bottom: 1})
	    },
	    /**
	     * Minimize the left side.
	     * @return {Region} this
	     */
	    minLeft: function(){
	        return this.expand({left: 1})
	    },
	    /**
	     * Maximize the right side.
	     * @return {Region} this
	     */
	    maxRight: function(){
	        return this.expand({right: 1})
	    },

	    /**
	     * Expands this region to the dimensions of the given region, or the document region, if no region is expanded.
	     * But only expand the given sides (any of the four can be expanded).
	     *
	     * @param {Object} directions
	     * @param {Boolean} [directions.top]
	     * @param {Boolean} [directions.bottom]
	     * @param {Boolean} [directions.left]
	     * @param {Boolean} [directions.right]
	     *
	     * @param {Region} [region] the region to expand to, defaults to the document region
	     * @return {Region} this region
	     */
	    expand: function(directions, region){
	        var docRegion = region || REGION.getDocRegion()
	        var list      = []
	        var direction
	        var before = this._before()

	        for (direction in directions) if ( hasOwn(directions, direction) ) {
	            list.push(direction)
	        }

	        copyList(docRegion, this, list)

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * Returns a clone of this region
	     * @return {Region} A new region, with the same position and dimension as this region
	     */
	    clone: function(){
	        return new REGION({
	                    top    : this.top,
	                    left   : this.left,
	                    right  : this.right,
	                    bottom : this.bottom
	                })
	    },

	    /**
	     * Returns true if this region contains the given point
	     * @param {Number/Object} x the x coordinate of the point
	     * @param {Number} [y] the y coordinate of the point
	     *
	     * @return {Boolean} true if this region constains the given point, false otherwise
	     */
	    containsPoint: function(x, y){
	        if (arguments.length == 1){
	            y = x.y
	            x = x.x
	        }

	        return this.left <= x  &&
	               x <= this.right &&
	               this.top <= y   &&
	               y <= this.bottom
	    },

	    /**
	     *
	     * @param region
	     *
	     * @return {Boolean} true if this region contains the given region, false otherwise
	     */
	    containsRegion: function(region){
	        return this.containsPoint(region.left, region.top)    &&
	               this.containsPoint(region.right, region.bottom)
	    },

	    /**
	     * Returns an object with the difference for {top, bottom} positions betwen this and the given region,
	     *
	     * See {@link #diff}
	     * @param  {Region} region The region to use for diff
	     * @return {Object}        {top,bottom}
	     */
	    diffHeight: function(region){
	        return this.diff(region, {top: true, bottom: true})
	    },

	    /**
	     * Returns an object with the difference for {left, right} positions betwen this and the given region,
	     *
	     * See {@link #diff}
	     * @param  {Region} region The region to use for diff
	     * @return {Object}        {left,right}
	     */
	    diffWidth: function(region){
	        return this.diff(region, {left: true, right: true})
	    },

	    /**
	     * Returns an object with the difference in sizes for the given directions, between this and region
	     *
	     * @param  {Region} region     The region to use for diff
	     * @param  {Object} directions An object with the directions to diff. Can have any of the following keys:
	     *  * left
	     *  * right
	     *  * top
	     *  * bottom
	     *
	     * @return {Object} and object with the same keys as the directions object, but the values being the
	     * differences between this region and the given region
	     */
	    diff: function(region, directions){
	        var result = {}
	        var dirName

	        for (dirName in directions) if ( hasOwn(directions, dirName) ) {
	            result[dirName] = this[dirName] - region[dirName]
	        }

	        return result
	    },

	    /**
	     * Returns the position, in {left,top} properties, of this region
	     *
	     * @return {Object} {left,top}
	     */
	    getPosition: function(){
	        return {
	            left: this.left,
	            top : this.top
	        }
	    },

	    /**
	     * Returns the point at the given position from this region.
	     *
	     * @param {String} position Any of:
	     *
	     *  * 'cx' - See {@link #getPointXCenter}
	     *  * 'cy' - See {@link #getPointYCenter}
	     *  * 'b'  - See {@link #getPointBottom}
	     *  * 'bc' - See {@link #getPointBottomCenter}
	     *  * 'l'  - See {@link #getPointLeft}F
	     *  * 'lc' - See {@link #getPointLeftCenter}
	     *  * 't'  - See {@link #getPointTop}
	     *  * 'tc' - See {@link #getPointTopCenter}
	     *  * 'r'  - See {@link #getPointRight}
	     *  * 'rc' - See {@link #getPointRightCenter}
	     *  * 'c'  - See {@link #getPointCenter}
	     *  * 'tl' - See {@link #getPointTopLeft}
	     *  * 'bl' - See {@link #getPointBottomLeft}
	     *  * 'br' - See {@link #getPointBottomRight}
	     *  * 'tr' - See {@link #getPointTopRight}
	     *
	     * @param {Boolean} asLeftTop
	     *
	     * @return {Object} either an object with {x,y} or {left,top} if asLeftTop is true
	     */
	    getPoint: function(position, asLeftTop){

	        //<debug>
	        if (!POINT_POSITIONS[position]) {
	            console.warn('The position ', position, ' could not be found! Available options are tl, bl, tr, br, l, r, t, b.');
	        }
	        //</debug>

	        var method = 'getPoint' + POINT_POSITIONS[position],
	            result = this[method]()

	        if (asLeftTop){
	            return {
	                left : result.x,
	                top  : result.y
	            }
	        }

	        return result
	    },

	    /**
	     * Returns a point with x = null and y being the middle of the left region segment
	     * @return {Object} {x,y}
	     */
	    getPointYCenter: function(){
	        return { x: null, y: this.top + this.getHeight() / 2 }
	    },

	    /**
	     * Returns a point with y = null and x being the middle of the top region segment
	     * @return {Object} {x,y}
	     */
	    getPointXCenter: function(){
	        return { x: this.left + this.getWidth() / 2, y: null }
	    },

	    /**
	     * Returns a point with x = null and y the region top position on the y axis
	     * @return {Object} {x,y}
	     */
	    getPointTop: function(){
	        return { x: null, y: this.top }
	    },

	    /**
	     * Returns a point that is the middle point of the region top segment
	     * @return {Object} {x,y}
	     */
	    getPointTopCenter: function(){
	        return { x: this.left + this.getWidth() / 2, y: this.top }
	    },

	    /**
	     * Returns a point that is the top-left point of the region
	     * @return {Object} {x,y}
	     */
	    getPointTopLeft: function(){
	        return { x: this.left, y: this.top}
	    },

	    /**
	     * Returns a point that is the top-right point of the region
	     * @return {Object} {x,y}
	     */
	    getPointTopRight: function(){
	        return { x: this.right, y: this.top}
	    },

	    /**
	     * Returns a point with x = null and y the region bottom position on the y axis
	     * @return {Object} {x,y}
	     */
	    getPointBottom: function(){
	        return { x: null, y: this.bottom }
	    },

	    /**
	     * Returns a point that is the middle point of the region bottom segment
	     * @return {Object} {x,y}
	     */
	    getPointBottomCenter: function(){
	        return { x: this.left + this.getWidth() / 2, y: this.bottom }
	    },

	    /**
	     * Returns a point that is the bottom-left point of the region
	     * @return {Object} {x,y}
	     */
	    getPointBottomLeft: function(){
	        return { x: this.left, y: this.bottom}
	    },

	    /**
	     * Returns a point that is the bottom-right point of the region
	     * @return {Object} {x,y}
	     */
	    getPointBottomRight: function(){
	        return { x: this.right, y: this.bottom}
	    },

	    /**
	     * Returns a point with y = null and x the region left position on the x axis
	     * @return {Object} {x,y}
	     */
	    getPointLeft: function(){
	        return { x: this.left, y: null }
	    },

	    /**
	     * Returns a point that is the middle point of the region left segment
	     * @return {Object} {x,y}
	     */
	    getPointLeftCenter: function(){
	        return { x: this.left, y: this.top + this.getHeight() / 2 }
	    },

	    /**
	     * Returns a point with y = null and x the region right position on the x axis
	     * @return {Object} {x,y}
	     */
	    getPointRight: function(){
	        return { x: this.right, y: null }
	    },

	    /**
	     * Returns a point that is the middle point of the region right segment
	     * @return {Object} {x,y}
	     */
	    getPointRightCenter: function(){
	        return { x: this.right, y: this.top + this.getHeight() / 2 }
	    },

	    /**
	     * Returns a point that is the center of the region
	     * @return {Object} {x,y}
	     */
	    getPointCenter: function(){
	        return { x: this.left + this.getWidth() / 2, y: this.top + this.getHeight() / 2 }
	    },

	    /**
	     * @return {Number} returns the height of the region
	     */
	    getHeight: function(){
	        return this.bottom - this.top
	    },

	    /**
	     * @return {Number} returns the width of the region
	     */
	    getWidth: function(){
	        return this.right - this.left
	    },

	    /**
	     * @return {Number} returns the top property of the region
	     */
	    getTop: function(){
	        return this.top
	    },

	    /**
	     * @return {Number} returns the left property of the region
	     */
	    getLeft: function(){
	        return this.left
	    },

	    /**
	     * @return {Number} returns the bottom property of the region
	     */
	    getBottom: function(){
	        return this.bottom
	    },

	    /**
	     * @return {Number} returns the right property of the region
	     */
	    getRight: function(){
	        return this.right
	    },

	    /**
	     * Returns the area of the region
	     * @return {Number} the computed area
	     */
	    getArea: function(){
	        return this.getWidth() * this.getHeight()
	    },

	    constrainTo: function(contrain){
	        var intersect = this.getIntersection(contrain)
	        var shift

	        if (!intersect || !intersect.equals(this)){

	            var contrainWidth  = contrain.getWidth(),
	                contrainHeight = contrain.getHeight()

	            if (this.getWidth() > contrainWidth){
	                this.left = contrain.left
	                this.setWidth(contrainWidth)
	            }

	            if (this.getHeight() > contrainHeight){
	                this.top = contrain.top
	                this.setHeight(contrainHeight)
	            }

	            shift = {}

	            if (this.right > contrain.right){
	                shift.left = contrain.right - this.right
	            }

	            if (this.bottom > contrain.bottom){
	                shift.top = contrain.bottom - this.bottom
	            }

	            if (this.left < contrain.left){
	                shift.left = contrain.left - this.left
	            }

	            if (this.top < contrain.top){
	                shift.top = contrain.top - this.top
	            }

	            this.shift(shift)

	            return true
	        }

	        return false
	    },

	    __IS_REGION: true

	    /**
	     * @property {Number} top
	     */

	    /**
	     * @property {Number} right
	     */

	    /**
	     * @property {Number} bottom
	     */

	    /**
	     * @property {Number} left
	     */

	    /**
	     * @property {Number} [0] the top property
	     */

	    /**
	     * @property {Number} [1] the left property
	     */

	    /**
	     * @method getIntersection
	     * Returns a region that is the intersection of this region and the given region
	     * @param  {Region} region The region to intersect with
	     * @return {Region}        The intersection region
	     */

	    /**
	     * @method getUnion
	     * Returns a region that is the union of this region with the given region
	     * @param  {Region} region  The region to make union with
	     * @return {Region}        The union region. The smallest region that contains both this and the given region.
	     */

	})

	Object.defineProperties(REGION.prototype, {
	    width: {
	        get: function(){
	            return this.getWidth()
	        },
	        set: function(width){
	            return this.setWidth(width)
	        }
	    },
	    height: {
	        get: function(){
	            return this.getHeight()
	        },
	        set: function(height){
	            return this.setHeight(height)
	        }
	    }
	})

	__webpack_require__(63)(REGION)

	module.exports = REGION

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
		separator: ':',
		twoDigits: true
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validNumber = __webpack_require__(64)

	module.exports = function validHour(value, config){
		var meridian = config && config.meridian

		if (validNumber(value, config)){
			value *= 1

			if (meridian){
				return 0 <= value && value <= 12
			}

			return 0 <= value && value < 24
		}

		return false
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validNumber = __webpack_require__(64)

	module.exports = function validMinute(value, config){

		if (validNumber(value, config)){
			value *= 1

			return 0 <= value && value < 60
		}

		return false
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validMinute = __webpack_require__(47)

	module.exports = function validSecond(value, config){
		return validMinute(value, config)
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function validMeridian(value){
		if (!value){
			return false
		}

		value = value.toUpperCase()

		return value == 'AM' || value == 'PM'
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validHour     = __webpack_require__(46)
	var validMinute   = __webpack_require__(47)
	var validSecond   = __webpack_require__(48)
	var validMeridian = __webpack_require__(49)

	var VALIDATION_MAP = {
		hour    : validHour,
		minute  : validMinute,
		second  : validSecond,
		meridian: validMeridian
	}

	/**
	 * VALIDATES TIME PART [name, value] eg ['hour', '15']
	 *
	 * Returns whether the given value is valid for the given time part.
	 *
	 * EG:
	 * 	name: 'hour', value: 15 => true
	 * 	name: 'hour', value: '07' => true
	 *  name: 'hour', value: 15, config={meridian: true} => false
	 *
	 *  name: 'minute', value: '05' => true
	 *
	 *  name: 'second', value: 55 => true
	 *  name: 'second', value: 5 => true
	 *  name: 'second', value: '5' => false (string without two digits)
	 *  name: 'second', value: '5', {twoDigits: false} => true

	 *  name: 'meridian', value: 'PM' => true
	 *  name: 'meridian', value: 'am' => true
	 *  name: 'meridian', value: 'apm' => false
	 *
	 * @param {String} name
	 * @param {Number/String} value
	 * @param {Object} config
	 * @param {Boolean} config.meridian
	 * @param {Boolean} config.twoDigits
	 *
	 * @return {Boolean}
	 */
	module.exports = function isValidPart(name, value, config){
		var fn = VALIDATION_MAP[name]

		return !!(fn && fn(value, config))
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isValidPart = __webpack_require__(50)
	var assign = __webpack_require__(54)

	module.exports = function isValidTime(time, config){

		var validSecond = time.second === undefined || isValidPart('second', time.second, config)

		var validMinute = validSecond && (time.minute === undefined || isValidPart('minute', time.minute, config))
		var validHour   = validMinute && isValidPart('hour', time.hour, assign({meridian: time.meridian}, config))

		var meridian      = time.meridian
		var validMeridian = validHour && (meridian? isValidPart('meridian', meridian, config): true)

		var valid = validMeridian
		if (valid && meridian){
			//for 24 hour clock, we're done
			//BUT there is a special case when we have meridian specified:
			//12:00:00 am/pm is ok, but >= 12:00:01 is not
			var hour = time.hour * 1
			if (hour === 12){
				valid = time.minute * 1 === 0 && time.second * 1 === 0
			}
		}

		return valid
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign      = __webpack_require__(54)
	var isValidNumber = __webpack_require__(64)
	var isValidPart = __webpack_require__(50)
	var isValidTime = __webpack_require__(51)
	var adjustOverflow = __webpack_require__(53)

	var clamp = __webpack_require__(65)

	/**
	 * @param {Object} time
	 * @param {String} name
	 * @param {String/Number} value
	 * @param {Object} [config]
	 * @param {Boolean} [config.clamp=false]
	 * @param {Boolean} [config.overflow=true]
	 * @param {Boolean} [config.rejectInvalid=false]
	 *
	 * @return {Object} time
	 */

	module.exports = function update(time, name, value, config){

		var initial = time
		var touched
		var validNumber = isValidNumber(value, config)
		var validPart   = isValidPart(name, value, config)

		time   = assign({}, time)
		config = config || {}

		if (validNumber){
			value *= 1
		}

		if (validPart || validNumber){
			time[name] = value
		}

		if (!isValidTime(time, config) && config.clamp){
			time[name] = clamp(time, name, time[name])
		}

		if (!isValidTime(time, config)){

			if (config.rejectInvalid){
				return initial
			}

			if (config.overflow !== false){
				time = adjustOverflow(time, config)
			}
		}

		return time
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * See documentation below
	 */

	var defaults = {}

	var MAP = {
		hour: overflowHour,
		minute: overflowMinute,
		second: overflowSecond
	}

	function overflowHour(values, name, value, config){
		if (values.hour === undefined){
			return
		}

		var overflowHourToMeridian = !config || config.overflowHourToMeridian !== false
		var meridian = values.meridian || config && config.meridian
		var limit    = meridian? 12: 23
		var plusOne  = meridian? 12: 24

		var extra = 0

		if (value > limit){
			extra += Math.floor(value / limit)
			value = value % plusOne
		}
		if (value < 0){
			extra = Math.ceil(-value / limit)
			value = plusOne + value
		}

		if (meridian && value === limit && (values.minute > 0 || values.second > 0)){
			extra += 1
			value = 0
		}

		if (meridian && extra % 2 == 1 && overflowHourToMeridian){
			if (typeof meridian == 'string'){
				meridian = meridian.toUpperCase()
			}

			//change meridian
			values.meridian = meridian == 'PM'? 'AM': 'PM'
		}

		values.hour = value
	}

	function overflowMinuteOrSecond(values, name, value, config, nextName){

		if (values[name] === undefined){
			return
		}

		var extra = 0

		if (value > 59){
			extra += Math.floor(value / 60)
			value = value % 60
		}
		if (value < 0){
			extra -= Math.ceil(-value / 60)
			value = 60 + value
		}

		values[name || 'minute'] = value

		if (extra){
			values[nextName || 'hour'] += extra
		}
	}

	function overflowMinute(values, name, value, config){
		overflowMinuteOrSecond(values, 'minute', values.minute, config) // minute -> hour
		overflowHour(values, 'hour', values.hour, config) //overflow hour
	}

	function overflowSecond(values, name, value, config){
		overflowMinuteOrSecond(values, 'second', values.second, config, 'minute') //second -> minute
		overflowMinute(values, 'minute', values.minute, config) //minute -> hour
	}

	/**
	 *
	 * This method receives an object with hour, minute and second properties.
	 * It adjusts any overflowing values and moves the overflow to the next value:
	 *
	 * EG: extra seconds go to minute; extra minutes go to hour;
	 * hours beyond 23 (in 24 hour format, so without values.meridian specified) restart from 0,
	 * or beyond 12:00:00 (when meridian is specified) restart from 0
	 *
	 * @param  {Object} values [description]
	 * @param  {Number} values.hour
	 * @param  {Number} values.minute
	 * @param  {Number} values.second
	 * @param  {Number} values.meridian
	 *
	 * @param  {String} [name="second"]   "hour"|"minute"|"second"
	 * @param  {Number} [value]
	 * @param  {Object} config
	 *
	 * Both {name} and {value} are optional. If not given, they default to "second" and value for second.
	 *
	 * @return {Object}
	 */
	module.exports = function(values, name, value, config){

		if (arguments.length == 2){
			config = name
			name   = 'second'
			value  = values[name]
		}

		MAP[name](values, name, value, config || defaults)

		return values
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(66)
	var getPrefix    = __webpack_require__(67)
	var el           = __webpack_require__(68)

	var MEMORY = {}
	var STYLE = el.style

	module.exports = function(key, value){

	    var k = key// + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed

	    if (!(key in STYLE)){//we have to prefix

	        prefix = getPrefix('appearance')

	        if (prefix){
	            prefixed = prefix + toUpperFirst(key)

	            if (prefixed in STYLE){
	                key = prefixed
	            }
	        }
	    }

	    MEMORY[k] = key

	    return key
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  'alignItems': 1,
	  'justifyContent': 1,
	  'flex': 1,
	  'flexFlow': 1,

	  'userSelect': 1,
	  'transform': 1,
	  'transition': 1,
	  'transformOrigin': 1,
	  'transformStyle': 1,
	  'transitionProperty': 1,
	  'transitionDuration': 1,
	  'transitionTimingFunction': 1,
	  'transitionDelay': 1,
	  'borderImage': 1,
	  'borderImageSlice': 1,
	  'boxShadow': 1,
	  'backgroundClip': 1,
	  'backfaceVisibility': 1,
	  'perspective': 1,
	  'perspectiveOrigin': 1,
	  'animation': 1,
	  'animationDuration': 1,
	  'animationName': 1,
	  'animationDelay': 1,
	  'animationDirection': 1,
	  'animationIterationCount': 1,
	  'animationTimingFunction': 1,
	  'animationPlayState': 1,
	  'animationFillMode': 1,
	  'appearance': 1
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getPrefix     = __webpack_require__(67)
	var forcePrefixed = __webpack_require__(69)
	var el            = __webpack_require__(68)

	var MEMORY = {}
	var STYLE = el.style

	module.exports = function(key, value){

	    var k = key + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed
	    var prefixedValue

	    if (!(key in STYLE)){

	        prefix = getPrefix('appearance')

	        if (prefix){
	            prefixed = forcePrefixed(key, value)

	            prefixedValue = '-' + prefix.toLowerCase() + '-' + value

	            if (prefixed in STYLE){
	                el.style[prefixed] = ''
	                el.style[prefixed] = prefixedValue

	                if (el.style[prefixed] !== ''){
	                    value = prefixedValue
	                }
	            }
	        }
	    }

	    MEMORY[k] = value

	    return value
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getPrefix     = __webpack_require__(70)
	var forcePrefixed = __webpack_require__(71)
	var el            = __webpack_require__(72)

	var MEMORY = {}
	var STYLE = el.style

	module.exports = function(key, value){

	    var k = key + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed
	    var prefixedValue

	    if (!(key in STYLE)){

	        prefix = getPrefix('appearance')

	        if (prefix){
	            prefixed = forcePrefixed(key, value)

	            prefixedValue = '-' + prefix.toLowerCase() + '-' + value

	            if (prefixed in STYLE){
	                el.style[prefixed] = ''
	                el.style[prefixed] = prefixedValue

	                if (el.style[prefixed] !== ''){
	                    value = prefixedValue
	                }
	            }
	        }
	    }

	    MEMORY[k] = value

	    return value
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(73)
	var getPrefix    = __webpack_require__(70)
	var el           = __webpack_require__(72)

	var MEMORY = {}
	var STYLE = el.style

	module.exports = function(key, value){

	    var k = key// + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed

	    if (!(key in STYLE)){//we have to prefix

	        prefix = getPrefix('appearance')

	        if (prefix){
	            prefixed = prefix + toUpperFirst(key)

	            if (prefixed in STYLE){
	                key = prefixed
	            }
	        }
	    }

	    MEMORY[k] = key

	    return key
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  'alignItems': 1,
	  'justifyContent': 1,
	  'flex': 1,
	  'flexFlow': 1,

	  'userSelect': 1,
	  'transform': 1,
	  'transition': 1,
	  'transformOrigin': 1,
	  'transformStyle': 1,
	  'transitionProperty': 1,
	  'transitionDuration': 1,
	  'transitionTimingFunction': 1,
	  'transitionDelay': 1,
	  'borderImage': 1,
	  'borderImageSlice': 1,
	  'boxShadow': 1,
	  'backgroundClip': 1,
	  'backfaceVisibility': 1,
	  'perspective': 1,
	  'perspectiveOrigin': 1,
	  'animation': 1,
	  'animationDuration': 1,
	  'animationName': 1,
	  'animationDelay': 1,
	  'animationDirection': 1,
	  'animationIterationCount': 1,
	  'animationTimingFunction': 1,
	  'animationPlayState': 1,
	  'animationFillMode': 1,
	  'appearance': 1
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	            value       : ctor,
	            enumerable  : false,
	            writable    : true,
	            configurable: true
	        }
	    })
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @static
	 * Returns true if the given region is valid, false otherwise.
	 * @param  {Region} region The region to check
	 * @return {Boolean}        True, if the region is valid, false otherwise.
	 * A region is valid if
	 *  * left <= right  &&
	 *  * top  <= bottom
	 */
	module.exports = function validate(region){

	    var isValid = true

	    if (region.right < region.left){
	        isValid = false
	        region.right = region.left
	    }

	    if (region.bottom < region.top){
	        isValid = false
	        region.bottom = region.top
	    }

	    return isValid
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn   = __webpack_require__(75)
	var VALIDATE = __webpack_require__(62)

	module.exports = function(REGION){

	    var MAX = Math.max
	    var MIN = Math.min

	    var statics = {
	        init: function(){
	            var exportAsNonStatic = {
	                getIntersection      : true,
	                getIntersectionArea  : true,
	                getIntersectionHeight: true,
	                getIntersectionWidth : true,
	                getUnion             : true
	            }
	            var thisProto = REGION.prototype
	            var newName

	            var exportHasOwn = hasOwn(exportAsNonStatic)
	            var methodName

	            for (methodName in exportAsNonStatic) if (exportHasOwn(methodName)) {
	                newName = exportAsNonStatic[methodName]
	                if (typeof newName != 'string'){
	                    newName = methodName
	                }

	                ;(function(proto, methodName, protoMethodName){

	                    proto[methodName] = function(region){
	                        //<debug>
	                        if (!REGION[protoMethodName]){
	                            console.warn('cannot find method ', protoMethodName,' on ', REGION)
	                        }
	                        //</debug>
	                        return REGION[protoMethodName](this, region)
	                    }

	                })(thisProto, newName, methodName);
	            }
	        },

	        validate: VALIDATE,

	        /**
	         * Returns the region corresponding to the documentElement
	         * @return {Region} The region corresponding to the documentElement. This region is the maximum region visible on the screen.
	         */
	        getDocRegion: function(){
	            return REGION.fromDOM(document.documentElement)
	        },

	        from: function(reg){
	            if (reg.__IS_REGION){
	                return reg
	            }

	            if (typeof document != 'undefined'){
	                if (typeof HTMLElement != 'undefined' && reg instanceof HTMLElement){
	                    return REGION.fromDOM(reg)
	                }

	                if (reg.type && typeof reg.pageX !== 'undefined' && typeof reg.pageY !== 'undefined'){
	                    return REGION.fromEvent(reg)
	                }
	            }

	            return REGION(reg)
	        },

	        fromEvent: function(event){
	            return REGION.fromPoint({
	                x: event.pageX,
	                y: event.pageY
	            })
	        },

	        fromDOM: function(dom){
	            var rect = dom.getBoundingClientRect()
	            // var docElem = document.documentElement
	            // var win     = window

	            // var top  = rect.top + win.pageYOffset - docElem.clientTop
	            // var left = rect.left + win.pageXOffset - docElem.clientLeft

	            return new REGION({
	                top   : rect.top,
	                left  : rect.left,
	                bottom: rect.bottom,
	                right : rect.right
	            })
	        },

	        /**
	         * @static
	         * Returns a region that is the intersection of the given two regions
	         * @param  {Region} first  The first region
	         * @param  {Region} second The second region
	         * @return {Region/Boolean}        The intersection region or false if no intersection found
	         */
	        getIntersection: function(first, second){

	            var area = this.getIntersectionArea(first, second)

	            if (area){
	                return new REGION(area)
	            }

	            return false
	        },

	        getIntersectionWidth: function(first, second){
	            var minRight  = MIN(first.right, second.right)
	            var maxLeft   = MAX(first.left,  second.left)

	            if (maxLeft < minRight){
	                return minRight  - maxLeft
	            }

	            return 0
	        },

	        getIntersectionHeight: function(first, second){
	            var maxTop    = MAX(first.top,   second.top)
	            var minBottom = MIN(first.bottom,second.bottom)

	            if (maxTop  < minBottom){
	                return minBottom - maxTop
	            }

	            return 0
	        },

	        getIntersectionArea: function(first, second){
	            var maxTop    = MAX(first.top,   second.top)
	            var minRight  = MIN(first.right, second.right)
	            var minBottom = MIN(first.bottom,second.bottom)
	            var maxLeft   = MAX(first.left,  second.left)

	            if (
	                    maxTop  < minBottom &&
	                    maxLeft < minRight
	                ){
	                return {
	                    top    : maxTop,
	                    right  : minRight,
	                    bottom : minBottom,
	                    left   : maxLeft,

	                    width  : minRight  - maxLeft,
	                    height : minBottom - maxTop
	                }
	            }

	            return false
	        },

	        /**
	         * @static
	         * Returns a region that is the union of the given two regions
	         * @param  {Region} first  The first region
	         * @param  {Region} second The second region
	         * @return {Region}        The union region. The smallest region that contains both given regions.
	         */
	        getUnion: function(first, second){
	            var top    = MIN(first.top,   second.top)
	            var right  = MAX(first.right, second.right)
	            var bottom = MAX(first.bottom,second.bottom)
	            var left   = MIN(first.left,  second.left)

	            return new REGION(top, right, bottom, left)
	        },

	        /**
	         * @static
	         * Returns a region. If the reg argument is a region, returns it, otherwise return a new region built from the reg object.
	         *
	         * @param  {Region} reg A region or an object with either top, left, bottom, right or
	         * with top, left, width, height
	         * @return {Region} A region
	         */
	        getRegion: function(reg){
	            return REGION.from(reg)
	        },

	        /**
	         * Creates a region that corresponds to a point.
	         *
	         * @param  {Object} xy The point
	         * @param  {Number} xy.x
	         * @param  {Number} xy.y
	         *
	         * @return {Region}    The new region, with top==xy.y, bottom = xy.y and left==xy.x, right==xy.x
	         */
	        fromPoint: function(xy){
	            return new REGION({
	                        top    : xy.y,
	                        bottom : xy.y,
	                        left   : xy.x,
	                        right  : xy.x
	                    })
	        }
	    }

	    Object.keys(statics).forEach(function(key){
	        REGION[key] = statics[key]
	    })

	    REGION.init()
	}

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign   = __webpack_require__(54)
	var defaults = __webpack_require__(45)

	module.exports = function validNumber(n, config){
		var valid = !isNaN(n * 1)

		if (config){
			config = assign({}, defaults, config)
		} else {
			config = defaults
		}

		if (valid && typeof n == 'string' && config.twoDigits){
			valid = n.length == 2
		}

		if (valid){
			n = n * 1
			valid = parseInt(n) === n
		}

		return valid
	}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function clamp(time, name, value){
		if (name == 'meridian'){
			return value
		}
		if (name == 'hour'){
			var limit = 24

			if (time.meridian){
				limit = (time.hour || time.minute)? 11: 12
			}

			return value < 0?
					0:
					value > limit?
						limit:
						value
		}

		return value < 0?
					0:
					value > 59?
						59:
						value
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(str){
		return str?
				str.charAt(0).toUpperCase() + str.slice(1):
				''
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(66)
	var prefixes     = ["ms", "Moz", "Webkit", "O"]

	var el = __webpack_require__(68)

	var PREFIX

	module.exports = function(key){

		if (PREFIX){
			return PREFIX
		}

		var i = 0
		var len = prefixes.length
		var tmp
		var prefix

		for (; i < len; i++){
			prefix = prefixes[i]
			tmp = prefix + toUpperFirst(key)

			if (typeof el.style[tmp] != 'undefined'){
				return PREFIX = prefix
			}
		}
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var el

	if(!!global.document){
	  	el = global.document.createElement('div')
	}

	module.exports = el
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(66)
	var getPrefix    = __webpack_require__(67)
	var properties   = __webpack_require__(56)

	/**
	 * Returns the given key prefixed, if the property is found in the prefixProps map.
	 *
	 * Does not test if the property supports the given value unprefixed.
	 * If you need this, use './getPrefixed' instead
	 */
	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		var prefix = getPrefix(key)

		return prefix?
					prefix + toUpperFirst(key):
					key
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(73)
	var prefixes     = ["ms", "Moz", "Webkit", "O"]

	var el = __webpack_require__(72)

	var PREFIX

	module.exports = function(key){

		if (PREFIX){
			return PREFIX
		}

		var i = 0
		var len = prefixes.length
		var tmp
		var prefix

		for (; i < len; i++){
			prefix = prefixes[i]
			tmp = prefix + toUpperFirst(key)

			if (typeof el.style[tmp] != 'undefined'){
				return PREFIX = prefix
			}
		}
	}

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(73)
	var getPrefix    = __webpack_require__(70)
	var properties   = __webpack_require__(60)

	/**
	 * Returns the given key prefixed, if the property is found in the prefixProps map.
	 *
	 * Does not test if the property supports the given value unprefixed.
	 * If you need this, use './getPrefixed' instead
	 */
	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		var prefix = getPrefix(key)

		return prefix?
					prefix + toUpperFirst(key):
					key
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var el

	if(!!global.document){
	  	el = global.document.createElement('div')
	}

	module.exports = el
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(str){
		return str?
				str.charAt(0).toUpperCase() + str.slice(1):
				''
	}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var hasOwn = Object.prototype.hasOwnProperty

	function curry(fn, n){

	    if (typeof n !== 'number'){
	        n = fn.length
	    }

	    function getCurryClosure(prevArgs){

	        function curryClosure() {

	            var len  = arguments.length
	            var args = [].concat(prevArgs)

	            if (len){
	                args.push.apply(args, arguments)
	            }

	            if (args.length < n){
	                return getCurryClosure(args)
	            }

	            return fn.apply(this, args)
	        }

	        return curryClosure
	    }

	    return getCurryClosure([])
	}


	module.exports = curry(function(object, property){
	    return hasOwn.call(object, property)
	})

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var getInstantiatorFunction = __webpack_require__(77)

	module.exports = function(fn, args){
		return getInstantiatorFunction(args.length)(fn, args)
	}

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(){

	    'use strict';

	    var fns = {}

	    return function(len){

	        if ( ! fns [len ] ) {

	            var args = []
	            var i    = 0

	            for (; i < len; i++ ) {
	                args.push( 'a[' + i + ']')
	            }

	            fns[len] = new Function(
	                            'c',
	                            'a',
	                            'return new c(' + args.join(',') + ')'
	                        )
	        }

	        return fns[len]
	    }

	}()

/***/ }
/******/ ])
});
