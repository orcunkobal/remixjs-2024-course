import { Link, useOutletContext } from "@remix-run/react";

export default function CategoryProductsIndex() {
	const loaderData = useOutletContext()
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			{loaderData.data.products.map(products => <Link key={products.id} to={`/categories/${loaderData.categoryID}/${products.id}/`}>
				<img src={products.images[2]} style={{ width: 100 }} />
				{products.title}
			</Link>)}
		</div>
	)
}
