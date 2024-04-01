import { Link, Outlet } from "@remix-run/react";

export default function Hakkimizda() {
  return (
	<div>
		<h1>Hakkımızda</h1>
		<div style={{display:'flex',columnGap:20}}>
			<div style={{display:'flex',flexDirection:'column',rowGap:10}}>
				<Link to="/hakkimizda/tarihce/">Tarihçe</Link>
				<Link to="/hakkimizda/vizyonumuz/">Vizyonumuz</Link>
				<Link to="/hakkimizda/misyonumuz/">Misyonumuz</Link>
			</div>
			<div style={{backgroundColor:"#f1f1f1",padding:10,width:"100%"}}>
				<Outlet />
			</div>
		</div>
	</div>
  )
}
