import x from "x";
import MaterialIcon from "../MaterialIcon/MaterialIcon.js";

import css from "./Button.css";

export default x({
	name: "Button",
	css: css,
	data: {
		icon: null,
		disabled: false,
		buttonTextNode: null
	},
	render(){
		let button = document.createElement("button");
		button.setAttribute("type", "button");
		button.classList.add("button");

		return button;
	},
	mounted(){
		// Icon --
		this.icon = new MaterialIcon({
			child: this.props.material_icon
		});
		this.element.appendChild(this.icon.element);
		// Button text --
		if (typeof this.props.text == "string") {
			this.buttonTextNode = document.createElement("span");
			this.buttonTextNode.textContent = this.props.text;
			this.element.appendChild(this.buttonTextNode);
		}
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
				this.icon = new MaterialIcon({
					child: this.props.material_icon
				});
				this.element.appendChild(this.icon.element);
			}
			if (this.props.text !== undefined) {
				// Button text --
				if (typeof this.props.text == "string") {
					this.buttonTextNode = document.createElement("span");
					this.buttonTextNode.textContent = this.props.text;
					this.element.appendChild(this.buttonTextNode);
				}
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