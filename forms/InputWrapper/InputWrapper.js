import x from "x";
import { validateFormData } from "../../lib/common.js";
import { Column, Div, MaterialIcon, Empty, Row, Text, Expanded } from "../../core";
import TextCounter from "../TextCounter/TextCounter.js";
import css from "./InputWrapper.css";

export default x({
	name: "InputWrapper",
	css: css,
	data: {
		error: false,
		error_message: "",
		inputContainer: null,
		iconPrefixContainer: null,
		icon: null,
		fieldContainer: null,
		label: null,
		inputField: null,
		bar: null,
		infoSection: null,
		infoText: null,
		counterContainer: null,
		info_visibility: false,

		showing_help: false,
		showing_error: false,
		showing_info: false,

		input_field_wrapper_com: null
	},
	render(){
		// Label --
		if(this.props.label == undefined){
			this.label = new Empty({});
		}else{
			this.label = new Row({
				classNames: "input_wrapper_label",
				children: [
					new Div({child: this.props.label, classNames: "input_wrapper_label_text"}),
					(this.props.required == true) ? new Empty({}) : new Div({ classNames: "required_mark", child: "*"})
				]
			});
		}

		// Icon --
		if(this.props.material_icon == undefined){
			this.icon = new Div({});
		}else{
			this.icon = new Row({
				shrink: true,
				classNames: "icon_prefix_container",
				children: [
					new MaterialIcon({
						child: this.props.material_icon,
					})
				]
			});			
		}

		// Bar --
		this.bar = new Div({
			classNames: "input_bar",
			child: new Empty({})
		});

		// Input container --
		this.inputContainer = new Row({
			classNames: "input_container",
			children: [
				this.icon,
				new Column({
					classNames: "field_container",
					children: [
						this.label,
						new Row({
							classNames: "input_field",
							children: [
								new Expanded({
									child: this.props.child
								}),
							],
							onInit: function(com){
								this.input_field_wrapper_com = com;
							}.bind(this),
						})
					]
				}),
				this.bar
			],
			onInit: function(com){
				com.element.setAttribute("tabindex", 1);
			}
		});

		this.infoText = new Div({
			classNames: "input_wrapper_info_text",
			child: new Empty({}),
		});

		this.counterContainer = new TextCounter({});

		let dom = new Column({
			classNames: "input_wrapper",
			children: [
				this.inputContainer,
				// info --
				new Row({
					classNames: "input_wrapper_info_section",
					children: [
						this.infoText,
						this.counterContainer
					]
				})
			]
		});

		return dom.element;
	},
	mounted(){
		if (this.props['expand-collapse-icon'] == true) {
			this.element.classList.add("showExpand");
		}
		// Focus event --
		this.inputContainer.element.addEventListener("focus", function(event){
			if(this.props.onFocus !== undefined){
				this.props.onFocus(this);
			}
			this.focus();
			if(this.props.label !== undefined){
				if(this.props.onLabelClick !== undefined){
					this.props.onLabelClick(event);	
				}
			}
		}.bind(this));

		// Blur event --
		this.inputContainer.element.addEventListener("blur", function(event){
			if(this.props.onBlur !== undefined){
				this.props.onBlur(this);
			}
			this.blur();
		}.bind(this));
	},
	methods: {
		setInputPrefix: function(prefixCom){
			this.input_field_wrapper_com.prependChild(prefixCom);
		},
		setError(errorMessage){
			this.removeHelp();
			this.showing_error = true;
			if(errorMessage == undefined){
				errorMessage = "";
			}
			this.error = true;
			this.error_message = errorMessage;
			this.element.classList.add("error");
			this.infoText.element.classList.add("error");
			this.infoText.setChild(errorMessage);
		},
		removeError(){
			this.error = false;
			this.showing_error = false;
			this.element.classList.remove("error");
			this.infoText.element.classList.remove("error");
			this.infoText.setChild("");
		},
		setHelp(helpMessage){
			this.removeError();
			this.showing_help = true;
			this.infoText.setChild(helpMessage);
			this.infoText.element.classList.add("help");
		},
		removeHelp(){
			this.showing_help = false;
			this.infoText.setChild("");
			this.infoText.element.classList.remove("help");
		},
		show_info_section(){
			if(this.info_visibility == false){
				this.showing_info = true;
				this.infoText.element.classList.add("showing_info");
				this.info_visibility = true;
				setTimeout(function(){
					this.infoText.element.classList.remove("showing_info");
				}.bind(this), 100);
			}
		},
		hide_info_section(){
			if(this.info_visibility == true){
				this.showing_info = false;
				this.infoText.element.classList.add("hiding_info");
				setTimeout(function(){
					this.info_visibility = false;
					this.infoText.element.classList.remove("hiding_info");
				}.bind(this), 100);
			}
		},
		enable(){
			this.element.classList.remove("disabled");
		},
		disable(){
			this.element.classList.add("disabled");
		},
		setPrefix(prefixNode){
			if(prefixNode.nodeType === Node.ELEMENT_NODE){
				this.icon.element.appendChild(prefixNode);
			}else if(prefixNode.element !== undefined){
				this.icon.element.appendChild(prefixNode.element);
			}			
		},
		setSuffix(suffixNode){
			if(suffixNode.nodeType === Node.ELEMENT_NODE){
				this.inputContainer.element.appendChild(suffixNode);
			}else{
				this.inputContainer.element.appendChild(suffixNode.element);
			}
		},
		focus: function(){
			if (this.props['expand-collapse-icon'] == true) {
				this.inputContainer.element.classList.add("expand");
			}
		},
		blur(){
			if (this.props['expand-collapse-icon'] == true) {
				this.inputContainer.element.classList.remove("expand");
			}
		},
		controlLabelPosition(forceRaised){
			let left = this.icon.element.clientWidth;
			let node = this.label.element;
			if (forceRaised) {
				node.classList.add("raised");
				node.style.left = "-" + left + "px";
			}else{
				node.classList.remove("raised");
				node.style.left = "0px";
			}
		},
		playBarAnimation(control){
			if (control == true) {
				this.bar.element.classList.add("active");
			}else{
				this.bar.element.classList.remove("active");
			}
		},
		setCounter(first, second){
			this.counterContainer.setCounter(first, second);
		},
		removeCounter(){
			this.counterContainer.removeCounter();
		},
		// -------------------------------------------
		
		registerInput(component){
			let node = component.element;
			// Registering the element to the closest form element --
			if (node.closest("form") != null) {
				let form = node.closest("form");
				if (form.inputs == undefined) {
					form.inputs = {};
				}
				form.inputs[node.getAttribute("name")] = component;
			}

			// Firing InputInitialized --
			let data = {};
			data[node.getAttribute('name')] = component.value;
			node.dispatchEvent(new CustomEvent("inputinitialized", {
				bubbles : true,
				cancelable : false,
				detail : data
			}));
		},
		addLoading(){
			bar.classList.add("barAnimation");
		},
		removeLoading(){
			bar.classList.remove("barAnimation");
		},
		emitValue(component){
			let data = {};
			data[component.element.getAttribute('name')] = component.value;
			component.element.dispatchEvent(new CustomEvent("value", {
				bubbles: true, 
				cancelable: false,
				detail : data
			}));
		},
		validateData(data, validations){
			let check = validateFormData(data, validations);
			if(typeof check == "string"){
				this.setError(check);
				return false;
			}else if(check === false){
				return false;
			}else{
				return true;
			}
		},
	}
});