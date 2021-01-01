import x from "x";
export default x({
	name: "Div",
	render(){
		let element = document.createElement("div");
		
		return element;
	},
	mounted(){
		if(this.props.child !== undefined){
			this.setChild(this.props.child);	
		}
		if(this.props.children !== undefined){
			this.props.children.forEach(function(item){
				this.element.appendChild(item.element);
			}.bind(this))
		}
	},
	methods: {
		removeChild: function(){
			this.element.innerHTML = "";
		},
		setChild: function(child){
			if(child == undefined){
				child = this.props.child;
			}
			if(typeof child == "string"){
				this.element.innerHTML = child;
			}else if(child.element != undefined){
				this.element.appendChild(child.element);	
			}else{
				this.element.appendChild(child);
			}
		}
	}
});