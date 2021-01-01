import x from "x";

export default x({
	name: "Center",
	render(){
		let element = document.createElement("div");
		element.classList.add("center");
		let style = element.style;
		style.height = "inherit";
		style.width = "inherit";
		style.display = "flex";
		style.justifyContent = "center";
		style.alignItems = "center";
		return element;
	},
	mounted(){
		this.element.appendChild(this.props.child.element);
	},
});