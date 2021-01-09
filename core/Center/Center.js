import x from "x";

export default x({
	name: "Center",
	render(){
		let element = document.createElement("div");
		element.classList.add("center");
		let style = element.style;
		style.height = "inherit";
		style.width = "inherit";
		style.display = "flex";
		return element;
	},
	mounted(){
		if(this.props.child !== undefined){
			this.element.appendChild(this.props.child.element);
		}else if(this.props.text !== undefined){
			this.element.textContent = this.props.text;
		}

		let d = this.props.direction;
		let style = this.element.style;
		if(d == undefined || d == "both"){
			style.justifyContent = "center";
			style.alignItems = "center";
		}else if(d == "horizontal"){
			style.justifyContent = "center";
		}else if(d == "vertical"){
			style.alignItems = "center";
		}
	},
});