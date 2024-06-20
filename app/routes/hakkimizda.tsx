import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";


export const loader = async ({ request }: LoaderFunctionArgs) => {
	const data = await new Promise((resolve) => {
		setTimeout(() => {
			resolve("ok")
		}, 3000);
	})
	return json(data);
};


export default function Hakkimizda() {
	const laoderData = useLoaderData()
	return (
		<div>
			{JSON.stringify(laoderData)}
		</div>
	)
}
