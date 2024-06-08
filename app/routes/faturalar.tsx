import { Outlet } from "@remix-run/react";
import { Link } from "react-router-dom";

export default function Faturalar() {
  return (
	<div style={{display:"flex",flexDirection:"column",rowGap:20}}>
		<h1>Fatura Bilgileri</h1>
		<div style={{display:"flex",flexDirection:"row"}}>
			<div style={{backgroundColor:"#f1f1f1",display:'flex',flexDirection:"column",padding:20,width:"100%"}}>
				<h1>Fatura Listesi</h1>
				<div style={{display:'flex',flexDirection:"column",rowGap:10}}>
					<Link to="/faturalar/1">Fatura 1</Link>
					<Link to="/faturalar/2">Fatura 2</Link>
					<Link to="/faturalar/3">Fatura 3</Link>
					<Link to="/faturalar/4">Fatura 4</Link>
				</div>
			</div>
			<Outlet/>
		</div>
	</div>
  )
}
