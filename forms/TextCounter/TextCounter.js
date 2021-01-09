import x from "x";
import Div from "../../core/Div/Div.js";
import Empty from "../../core/Empty/Empty.js";

import css from "./TextCounter.css";

export default x({
	name: "TextCounter",
	css: css,
	data: {
		counterNode: null,
	},
	render(){
		this.counterNode = new Div({
			classNames: "counter_container",
			child: new Empty({}),
		});

		return this.counterNode.element;
	},
	methods: {
		setCounter(first, second){
			if (second == undefined) {
				this.counterNode.setChild(first);
			}else{
				this.counterNode.setChild(first + "/" + second);
			}
		},
		removeCounter(){
			this.counterNode.setChild("");
		}
	}
});