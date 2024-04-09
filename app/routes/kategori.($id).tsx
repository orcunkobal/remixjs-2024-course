import { LoaderFunction, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = (context) => {
	console.log(context)
	const {data,params} = context
	
	return [
		{ title: data.meta.title },
		{ name: "description", content: data.meta.description },
		{ name: "keywords", content: data.meta.keywords },
	];
};

export const loader:LoaderFunction = async () => {
	//api istedği yaptık
	const data = {
		meta:{
			title:"Kategori",
			description:"Kategori Remix kursuna hoşgeldin",
			keywords:"kategori,remix, 2024, kurs" 
		}
	}
	return data
}

export default function KategoriWithID() {
  return (
	<div>kategori.($id)</div>
  )
}
