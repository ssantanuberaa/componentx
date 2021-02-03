import x from "x";
import {Div, Padding} from "xcomponent/core";
import {getUnit} from "../lib/common";
import css from "./Card.css";

export default x({
	name: "Card",
	css: css,
	render: function(){
		let ui = new Div({
			classNames: "card",
			child: new Padding({
				top: this.props.paddingTop,
				bottom: this.props.paddingBottom,
				left: this.props.paddingLeft,
				right: this.props.paddingRight,
				all: this.props.paddingAll,
				child: this.props.child,
			})
		});
		let style = ui.element.style;
		if(this.props.width !== undefined){
			style.width = getUnit(this.props.width);
		}
		if(this.props.height == undefined){
			style.height = getUnit(this.props.height);
		}
		return ui.element;
	}
});