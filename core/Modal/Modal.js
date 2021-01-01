import x from "x";
import css from "./Modal.css";

import Row from "../Row/Row.js";
import Div from "../Div/Div.js";

export default x({
	name: "Modal",
	css: css,
	data: {
		active: false,
		animationOpen: "xModalOpen",
		animationClose: "xModalClose",
		overlay: "",
		content: "",
		page_scroll: "",
	},
	render: function(){
		this.overlay = new Div({classNames: "modal_overlay"});
		this.content = new Div({classNames: "modal_content", child: this.props.child});
		let ui = new Div({
			classNames: "modal",
			child: new Row({
				classNames: "modal_container",
				children: [
					this.overlay, this.content
				],
			})
		});
		return ui.element;
	},
	mounted: function(){
		this.overlay.element.addEventListener("click", function(event){
			if (this.props.close_on_background_click == true) {
				this.close();
			}
		}.bind(this));
	},
	methods: {
		onClose: function(){},
		onOpen: function(){},
		open: function(){
			this.content.element.classList.remove(this.animationClose);
			this.content.element.classList.add(this.animationOpen);
			this.element.style.display = "flex";
			this.active = true;
			if (this.props.freeze_page == true) {
				this.page_scroll = window.getComputedStyle(document.documentElement, null).getPropertyValue("overflow-y");
				document.documentElement.style.overflowY = "hidden";
			}
			this.onOpen();
		},
		close: function(){
			this.content.element.classList.remove(this.animationOpen);
			this.content.element.classList.add(this.animationClose);
			setTimeout(function(){
				this.element.style.display = "none";
				this.onClose();
				if (this.props.freeze_page == true) {
					document.documentElement.style.overflowY = this.page_scroll;
				}
			}.bind(this), 250);
			this.active = false;
		},
		toggle: function(){
			(this.active) ? this.close() : this.open();
		},
		setContent: function(component){
			this.content.innerHTML = "";
			this.content.appendChild(component.element);
		},
	},
});