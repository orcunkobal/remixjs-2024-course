import { LoaderFunctionArgs, defer, json } from "@remix-run/node";
import { Await, useAsyncValue, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";


export const loader = async ({ request }: LoaderFunctionArgs) => {
	const productList = new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ id: 1, title: "Product 1", desc: "Description 1" },
				{ id: 2, title: "Product 2", desc: "Description 2" },
				{ id: 3, title: "Product 3", desc: "Description 3" },
				{ id: 4, title: "Product 4", desc: "Description 4" },
				{ id: 5, title: "Product 5", desc: "Description 5" },
				{ id: 6, title: "Product 6", desc: "Description 6" },
			])
		}, 3000);
	})
	return defer({
		productList
	});
};

export default function Index() {
	const {productList} = useLoaderData()
	function ProductsSkeleton(){
		return [1,2,3,4,5,6].map(item => <ProductItemWrapper css="animate-pulse" key={item}>
			<p>Yükleniyor</p>
		</ProductItemWrapper>)
	}
	function ProductList(){
		const list = useAsyncValue()
		return list.map(product => <ProductItemWrapper key={product.id}>
			<p>{product.title}</p>
			<p>{product.desc}</p>
		</ProductItemWrapper>)
	}
	function ProductItemWrapper({children,css=""}){
		return <div className={`${css} bg-[#cccccc] w-[calc(50%_-_1.25rem)] flex flex-col flex-grow h-[200px] justify-center items-center`}>
			{children}
		</div>
	}
	return (
		<div className="flex flex-wrap gap-5 mx-3">
			<Suspense fallback={<ProductsSkeleton />}>
				<Await resolve={productList}>
					{/* {resolvedProductList => <ProductList list={resolvedProductList} />} */}
					<ProductList />
				</Await>
			</Suspense>
		</div>
	);
}
