import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { productID } = params
	const data = await fetch(`http://dummyjson.com/products/${productID}`)
	const jsonData = await data.json()
	return json(jsonData);
};

export const handle = {
	breadcrumb:(data) => {		
		return <div>{data.title}</div>
	}
}

export default function Product() {
	const loaderData = useLoaderData()
	return (
		<div>
			<img src={loaderData.images[2]} style={{width:200}} />
			<h1>{loaderData.title}</h1>
			<p>{loaderData.description}</p>
		</div>
	)
}
