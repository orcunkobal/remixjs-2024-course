import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
	return { indexLoaderData: {} }
}

export const action: ActionFunction = async () => {
	return {}
}

export const shouldRevalidate = (context) => {
	const formData = context.formData
	const _action = formData?.get("_action")
	const currentPage = context.currentUrl.searchParams?.get("page")
	const nextPage = context.nextUrl.searchParams?.get("page")
	if( currentPage == nextPage )
		return false
	if (_action == "kullanici_ekle")
		return false
	return context.defaultShouldRevalidate
}

export default function Index() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", display: "flex",flexDirection:"column" }}>
			<div style={{display:"flex"}}>
				<div style={{display:"flex",flexDirection:"column",background:"#f1f1f1",width:"100%"}}>
					<h1>Kullanıcı Ekle</h1>
					<Form method="POST">
						<input type="text" name="isim" /><br />
						<button name="_action" value="kullanici_ekle" type="submit">Ekle</button>
					</Form>
				</div>
				<div style={{display:"flex",flexDirection:"column",background:"black",color:"#f1f1f1",width:"100%"}}>
					<h1>Kullanıcı Sil</h1>
					<Form method="POST">
						<input type="text" name="isim" /><br />
						<button name="_action" value="kullanici_sil" type="submit">Sil</button>
					</Form>
				</div>
			</div>
			<div style={{display:"flex",flexDirection:"column"}}>
				<Link to="/?page=1">Sayfa 1</Link>
				<Link to="/?page=2">Sayfa 2</Link>
				<Link to="/?page=3">Sayfa 3</Link>
				<Link to="/?page=3">Sayfa 4</Link>
			</div>
		</div>
	);
}
