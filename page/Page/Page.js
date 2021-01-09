import x from "x";
import { Column, Row, Expanded, ScrollView, Div } from "../../core";
import css from "./Page.css";
export default x({
	name: "Page",
	css: css,
	render(){
		let structure = new Column({
			classNames: "page",
			children: [
				this.props.drawer,
				new Expanded({
					child: new Column({
						classNames: "page_content",
						children: [
							this.props.header,
							new Expanded({
								classNames: "page_body",
								child: new ScrollView({
									child: new Div({
										child: this.props.body
									})
								})								
							})
						]
					})
				})				
			]
		});
		return structure.element;
	},
	mounted: function(){
		// if(window['x-style'] !== undefined){
		// 	let style = "";
		// 	let node = document.createElement("style");
		// 	node.setAttribute("type", "text/css");
		// 	node.textContent = window['x-style'];
		// 	document.documentElement.firstChild.appendChild(node);
		// }
	}
});