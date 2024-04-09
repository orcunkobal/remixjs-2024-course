import { ActionFunction, LoaderFunction, json } from "@remix-run/node";

export const loader:LoaderFunction = async ({request,params}) => {
	// console.log(params.id)
	// console.log(new URL(request.url).searchParams.get('page'))
	//console.log(request.headers.get('auth'))
	const data = await fetch('https://dummyjson.com/products/')
	const jsonData = await data.json()
	return json(jsonData,{
		status:404,
	})
}

export const action:ActionFunction = async({request,params}) => {
 	// console.log(params.id,"paramsID")
	// console.log(new URL(request.url).searchParams.get('page'),"searchParams")
	// console.log(request.headers.get('auth'),"header")
	const formData = await request.formData()
	return json(Object.fromEntries(formData),{
		status:200
	})
}