import x from "x";
import Center from "xcomponent/core/Center/Center.js";
import Text from "xcomponent/core/Text/Text.js";

import css from "./PageTitle.css";

export default x({
	name: "PageTitle",
	css: css,
	render(){
		let ui = new Center({
			classNames: "page_title",
			child: new Text({child: this.props.title, classNames: "page_title_text"})
		});
		return ui.element;
	}
});