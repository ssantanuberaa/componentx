// Library --
import axios from "axios";
// Import Components --
import { Row, Padding, Column, SizedBox, Center, Text, Empty, MaterialIcon, Button, Modal,
SuccessDialog } from "./components/core";
import Page from "./components/page";
import Header from "./components/header";
import Drawer from "./components/drawer";
import DrawerTrigger from "./components/drawer/DrawerTrigger.js";
import { TextBox, PasswordBox, Form } from "./components/forms";

let rootNode = document.getElementById("demo");

function App(){
	let drawer, drawerTrigger, header, body;

	drawerTrigger = new DrawerTrigger({
		onOpen: function(){
			drawer.open();
		},
		onClose: function(){
			drawer.close();
		},
	});

	drawer = new Drawer({
		position: "left",
		behaviour: "dock",
		width: "350px",
		onClose: function(){
			drawerTrigger.active = false;
		},
		child: new Text({child: "hello"})
	});

	header = new Header({
		child: Row({
			children: [
				drawerTrigger
			]
		})
	});

	let textbox = new TextBox({
		label: "Company Email",
		material_icon: "email",
		required: true,
		help_text: "example@domain.com"
	});

	console.log("okay");

	let password = new PasswordBox({
		label: "Password",
		help_text: "Your Password Please !",
		required: true
	});

	let modal = new SuccessDialog({
		close_on_background_click: true,
		freeze_page: true,
	});

	let button = new Button({
		material_icon: "email",
		text: "Submit",
	});
	
	let modalTrigger = new Button({
		material_icon: "email",
		text: "Submit",
		onClick: function(event){
			modal.toggle();
		}
	});

	let form = new Form({
		inputs: [textbox, password],
		trigger: button,
		onSubmit: function(formData){
			console.log(formData);
			button.addLoading();
			axios.post("/demo", formData).then(function(){}).catch(function(){
				console.log("Error !");
				button.removeLoading();
			});
		},
		children: [
			Padding({
				all: 10,
				bottom: 20,
				child: textbox
			}),
			Padding({
				all: 10,
				bottom: 20,
				child: password
			}),
			Padding({
				all: 10,
				bottom: 20,
				child: Center({
					child: button
				})
			})
		]
	});

	body = new Center({
		child: new SizedBox({
			width: 500,
			height: 500,
			// child: form
			child: new Row({
				children: [
					modalTrigger,
					modal
				]
			})
		}),	
	});

	return new Page({
		drawer: drawer,
		header: header,
		body: body
	});
}
rootNode.appendChild(new App().element);