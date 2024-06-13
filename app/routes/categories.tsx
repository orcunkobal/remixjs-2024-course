import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";


export const loader = async ({ request }: LoaderFunctionArgs) => {
	const data = await fetch('http://dummyjson.com/products/category-list/')
	const jsonData = await data.json()
	return json(jsonData);
};

export const handle = {
	breadcrumb:() => {
		return <Link to="/categories/">Kategoriler</Link>
	}
}


export default function Categories() {
	const loaderData = useLoaderData()
	return (
		<Outlet context={loaderData} />
	)
}
