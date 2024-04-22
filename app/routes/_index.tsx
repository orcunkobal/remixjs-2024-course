import { LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";

export const loader: LoaderFunction = async ({request}) => {
	const searchParams = new URL(request.url).searchParams
	const skipParams = searchParams?.get('skip') 
	let skip = 0
	if( skipParams != null ) skip = skipParams
	const data = await fetch(`https://dummyjson.com/products/?limit=5&skip=${skip}`)
	const jsonData = await data.json()
	return json(jsonData)
}

export default function Index() {
	const loaderData = useLoaderData()
	console.log(loaderData)
	const [params] = useSearchParams()
	const navigate = useNavigate()
	const skipParamsRaw = params?.get('skip')
	const skipPage = (skipParamsRaw != null && parseInt(skipParamsRaw) >= 0 ) ? parseInt(skipParamsRaw) : 0
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<div style={{display:'flex',flexWrap:'wrap'}}>
					{loaderData.products.map(product => <Link key={product.id} to={`/product/${product.id}`}>
						<img src={product.thumbnail} alt={product.title} style={{width:200,height:200}} />
						<p>{product.title} - {product.brand}</p>
					</Link>)}
			</div>
			<div style={{display:'flex',justifyContent:'space-between'}}>
				<button 
				disabled={skipPage == 0} 
				onClick={() => {
					const prevPage = skipPage - 5
					let prevPageUrl = `/?skip=${prevPage}`
					if( prevPage == 0 ) prevPageUrl = '/'
					navigate(prevPageUrl)
				}}>Geri</button>
				<button 
				disabled={( loaderData.skip + loaderData.limit ) == loaderData.total}
				onClick={() => navigate(`/?skip=${skipPage + 5}`)}>İleri</button>
			</div>
		</div>
	);
}
