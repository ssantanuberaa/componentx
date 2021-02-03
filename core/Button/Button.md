# Button
It creates a button element.
```javascript
import button from "x/core/Button/Button.js";

let button = new Button({
	material_icon: "clock",
	text: "Click Me",
	onClick: function(){
		console.log("Button Clicked");
	}
});

button.onClick = function(event){
	console.log("Button Clicked");
};
```

# Methods
## addLoading()
When called, shows a loading symbol on the button, the text and icon is removed from the dom, and brought back when you remove the loading by calling **removeLoading()** method.

## removeLoading()
When called, it removes the loading symbol from the button and brings back the icon and text.

## disable()
When called, button enters in disable state.

## enable() 
When called, the button enters in enable state allowing user to perform click.

# Callbacks
## onClick
To assign a click handler callback you can also override onClick method. This method is called when the button is clicked.

# Properties
## icon
This contains icon component of the button.

## disabled
This property is **true** when button is in disabled state. **false** otherwise.

## buttonTextNode
This property contains **span** element which contains the text of the button.