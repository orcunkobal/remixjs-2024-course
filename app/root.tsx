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
	const matches = useMatches()
	const breadCrumbInfo = matches.filter(item => {
		if( item.handle?.breadcrumb ){
			return item
		}else{
			return null
		}
	})
	console.log(breadCrumbInfo);
	
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
					<Link to="/categories/">Kategoriler</Link>
				</div>
				{breadCrumbInfo.length > 1 && <div style={{backgroundColor:"#f1f1f1",display:"flex",columnGap:10,padding:10,fontWeight:"bold",fontSize:16}}>
					{breadCrumbInfo.map((item,position) => {
						const isLastItem = position == breadCrumbInfo.length - 1
						const breadCrumbElement = item.handle.breadcrumb(item.data,isLastItem)
						if( !isLastItem )
							return <><div key={position}>{breadCrumbElement}</div><div>/</div></>
						return <div key={position}>{breadCrumbElement}</div>
					})}
					</div>}
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
