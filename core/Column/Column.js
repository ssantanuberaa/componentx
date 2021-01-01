import x from "x";
export default x({
	name: "Column",
	render(){
		let element = document.createElement("div");
		element.classList.add("column");
		let style = element.style;
		style.display = "flex";
		style.flexDirection = "column";
		style.height = "inherit";
		style.width = "inherit";
		return element;
	},
	mounted(){
		if(this.props.children != undefined && this.props.children.length > 0)
			this.appendChildren(this.props.children);
	},
	methods:{
		appendChildren: function(children){
			children.forEach(function(childComponent){
				if(childComponent.element !== undefined)
					this.element.appendChild(childComponent.element);
			}.bind(this));
		},	
	}
});