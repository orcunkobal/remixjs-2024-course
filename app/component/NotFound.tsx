import { Link } from "@remix-run/react";

export default function NotFound({error}) {
  return (
	<div style={{position:"fixed",color:"#fff",top:0,left:0,right:0,bottom:0,width:"100%",height:"100%",background:"#000",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
		<div>{error.status} - {error.data.errorMessage}</div>
		<div><Link to="/">Anasyafa git</Link></div>
	</div>
  )
}
