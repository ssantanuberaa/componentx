import Row from "../Row/Row.js";
import Div from "../Div/Div.js";

import css from "./SuccessCheck.css";

import x from "x";
export default x({
	name: "SuccessCheck",
	css: css,
	render: function(){
		let ui = new Div({
			classNames: "swal2-icon swal2-success swal2-icon-show",
			children: [
				new Div({classNames: "swal2-success-circular-line-left"}),
				new Div({classNames: "swal2-success-line-tip"}),
				new Div({classNames: "swal2-success-line-long"}),
				new Div({classNames: "swal2-success-ring"}),
				new Div({classNames: "swal2-success-fix"}),
				new Div({classNames: "swal2-success-circular-line-right"}),
			]
		});
		return ui.element;
	}
});