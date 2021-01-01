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
			this.element.appendChild(child.element);
		},
		setDimension(props){
			if(this.props.width != undefined){
				this.element.style.width = this.props.width + "px";
			}
			if(this.props.height != undefined){
				this.element.style.height = this.props.height + "px";
			}
		},
	}
});