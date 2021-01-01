import x from "x";
import css from "./Header.css";
export default x({
	name: "Header",
	css: css,
	render(){
		let element = document.createElement("header");
		element.classList.add("header");
		element.appendChild(this.props.child.element);

		return element;
	},
});