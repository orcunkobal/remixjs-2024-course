import type { LoaderFunctionArgs } from "@remix-run/node";
import { isRouteErrorResponse, json, useParams, useRevalidator, useRouteError } from "@remix-run/react"


export const loader = async ({ request }: LoaderFunctionArgs) => {
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve("ok")
		}, 1000);
	})
	if( Math.random() > .5 )
		throw json({errorMessage:"hata oluştu"},{status:404})
	return null;
};


export default function FaturaDetay() {
	const { id } = useParams()
	return (
		<div style={{ backgroundColor: "#333", color: "#fff", display: 'flex', flexDirection: "column", padding: 20, width: "100%" }}>
			<h1>Fatura Detay</h1>
			<div>
				Fatura #{id}
			</div>
		</div>
	)
}

export const ErrorBoundary = () => {
	const error = useRouteError()
	const revalidator = useRevalidator()
	if (isRouteErrorResponse(error)) {
		return <div style={{width:"100%",color:"#fff",padding:20,backgroundColor:"red"}}>
			{error.data.errorMessage}<br/>
			<button onClick={() => revalidator.revalidate()} disabled={revalidator.state === "loading"}>Yeniden yükle</button>
		</div>
	}
	return <div>hata oluştu</div>
}

