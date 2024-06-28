import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { authCookie } from "~/cookie/auth-cookie.server";


export const loader = async ({ request }: LoaderFunctionArgs) => {
	return redirect("/",{
		headers:{
			"Set-Cookie" : await authCookie.serialize(null)
		}
	})
};
