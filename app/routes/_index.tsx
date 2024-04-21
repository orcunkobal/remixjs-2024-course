import { LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { useState } from "react";

export const loader:LoaderFunction = async ({request}) => {
	const searchParams = new URL(request.url).searchParams
	const skipParams = searchParams?.get('skip')
	let skip = 0
	if ( skipParams != null ){
		skip = skipParams
	}
	const data = await fetch(`https://dummyjson.com/products/?limit=10&skip=${skip}`)
	const jsonData = await data.json()
	return json(jsonData)
}

export default function Index() {
	const data = useLoaderData()
	const [params] = useSearchParams()
	const navigate = useNavigate()
	const [currentPage,setCurrentPage] = useState((params?.get('skip') != null && parseInt(params?.get('skip')) >=0 ) ? parseInt(params?.get('skip')) : 0)
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<div style={{display:'flex',flexWrap:'wrap'}}>
				{data.products.map(product => <Link key={product.id} to={`/product/${product.id}`}>
					<img src={product.thumbnail} alt={product.title} style={{width:200,height:200}} />
					<p>{product.title} - {product.brand}</p>
				</Link>)}
			</div>
			<div style={{display:'flex',justifyContent:'space-between'}}>
				<button disabled={currentPage == 0} onClick={() => setCurrentPage(value => {
					const prevPage = value - 10
					if( prevPage == 0 ){
						navigate('/')
					}else{
						navigate(`/?skip=${prevPage}`)
					}
					return prevPage
				})}>Geri</button>
				<button disabled={(data.skip + data.limit) == data.total} onClick={() => setCurrentPage(value => {
					const nextPage = value + 10
					navigate(`/?skip=${nextPage}`)
					return nextPage
				})}>İleri</button>
			</div>
		</div>
	);
}
