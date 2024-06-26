import type { LoaderFunctionArgs } from "@remix-run/node";


export const loader = async ({ request }: LoaderFunctionArgs) => {
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve("ok")
		}, 1500);
	})
	return null;
};

export default function Hakkimizda() {
	return (
		<div>hakkimizda</div>
	)
}
