import { Link, useLocation, useSearchParams } from "@remix-run/react";

export const blogList = [
	{
		id: 123,
		title: "Blog 1",
		yorumlar: [
			{
				id: 123,
				title: 'Blog 1 yorum 1'
			},
			{
				id: 234,
				title: 'Blog 1 yorum 2'
			}
		]
	},
	{
		id: 234,
		title: "Blog 2",
		yorumlar: [
			{
				id: 123,
				title: 'Blog 2 yorum 1'
			},
			{
				id: 234,
				title: 'Blog 2 yorum 2'
			}
		]
	},
	{
		id: 456,
		title: "Blog 3",
		yorumlar: [
			{
				id: 123,
				title: 'Blog 3 yorum 1'
			},
			{
				id: 234,
				title: 'Blog 3 yorum 2'
			}
		]
	}
]

export default function Blog() {
	// const location = useLocation()
	// const params = new URLSearchParams(location.search)
	const [searchParams,setSearchParams] = useSearchParams()

	return (
		<div>
			<h1>Blog Listesi</h1>
			<div style={{ display: 'flex', flexDirection: 'column', rowGap: 15 }}>
				{blogList.map(blog => <Link key={blog.id} to={`/blog/${blog.id}/`}>{blog.title}</Link>)}
			</div>
			<hr />
			{JSON.stringify(searchParams.get('page'))}
			<hr />
			<button onClick={() => setSearchParams((prev) => {
				prev.set('filter','asc')
				return prev
			})}>Ekle</button>
			<button onClick={() => {
				const params = new URLSearchParams()
				params.set('name','hasan')
				params.set('yas','12')
				setSearchParams(params)
			}}>Tamamını değiştir</button>
		</div>
	)
}
