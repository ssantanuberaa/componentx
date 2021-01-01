import x from "x";
import Modal from "../Modal/Modal.js";
import SizedBox from "../SizedBox/SizedBox.js";
import Center from "../Center/Center.js";
import Text from "../Text/Text.js";
import SuccessCheck from "../SuccessCheck/SuccessCheck.js";
import Div from "../Div/Div.js";

export default x({
	name: "SuccessDialog",
	data: {
		active: false,
		modal: null,
		success_check_node: null,
	},
	render: function(){
		this.success_check_node = new Div({});
		this.modal = new Modal({
			close_on_background_click: this.props.close_on_background_click,
			freeze_page: this.props.freeze_page,
			child: new SizedBox({
				width: 200,
				height: 200,
				child: new Center({
					child: this.success_check_node
				})
			})
		});
		this.modal.onOpen = function(){
			if(this.props.onOpen !== undefined){
				this.props.onOpen();
			}
			this.onOpen();
		}.bind(this);
		this.modal.onClose = function(){
			if(this.props.onClose !== undefined){
				this.props.onClose();
			}
			this.onClose();
		}.bind(this);
		return this.modal.element;
	},
	methods: {
		onClose: function(){},
		onOpen: function(){},
		close: function(){
			this.active = false;
			this.success_check_node.removeChild();
			this.modal.close();
			this.onClose();
			if(this.props.onClose !== undefined){
				this.props.onClose();
			}
		},
		open: function(){
			this.active = true;
			this.success_check_node.$setChild(new SuccessCheck({}));
			this.modal.open();
			this.onOpen();
			if(this.props.onOpen !== undefined){
				this.props.onOpen();
			}
		},
		toggle: function(){
			(this.active) ? this.close() : this.open();
		}
	}
});