import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useMatches,
} from "@remix-run/react";

import appCss from './app.css?url'

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


export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<div style={{ display: 'flex', columnGap: 20, backgroundColor: '#f1f1f1', marginBottom: 30, padding: 10 }}>
					<Link to="/">Anasayfa</Link>
					<Link to="/hakkimizda/" prefetch="intent">Hakkımızda (intent)</Link>
					<Link to="/hakkimizda/" prefetch="render">Hakkımızda (render)</Link>
				</div>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
