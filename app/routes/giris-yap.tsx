import type { LoaderFunctionArgs } from "@remix-run/node";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import classNames from "classnames";
import { useEffect } from "react";
import { getUserInfo, loginUser } from "~/contoller/auth.controller.server";
import { authCookie } from "~/cookie/auth-cookie.server";


export const loader = async ({ request }: LoaderFunctionArgs) => {
	const cookie = request.headers.get("Cookie")
	const token = await authCookie.parse(cookie)
	const userInfo = await getUserInfo(token)
	if( userInfo?.id > 0 ){
		return redirect("/")
	}
	return null;
};


export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData(),
		username = formData.get("username"),
		password = formData.get("password"),
		action = formData.get("_action")

	const token = await loginUser(username, password)
	if (token != null) {
		return redirect("/", {
			headers: {
				"Set-Cookie": await authCookie.serialize(token)
			}
		})
	}else{
		return json({
			errorMessage:"Kullanıcı adı veya şifre yanlış, lütfen tekrar deneyin...",
			action
		})
	}
}

export default function GirisYap() {
	const actionData = useActionData()
	const navigation = useNavigation()
	const isPending = navigation.state === "submitting" && navigation.formData?.get("_action") == "loginUser"
	useEffect(() => {
		if( actionData?.errorMessage && actionData.action == "loginUser" ){
			document.getElementById("error-message")?.classList.remove("hidden")
		}
	},[actionData])
	function handleSumbit(e){
		const target:HTMLFormElement = e.target

		target[0].classList.remove("border-red-500")
		target[1].classList.remove("border-red-500")
		document.getElementById("error-message")?.classList.add("hidden")

		if( target[0].value == "" && target[1].value == "" ){
			e.preventDefault()
			target[0].classList.add("border-red-500")
			target[1].classList.add("border-red-500")
		}

	}
	return (
		<div>
			<div className="text-4xl mb-5">Anasayfa</div>
			<div id="error-message" className="hidden border border-red-700 bg-red-300 p-3 mb-4 text-center text-xl">{actionData?.errorMessage}</div>
			<Form onSubmit={handleSumbit} method="POST" className="flex flex-col space-y-4">
				<input type="text" name="username" placeholder="Kullanıcı adı" className="outline-none px-3 py-4 border-2 border-gray-400 text-xl" />
				<input type="password" name="password" placeholder="Şifre" className="outline-none px-3 py-4 border-2 border-gray-400 text-xl" />
				<button disabled={isPending} name="_action" value="loginUser" type="submit" className={classNames("bg-gray-600 text-white text-xl py-5",{
					"opacity-50" : isPending
				})}>
					{isPending ? "Lütfen bekleyin" : "Giriş Yap"}
				</button>
			</Form>
		</div>
	)
}
