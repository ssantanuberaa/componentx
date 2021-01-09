import x from "x";
import { Column, Div, MaterialIcon, Empty, Row, Text } from "../../core";
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
		counterContainer: null
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
			this.icon = new Empty({});
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
						new Div({
							classNames: "input_field",
							child: this.props.child,
						})
					]
				}),
				this.bar
			]
		});

		this.infoText = new Div({
			classNames: "input_wrapper_info_text",
			child: new Empty({}),
		});

		this.counterContainer = new Div({
			classNames: "counter_container",
			child: new Empty({}),
		});

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
		// Watching --
		if(this.props.label !== undefined){
			this.label.element.addEventListener("click", function(event){
				this.focus();
				if(this.props.onLabelClick !== undefined){
					this.props.onLabelClick(event);	
				}				
			}.bind(this));	
		}		
	},
	methods: {
		setError(errorMessage){
			if(errorMessage == undefined){
				errorMessage = "";
			}
			this.error = true;
			this.error_message = errorMessage;
			this.element.classList.add("error");
			this.infoText.element.classList.remove("help");
			this.infoText.element.classList.add("error");
			this.infoText.setChild(errorMessage);
		},
		removeError(){
			this.error = false;
			this.element.classList.remove("error");
			this.infoText.element.classList.remove("error");
			this.infoText.setChild("");
		},
		setHelp(helpMessage){
			this.infoText.setChild(helpMessage);
			if(this.error){
				this.infoText.element.classList.remove("error");	
			}			
			this.infoText.element.classList.add("help");
		},
		removeHelp(){
			this.infoText.element.classList.remove("help");
			if(this.error){
				this.setError(this.error_message);
			}else{
				this.removeError();
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
			}else{
				this.icon.appendChild(prefixNode);
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
			if (second == undefined) {
				this.counterContainer.setChild(first);
			}else{
				this.counterContainer.setChild(first + "/" + second);
			}
		},
		removeCounter(){
			this.counterContainer.setChild("");
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
		
		blur(){
			if (this.props['expand-collapse-icon'] == true) {
				this.inputContainer.element.classList.remove("expand");
			}
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
			let hasError = false;
			let keys = Object.keys(validations);
			for(let i=0; i<keys.length; i++){
				let validationName = keys[i];
				if (validationName == "required") {
					if (data == "" || data == undefined || data == null) {
						hasError = true;
						this.setError(validations.required.message);
						return false;
					}
				}else if (validationName == "email") {
					const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					if (!pattern.test(data)){
						hasError = true;
						this.setError(validations.email.message);
					}
				}else if (validationName == "number") {
					let d = Number(data);
					if (isNaN(d) == true) {
						hasError = true;
						this.setError(validations.number.message);
					}
				}
			}
			if (hasError == true) {
				return false;
			}else{
				this.removeError();	
				return true;
			}
		},
	}
});