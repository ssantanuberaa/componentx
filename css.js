import { Row, Text, SizedBox, Padding, Column, Center, ScrollView, Expanded, MaterialIcon, Button } from "./components/core/css.js";
import { InputWrapper, PasswordBox } from "./components/forms/css.js";


import Drawer from "./components/drawer/drawer.css";
import Page from "./components/page/page.css";
import Header from "./components/header/header.css";

let css = {
	Row, Text, SizedBox, Padding, Column, Center, ScrollView, Drawer, Page, Expanded, 
	MaterialIcon, Button, Header, InputWrapper, PasswordBox
};
function renderCSS(css){
	let style = "";
	Object.keys(css).forEach(function(item){
		style += css[item];
	});
	let node = document.createElement("style");
	node.setAttribute("type", "text/css");
	node.textContent = style;
	document.documentElement.firstChild.appendChild(node);
	return {};
}
export default renderCSS(css);