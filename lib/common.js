export function getUnit(value){
	if(isNaN(value) == true){
		return value;
	}else{
		return value + "px";
	}
}
export function validateFormData(data, validations){
	if(validations == undefined || validations == null || validations == ""){
		return true;
	}
	let hasError = false;
	let keys = Object.keys(validations);
	for(let i=0; i<keys.length; i++){
		let validationName = keys[i];
		if (validationName == "required") {
			if (data == "" || data == undefined || data == null) {
				hasError = true;
				return validations.required.message;
			}
		}else if (validationName == "email") {
			const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			if (!pattern.test(data)){
				hasError = true;
				return validations.email.message;
			}
		}else if (validationName == "number") {
			let d = Number(data);
			if (isNaN(d) == true) {
				hasError = true;
				return validations.number.message;
			}
		}else if(validationName == "minvalue"){
			let d = Number(data);
			if(d < validations.minvalue.value){
				return validations.number.message;
			}
		}else if(validationName == "mindigit"){
			if(value.length < validations.mindigit.value){
				return validations.mindigit.message;
			}
		}
	}

	return true;
}