import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { categoryID } = params
	const data = await fetch(`http://dummyjson.com/products/category/${categoryID}`)
	const jsonData = await data.json()
	return json({
		categoryID,
		data:jsonData
	});
};

export const handle = {
	breadcrumb:(data,isLastItem) => {
		if( isLastItem ){
			return <div>Kategori ({data.categoryID})</div>
		}else{
			return <Link to={`/categories/${data.categoryID}/`}>Kategori ({data.categoryID})</Link>
		}
	}
}

export default function CategoryProducts() {
	const loaderData = useLoaderData()
	return (
		<Outlet context={loaderData} />
	)
}
