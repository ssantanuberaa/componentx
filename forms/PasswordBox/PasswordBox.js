import x from "x";
import MaterialIcon from "../../core/MaterialIcon/MaterialIcon.js";
import TextBox from "../TextBox/TextBox.js";
import css from "./PasswordBox.css";
export default x({
	name: "PasswordBox",
	css: css,
	data:{
		passwordVisibilityNode: null,
		textboxNode: null,
		textVisibile: false
	},
	render(){
		let that = this;
		this.textboxNode = new TextBox({
			classNames: "password_box",
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
		this.passwordVisibilityNode = new MaterialIcon({
			child: "visibility"
		});		
		this.textboxNode.setSuffix(this.passwordVisibilityNode);

		return this.textboxNode.element;
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
			this.textboxNode.setError(errorMessage);
		},
		removeError(){
			this.textboxNode.removeError();
		},
		showText(){
			this.textboxNode.inputNode.setAttribute("type", "text");
			this.passwordVisibilityNode.setIcon("visibility_off");
			this.textVisibile = true;
		},
		hideText(){
			this.textboxNode.inputNode.setAttribute("type", "password");
			this.passwordVisibilityNode.setIcon("visibility");
			this.textVisibile = false;
		},
		onValueChange: function(){},
		validateData(){},	
	}
});