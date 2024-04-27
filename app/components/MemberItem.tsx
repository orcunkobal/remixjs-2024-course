import { useFetcher } from "@remix-run/react"

export default function MemberItem({ member }) {
	const fetcher = useFetcher()
	function handleDelete(){
		fetcher.submit({
			_action:'delete_member',
			member_id:member.id
		},{
			method:'POST'
		})
	}
	return (
		<div style={{ display: 'flex', columnGap: 10 }} key={member.id}>
			<span>{member.name}</span>
			<button
				onClick={handleDelete}
				disabled={fetcher.formData?.get('_action') == "delete_member" &&
					fetcher.formData?.get('member_id') == member.id}>Sil</button>
			{/* <fetcher.Form method="POST">
				<input type="hidden" name="member_id" value={member.id} />
				<button
					name="_action"
					value="delete_member"
					type="submit"
					disabled={fetcher.formData?.get('_action') == "delete_member" &&
						fetcher.formData?.get('member_id') == member.id}>Sil</button>
			</fetcher.Form> */}
		</div>
	)
}
