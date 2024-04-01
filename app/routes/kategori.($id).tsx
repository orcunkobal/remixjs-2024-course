import { useParams } from "react-router"

export default function KategoriWithId() {
	const {id} = useParams()
	return (
		<div>
			{id ? "Kategori Detay" : "Kategori Liste"}<br/>
			<img src="/assets/norvey.jpg" alt="" />
		</div>
	)
}
