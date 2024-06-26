import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
	Link,
	Links,
	Meta,
	NavLink,
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
				<div id="navbar" style={{ display: 'flex', columnGap: 20, backgroundColor: '#f1f1f1', marginBottom: 30, padding: 10 }}>
					<NavLink to="/" style={({isActive}) => isActive ? {fontWeight:"bold"} : {}}>Anasayfa</NavLink>
					<NavLink to="/hakkimizda" end className={({isActive}) => isActive ? "font-black" : ""}>
						{({isPending}) => (
							<span className={isPending ? "text-red-800 animate-spin" : ""}>Hakkımızda {isPending && "yükleniyor"}</span>
						)}
					</NavLink>
					<NavLink to="/hakkimizda/tarihce" className={({isActive}) => isActive ? "font-black" : ""}>
						{({isPending}) => (
							<span className={isPending ? "text-red-800 animate-spin" : ""}>Tarihçe {isPending && "yükleniyor"}</span>
						)}
					</NavLink>
					<NavLink to="/iletisim" >
						{({isActive}) => (
							<span className={isActive ? "font-bold" : ""}>İletişim</span>
						)}
					</NavLink>
					<NavLink to="/DuYarli-LiNk" caseSensitive>
						{({isActive}) => (
							<span>Duyarlı Link {isActive ? "aktif" : "pasif"}</span>
						)}
					</NavLink>
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
