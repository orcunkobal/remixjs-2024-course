import { Link } from "@remix-run/react";

export default function Index() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", display: "flex",flexDirection:"column" }}>
			<div style={{height:2000,background:"gray"}}></div>
			<Link to="/hakkimizda/" prefetch="viewport">Hakkımızda</Link>
		</div>
	);
}
