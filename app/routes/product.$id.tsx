import { LoaderFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export const loader: LoaderFunction = async ({ params }) => {
	const id = params.id
	const data = await fetch(`https://dummyjson.com/products/${id}`)
	const jsonData = await data.json()
	if( Math.random() > .3 ){
		throw json({
			errorMessage:"Aradığınız sayfa bulunamadı"
		},{
			status:404
		})
	}
	return json(jsonData)
}

export default function ProductDetail() {
	const loaderData = useLoaderData()
	return (
		<div>
			<img src={loaderData.thumbnail} alt={loaderData.title} />
			<p>{loaderData.title} - {loaderData.brand}</p>
		</div>
	)
}
