import { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useNavigation,
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
		},
	]
}


export function Layout({ children }: { children: React.ReactNode }) {
	const navigation = useNavigation()	
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{navigation.state === "loading"  && <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,width:"100%",height:"100%",display:'flex',justifyContent:'center',alignItems:'center',background:'rgba(255,255,255,.8)'}}>Yükleniyor</div>}
				<div style={{ display: 'flex', columnGap: 20, backgroundColor: '#f1f1f1', marginBottom: 30, padding: 10 }}>
					<Link to="/">Anasayfa</Link>
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
