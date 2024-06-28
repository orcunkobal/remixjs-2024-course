
export function loginUser(username,password){
	return new Promise((resolve) => {
		setTimeout(() => {
			if( username == "orcun" && password == "111" ){
				resolve("123kjasdlkajsdlkjasdömnzxljasd")
			}else{
				resolve(null)
			}
		}, 1500);
	})
}

export function getUserInfo(token){
	return new Promise((resolve) => {
		setTimeout(() => {
			if( token == "123kjasdlkajsdlkjasdömnzxljasd" ){
				resolve({
					id:10123123,
					name:"Orçun"
				})
			}else{
				resolve(null)
			}
		}, 1500);
	})
}