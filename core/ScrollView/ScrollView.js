import x from "x";

export default x({
	name: "ScrollView",
	render(){
		let element = document.createElement("div");
		element.classList.add("scroll_view");
		element.style.height = "inherit";
		element.style.width = "inherit";
		element.style.overflowY = "scroll";
		return element;
	},
	mounted(){
		if(this.props.child != undefined){
			this.element.appendChild(this.props.child.element);
		}
	}
});