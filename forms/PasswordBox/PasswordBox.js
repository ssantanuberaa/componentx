import x from "x";
import MaterialIcon from "../../core/MaterialIcon/MaterialIcon.js";
import SizedBox from "../../core/SizedBox/SizedBox.js";
import Card from "../../core/Card/Card.js";
import Text from "../../core/Text/Text.js";
import Div from "../../core/Div/Div.js";
import TextBox from "../TextBox/TextBox.js";
import css from "./PasswordBox.css";
export default x({
	name: "PasswordBox",
	css: css,
	data:{
		passwordVisibilityNode: null,
		textbox: null,
		textVisibile: false,
		error: false,
	},
	render(){
		let that = this;
		this.textbox = new TextBox({
			material_icon: "lock",
			label: this.props.label,
			help_text: this.props.help_text,
			required: this.props.required,
			onValueChange: function(value){
				that.value = value;
				that.onValueChange(value);
				that.$emit("value", value);
				if(that.props.onValueChange !== undefined){
					that.props.onValueChange(value);
				}
			},
		});
		let el = new Div({
			classNames: "password_box",
			children: [
				this.textbox,
				new SizedBox({width: "100%", height: "20px"}),
				new Card({
					elevation: 0,
					background: "pink",
					height: "300px",
					width: "100%",
					paddingAll: 20,
					child: new Text({child: "Hello"}),
				}),
			]
		});
			
		this.passwordVisibilityNode = new MaterialIcon({
			child: "visibility"
		});		
		this.textbox.setSuffix(this.passwordVisibilityNode);

		return el.element;
	},
	mounted(){
		// Add Event Listener --
		let that = this;
		this.passwordVisibilityNode.element.addEventListener("click", function(event){
			if (this.textVisibile == true) {
				this.hideText();
			}else{
				this.showText();
			}
		}.bind(this));
		this.hideText();
	},
	methods: {
		setError(errorMessage){
			this.textbox.setError(errorMessage);
		},
		removeError(){
			this.textbox.removeError();
		},
		showText(){
			this.textbox.inputNode.setAttribute("type", "text");
			this.passwordVisibilityNode.setIcon("visibility_off");
			this.textVisibile = true;
		},
		hideText(){
			this.textbox.inputNode.setAttribute("type", "password");
			this.passwordVisibilityNode.setIcon("visibility");
			this.textVisibile = false;
		},
		onValueChange: function(){},
		validateData(){
			this.error = !this.textbox.validateData(this.value, this.props.validations);
			return !this.error;
		},
	}
});