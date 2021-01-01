import x from "x";
export default x({
	name: "Expanded",
	render(){
		let element = document.createElement("div");
		element.classList.add("expanded");

		let style = element.style;
		style.flex = '1';
		style.height = "inherit";
		style.width = "inherit";

		return element;
	},
	mounted(){
		this.element.appendChild(this.props.child.element);
	},
});