import x from "x";
import css from "./ChipsInput.css";

import Row from "xcomponent/core/Row/Row.js";
import VerticalInputWrapper from "../VerticalInputWrapper/VerticalInputWrapper.js";
import Chip from "../Chip/Chip.js";

export default x({
	name: "ChipsInput",
	css: css,
	data: {
		value: "",
		error: false,
	},
	render(){
		let that = this;
		this.chips = [];
		if(this.props.chips != undefined && this.props.chips.length > 0){
			this.props.chips.forEach((item)=>{
				this.chips.push(new Chip({
					value: item.id,
					material_icon: item.material_icon,
					title: item.title,
					onClick: function(value){
						that.selectChip(value);
					}
				}));
			});			
		}
		this.wrapper = new VerticalInputWrapper({
			label: this.props.label,
			material_icon: this.props.material_icon,
			disabled: this.props.disabled,
			child: new Row({
				children: this.chips
			})
		});
		return this.wrapper.element;
	},
	methods:{
		validateData(){
			return this.wrapper.validateData(this.value, this.props.validations);
		},
		selectChip(value){
			this.value = value;
			this.chips.forEach((item)=>{
				if(item.value == value){
					item.select();
				}else{
					item.removeSelect();
				}
			});
			this.validateData();
			this.$emit("value", this.value);
		},
		resetChip(){
			this.value = "";
			this.chips.forEach((item)=>{
				item.removeSelect();
			});
			this.validateData();
			this.$emit("value", this.value);
		},
		setError: function(errorMessage){
			this.error = true;
			this.wrapper.setError(errorMessage);
		},
		removeError: function(){
			this.error = false;
			this.wrapper.removeError();
		}
	}
});