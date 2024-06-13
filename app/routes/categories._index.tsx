import { Link, useOutletContext } from "@remix-run/react";

export default function CategoriesIndex() {
	const loaderData = useOutletContext()
	return (
		<div style={{ display: "flex", flexDirection: "column", fontSize: 18, rowGap: 10 }}>
			{loaderData.map(category => <Link key={category} to={`/categories/${category}/`}>
				{category}
			</Link>)}
		</div>
	)
}
