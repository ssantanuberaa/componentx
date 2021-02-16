import x from "x";

export default x({
	name: "SizedBox",
	render(){
		let element = document.createElement("div");
		element.classList.add("sized_box");
		return element;
	},
	mounted(){
		this.appendChild(this.props.child);		
		this.setDimension(this.props);
	},
	methods:{
		appendChild(child){
			if(child == undefined){
				return;
			}
			this.element.appendChild(child.element);
		},
		setDimension(props){
			let width = this.props.width;
			let height = this.props.height;
			if(width != undefined){
				if(typeof width == "string"){
					this.element.style.width = this.props.width;
				}else if(!isNaN(width)){
					this.element.style.width = this.props.width + "px";	
				}
			}
			if(height != undefined){
				if(typeof height == "string"){
					this.element.style.height = this.props.height;
				}else if(!isNaN(height)){
					this.element.style.height = this.props.height + "px";	
				}
			}
		},
	}
});