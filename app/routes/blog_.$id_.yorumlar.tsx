import { useParams } from "react-router"
import { blogList } from "./blog"

export default function BlogYorumlar() {
	const { id } = useParams()
	const blog = blogList.find(blog => blog.id == id)
	return (
		<div style={{ display: 'flex', flexDirection: 'column', rowGap: 15 }}>
			{blog?.yorumlar.map(yorum => <div key={yorum.id}>{yorum.title}</div>)}
		</div>
	)
}
