import x from "x";
import MaterialIcon from "../MaterialIcon/MaterialIcon.js";

import css from "./Button.css";

export default x({
	name: "Button",
	css: css,
	data: {
		icon: null,
		disabled: false,
		buttonTextNode: ""
	},
	render(){
		let button = document.createElement("button");
		button.setAttribute("type", "button");
		button.classList.add("button");

		return button;
	},
	mounted(){
		this.setMaterialIcon(this.props.material_icon);
		this.setButtonContent(this.props.text);
		// Watching --
		this.element.addEventListener("click", function(event){
			if(this.props.onClick !== undefined){
				this.props.onClick(event);
			}
			this.onClick(event);
			this.$emit("click", event);
		}.bind(this));
	},
	methods: {
		onClick: function(event){},
		setMaterialIcon: function(icon){
			if(icon == undefined){
				if(this.props.material_icon == undefined){
					return;
				}
				icon = this.props.material_icon;
			}
			this.icon = new MaterialIcon({
				child: this.props.material_icon
			});
			this.element.appendChild(this.icon.element);
		},
		setButtonContent: function(content){
			if(content == undefined){
				content = this.props.text;
			}
			// Button text --
			if (typeof content == "string") {
				this.buttonTextNode = document.createElement("span");
				this.buttonTextNode.textContent = content;
				this.element.appendChild(this.buttonTextNode);
			}
		},
		addLoading(){
			let loading = document.createElement("div");
			loading.classList.add("button_loader");
			this.element.innerHTML = "";
			this.element.appendChild(loading);

			this.disable();
		},
		removeLoading(){
			this.enable();
			this.element.innerHTML = "";
			if(this.props.material_icon !== undefined){
				this.setMaterialIcon();
			}
			if (this.props.text !== undefined) {
				this.setButtonContent();
			}
		},
		disable(){
			this.disabled = true;
			this.element.setAttribute("disabled", "disabled");
		},
		enable(){
			this.disabled = false;
			this.element.removeAttribute("disabled");
		}
	}
});