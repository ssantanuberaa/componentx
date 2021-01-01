import x from "x";

export default x({
	name: "MaterialIcon",
	data: {
		icon: null,
	},
	render(){
		let element = document.createElement("div");
		element.classList.add("material_icon");
		this.icon = document.createElement("i");
		this.icon.classList.add("material-icons");
		this.icon.textContent = this.props.child;
		element.appendChild(this.icon);
		let style = element.style;
		style.height = "100%";
		style.display = "flex";
		style.alignItems = "center";
		style.paddingRight = "3px";
		return element;
	},
	methods:{
		setIcon(iconName){
			if(iconName == undefined){
				this.icon.textContent = this.props.child;
			}else{
				this.icon.textContent = iconName;
			}
		},
	}
});