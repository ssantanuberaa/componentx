import x from "x";
import css from "./Chip.css";

import Text from "xcomponent/core/Text/Text.js";
import Div from "xcomponent/core/Div/Div.js";
import Row from "xcomponent/core/Row/Row.js";
import Empty from "xcomponent/core/Empty/Empty.js";
import MaterialIcon from "xcomponent/core/MaterialIcon/MaterialIcon.js";

export default x({
	name: "Chip",
	css: css,
	data: {
		value: "",
	},
	render(){
		this.value = this.props.value;
		let ui = new Div({
			classNames: "chip",
			child: new Row({
				children: [
					(this.props.material_icon !== undefined) ? new MaterialIcon({child: this.props.material_icon}) : new Empty({}),
					new Text({child: this.props.title})
				]
			})
		});

		ui.element.addEventListener("click", function(event){
			this.$emit("value", this.value);
			if(this.props.onClick !== undefined){
				this.props.onClick(this.value);
			}
		}.bind(this));
		
		return ui.element;
	},
	methods:{
		select: function(){
			this.element.classList.add("selected");
		},
		removeSelect(){
			this.element.classList.remove("selected");
		}
	}
});