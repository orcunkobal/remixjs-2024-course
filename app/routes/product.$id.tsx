import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export const loader: LoaderFunction = async ({ params }) => {
	const id = params.id
	const data = await fetch(`https://dummyjson.com/products/${id}`)
	const jsonData = await data.json()
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
