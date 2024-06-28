import type { LoaderFunctionArgs } from "@remix-run/node";
import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useMatches,
	useNavigation,
} from "@remix-run/react";

import appCss from './app.css?url'
import { authCookie } from "./cookie/auth-cookie.server";
import { getUserInfo } from "./contoller/auth.controller.server";

export const links: LinksFunction = () => {
	return [
		{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico'
		},
		{
			rel: 'stylesheet',
			href: appCss
		}
	]
}


export const loader = async ({ request }: LoaderFunctionArgs) => {
	const cookie = request.headers.get("Cookie")
	const token = await authCookie.parse(cookie)
	const userInfo = await getUserInfo(token)
	return json({userInfo});
};



export function Layout({ children }: { children: React.ReactNode }) {
	const navigation = useNavigation()
	const {userInfo} = useLoaderData()
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{navigation.state == "loading" && <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-center text-white text-3xl">Yükleniyor</div>}
				<div style={{ display: 'flex', columnGap: 20, backgroundColor: '#f1f1f1', marginBottom: 30, padding: 10 }}>
					<Link to="/">Anasayfa</Link>
					{userInfo?.id > 0
						? (<div className="ml-auto flex divide-x-2 divide-gray-500">
							<div className="pr-2">Hoşgeldin, {userInfo.name}</div>
							<Link className="pl-2" to="/cikis-yap">Çıkış Yap</Link>
						</div>)
						: <Link to="/giris-yap">Giriş Yap</Link>}
					
				</div>
				<div className="container mt-5 mx-auto border border-gray-500 bg-gray-200 p-10">
					{children}
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
