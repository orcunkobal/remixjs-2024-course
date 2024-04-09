import type { LoaderFunction, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = (context) => {
	console.log(context)
	const {data,matches} = context
	const rootData = matches.find(route => route.id === "root").data

	let keywords = rootData.meta.keywords

	if( data.meta?.keywords )
		keywords = data.meta.keywords

	return [
		{ title: data.meta.title },
		{ name: "description", content: data.meta.description },
		{ name: "keywords", content: keywords },
	];
};


export const loader:LoaderFunction = () => {
	//api istedği yaptık
	const data = {
		meta:{
			title:"Remix Kursu 2024",
			description:"Remix kursuna hoşgeldin"
		}
	}
	return data
}

export default function Index() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>

		</div>
	);
}
