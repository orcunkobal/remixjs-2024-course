import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import MemberItem from "~/components/MemberItem";

//fake liste
let memberList = []

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData()
	const _action = formData.get('_action')

	if (_action == "add_member") {
		//kullanıcıyı ekle
		const createdMember = await new Promise(resolve => {
			setTimeout(() => {
				const name = formData.get('name')
				const createdMember = {
					id: new Date().getTime(),
					name
				}
				memberList.push(createdMember)
				resolve(createdMember)
			}, Math.random() * 1500);
		})
		return json({
			status: 200,
			_action,
			createdMember
		})
	}

	if (_action == "delete_member") {
		//kullanıcıyı sil
		const member_id = formData.get('member_id')
		memberList = await new Promise((resolve) => {
			setTimeout(() => {
				resolve(memberList.filter(member => member.id != member_id))
			}, Math.random() * 2000);
		})
		return json({
			status: 200,
			_action,
			deletedMember: member_id
		})
	}

	return {}
}

export const loader: LoaderFunction = async () => {
	return json(memberList)
}

export default function Index() {
	const actionData = useActionData()
	const loaderData = useLoaderData()
	const navigation = useNavigation()
	const formRef = useRef()
	const isPendingSave = navigation.state == "submitting" && navigation.formData?.get('_action') == "add_member"

	useEffect(() => {
		if( actionData?.status == 200 && actionData["_action"] == "add_member" && formRef?.current !== undefined ){
			formRef.current.reset()
			formRef.current.childNodes[0].focus()
		}
	},[actionData,formRef])

	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<Form method="POST" ref={formRef}>
				<input type="text" name="name" />
				<button disabled={isPendingSave} name="_action" value="add_member" type="submit">Kaydet</button>
			</Form>
			<hr />
			<h1>Kullanıcı Listesi</h1>
			{loaderData.length == 0
				? <div>Kullanıcı bulunamadı</div>
				: loaderData.map(member => <MemberItem key={member.id} member={member} />)}
		</div>
	);
}
