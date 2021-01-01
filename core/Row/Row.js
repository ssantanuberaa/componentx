import x from "x";
import css from "./Row.css";
export default x({
	name: "Row",
	css: css,
	render(){
		let element = document.createElement("div");
		element.classList.add("row");
		if(this.props.shrink == true){
			element.classList.add("shrink");
		}else{
			element.classList.add("expand");
		}
		element.style.display = "flex";
		element.style.height = "inherit";
		return element;
	},
	mounted(){
		this.appendChildren(this.props.children);
	},
	methods: {
		appendChild: function(child){
			if(child.element != undefined){
				this.element.appendChild(child.element);	
			}			
		},
		appendChildren: function(children){
			if(children != undefined && children.length > 0){
				children.forEach(function(childComponent){
					this.appendChild(childComponent);
				}.bind(this));
			}
		}
	}
});