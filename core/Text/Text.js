import x from "x";
export default x({
	name: "Text",
	render(){
		let element = document.createElement("div");
		element.classList.add("text");
		element.style.fontSize = "16px";
		element.style.fontWeight = "normal";
		return element;
	},
	mounted(){
		this.setChild(this.props.child);
	},
	methods: {
		setChild(child){
			if(typeof child == "string"){
				this.element.textContent = child;
			}else if(child.element !== undefined){
				this.element.appendChild(child);
			}
		}
	}
});