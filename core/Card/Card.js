import x from "x";
import Div from "../Div/Div.js";
import Padding from "../Padding/Padding.js";
import {getUnit} from "../../lib/common";
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
		if(this.props.elevation == undefined){
			ui.element.classList.add("level_one");
		}else if(this.props.elevation == 0){
			ui.element.classList.add("level_zero");
		}
		if(this.props.background === undefined){
			style.backgroundColor = "#fff";
		}else{
			style.backgroundColor = this.props.background;
		}
		if(this.props.round === undefined){
			style.borderRadius = 0;
		}else if(this.props.round === "circle"){
			style.borderRadius = "50%";
			if(this.props.width !== undefined){
				style.height = getUnit(this.props.width); // Height and Width must be same --	
			}			
		}else{
			style.borderRadius = this.props.round;
		}
		return ui.element;
	}
});