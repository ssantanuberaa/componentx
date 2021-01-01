import x from "x";
import css from "./DrawerTrigger.css";
export default x({
	name : "DrawerTrigger",
	css: css,
	data: {
		active: false,
	},
	render: function(){
		let element = document.createElement("div");
		element.classList.add("drawer_trigger");
			let icon = document.createElement("i");
			icon.classList.add("material-icons");
			icon.textContent = "menu";
			element.appendChild(icon);	

		return element;
	},
	mounted: function(){
		this.element.addEventListener("click", function(e){
			if(this.active == true){
				this.active = false;
				if(this.props.onClose != undefined){
					this.props.onClose();
				}
			}else{
				this.active = true;
				if(this.props.onOpen != undefined){
					this.props.onOpen();
				}
			}
		}.bind(this));
	},
	methods: {
		
	}
});