import x from "x";
import InputWrapper from "../InputWrapper/InputWrapper.js";
import { Div, Row } from "../../core";

import css from "./TextBox.css";

export default x({
	name: "TextBox",
	css: css,
	data: {
		focused : false,
		disabled : false,
		defaultValue : "",
		value: "",
		inputNode: null,
		inputWrapper: null,

		disabled: false,
		focused: false,
		error: false,
	},
	render(){
		let that = this;
		this.inputNode = document.createElement("input");
		this.inputNode.setAttribute("type", "text");

		this.inputWrapper = new InputWrapper({
			label: this.props.label,
			material_icon: this.props.material_icon,
			onLabelClick: function(event){
				that.inputNode.focus();
			},
			child: new Div({
				classNames: "textbox",
				child: this.inputNode
			})
		});
		return this.inputWrapper.element;
	},
	mounted(){
		if (this.props.autocomplete == "off") {
			this.inputNode.setAttribute("autocomplete", "off");
		}
		if (this.props.placeholder != undefined) {
			this.inputNode.setAttribute("placeholder", this.props.placeholder);
		}
		this.inputNode.addEventListener("focus", function(event){
			this.focused = true;
			this.inputWrapper.controlLabelPosition(true);
			this.inputWrapper.playBarAnimation(true);
			this.setCounter(this.value.length, this.props.max_char)
			if (this.props.help_text !== undefined) {
				if(this.error == true){
					this.removeError();
				}
				this.show_info_section();
				this.setHelp(this.props.help_text);
			}
			if(this.props.onFocus !== undefined){
				this.props.onFocus(this.value);	
			}			
		}.bind(this));
		this.inputNode.addEventListener("blur", function(event){
			this.focused = false;
			this.removeHelp();
			// pppp
			this.inputWrapper.playBarAnimation(false);
			if (this.inputNode.value == "" || this.inputNode.value == undefined || this.inputNode.value == null) {
				this.inputWrapper.controlLabelPosition(false);
			}else{
				this.inputWrapper.controlLabelPosition(true);
			}
			this.inputWrapper.removeCounter();
			if(this.validateData()){
				this.hide_info_section();
			}
			if(this.props.onBlur !== undefined){
				this.props.onBlur();	
			}			
			this.inputWrapper.blur();
		}.bind(this));
		this.inputNode.addEventListener("input", function(event){
			this.value_changed(event.target.value);
		}.bind(this));
		this.inputNode.addEventListener("keyup", function(event){
			if(this.props.onKeyup !== undefined){
				this.props.onKeyup(this.value, event);
			}
		}.bind(this));
		this.inputNode.addEventListener("change", function(event){
			let value = event.target.value;
			this.value_changed(value);
			if (value == "" || value == undefined || value == null) {
				this.inputWrapper.controlLabelPosition(false);
			}else{
				setTimeout(function(){
					this.inputWrapper.controlLabelPosition(true);	
				}.bind(this), 100);
			}
		}.bind(this));
	},
	methods: {
		value_changed(value){
			if (this.props.format == "numeric") {
				let num = Number(value);
				if (isNaN(num) == true) {
					this.inputNode.value = this.value;
					return;
				}
			}else if (this.props.format == "urlencodestring") {
				let query = /[!@#$%^&*(),/.?":{}|<>';]/g
				if (query.test(value)) {
					this.inputNode.value = this.value;
					return;
				}
			}

			if (value != null && value != undefined) {
				if(this.props.prevent_overflow && value.length>this.props.max_char){
					this.inputNode.value = this.value;
					this.setCounter(this.value.length, this.props.max_char);
				}else{
					this.setCounter(value.length, this.props.max_char);
					this.value = value;
					this.onValueChange(this.value);
					if(this.props.onValueChange !== undefined){
						this.props.onValueChange(this.value);
					}
					// Emit Value --
					this.$emit("value", this.value);
				}
			}
			// Validate data --
			let hasError = !this.validateData();
			if(this.props.max_char !== undefined && value.length > this.props.max_char){
				hasError = true;
				this.setError("More than " + this.props.max_char + " character is not allowed !");
			}
			if(hasError){
				this.show_info_section();
			}else{
				this.removeError();
				this.hide_info_section();
			}
			if(this.props.onInput !== undefined){
				this.onInput(this.value);	
			}
		},
		setValue(value){
			if (this.disabled == true) {
				return;
			}
			if (value == undefined || value == null || value == "") {
				this.inputNode.value = "";
				this.value = "";
				if (this.focused == false) {
					this.inputWrapper.controlLabelPosition(false);
				}
			}else{
				this.inputNode.value = value;
				this.value = value;
				if (this.focused == false) {
					this.inputWrapper.controlLabelPosition(true);
				}
			}
			if(this.props.onValueChange !== undefined){
				this.props.onValueChange(this.value);
			}
			this.onValueChange(this.value);
			// Emit Value --
			this.$emit("value", this.value);
		},
		setError(errorMessage){
			this.removeHelp();
			this.error = true;
			this.inputWrapper.setError(errorMessage);
		},
		removeError(){
			this.error = false;
			this.inputWrapper.removeError();
		},
		setHelp(helpText){
			this.removeError();
			if(this.inputWrapper.showing_help == false){
				this.inputWrapper.setHelp(helpText);	
			}
		},
		removeHelp(){
			if(this.inputWrapper.showing_help == true){
				this.inputWrapper.removeHelp();
			}
		},
		show_info_section(){
			if(this.inputWrapper.showing_info === false){
				this.inputWrapper.show_info_section();
			}
		},
		hide_info_section(){
			if(this.inputWrapper.showing_info === true){
				this.inputWrapper.hide_info_section();
			}
		},
		enable(){
			this.disabled = false;
			this.element.classList.remove("disabled");
			this.inputNode.removeAttribute("disabled");
			this.inputWrapper.enable();
		},
		disable(){
			this.disabled = true;
			this.element.classList.add("disabled");
			this.inputNode.setAttribute("disabled", "disabled");
			this.removeError();
			this.hide_info_section();
			this.inputWrapper.disable();
		},
		setPrefix(prefixNode){
			this.inputWrapper.setPrefix(prefixNode);
		},
		setSuffix(suffixNode){
			this.inputWrapper.setSuffix(suffixNode);
		},
		focus(){
			this.inputNode.focus();
			this.inputWrapper.focus();
		},
		setCounter: function(left, right){
			if (this.props.max_char !== undefined) {
				this.inputWrapper.setCounter(left, right);	
			}			
		},
		onValueChange: function(newValue, oldValue){
		},
		validateData(value, validations){
			if(value == undefined){
				value = this.value;
			}
			if(validations == undefined){
				validations = this.props.validations;
			}

			this.error = !this.inputWrapper.validateData(value, validations);
			return !this.error;
		},
	}
});