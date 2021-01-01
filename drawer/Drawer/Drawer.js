import x from "x";
import css from "./Drawer.css";
export default x({
	name: "Drawer",
	css: css,
	data: {
		active: false,
		drawerOverlay: null,
		drawer: null,
		drawerClose: null
	},
	render(){
		let element = document.createElement("div");
		element.classList.add("drawer");
			this.drawerOverlay = document.createElement("div");
			this.drawerOverlay.classList.add("drawerOverlay");

			this.drawer = document.createElement("div");
			this.drawer.classList.add("drawerContent");
			if(this.props.child !== undefined){
				this.drawer.appendChild(this.props.child.element);
			}
			element.appendChild(this.drawerOverlay);
			element.appendChild(this.drawer);

		return element;
	},
	mounted(){
		// Option -> position
		if (this.props.position == "right") {
			this.element.classList.add("drawerRight");
		}else{
			this.element.classList.add("drawerLeft");
		}
		// Watching --
		this.drawerOverlay.addEventListener("click", function(event){
			this.close();
		}.bind(this));
		// ---
		if(this.props.width != undefined){
			this.drawer.style.width = this.props.width;
			this.drawer.style.maxWidth = this.props.width;
		}else{
			this.drawer.style.width = "400px";
			this.drawer.style.maxWidth = "400px";
		}
	},
	methods: {
		open: function(){
			this.element.style.display = "block";

			if (this.props.behaviour == "dock") {
				if (screen.width>600) {
					if (this.props.position == "right") {
						document.documentElement.style.paddingRight = this.element.style.width = this.drawer.clientWidth+"px";
					}else{
						document.documentElement.style.paddingLeft = this.element.style.width = this.drawer.clientWidth+"px";
					}
				}
			}

			this.active = true;
		},
		close: function(){
			this.element.style.display = "none";

			if (this.props.behaviour == "dock") {
				if (screen.width>600) {
					if (this.props.position == "right") {
						document.documentElement.style.paddingRight = "0px";
					}else{
						document.documentElement.style.paddingLeft = "0px";
					}
				}
			}
			this.active = false;
			if(this.props.onClose != undefined){
				this.props.onClose();
			}
		},
		toggle: function(){
			if (this.active) {
				this.close();
			}else{
				this.open();
			}			
		}
	}
});