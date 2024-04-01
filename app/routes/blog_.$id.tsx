import { Link, useParams } from "@remix-run/react";
import { blogList } from "./blog";

export default function BlogDetay() {
	const {id} = useParams()
	const blog = blogList.find(blog => blog.id == id)
	return (
		<div>
			<h1>Blog Detay</h1>
			<Link to="/blog/">Blog Listesi</Link>
			<hr />
			# {blog?.id}<br/>
			{blog?.title}<br/>
			<Link to={`/blog/${blog?.id}/yorumlar/`}>Blog Yorumları</Link>
		</div>
	)
}
