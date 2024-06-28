import { createCookie } from "@remix-run/node";

export const authCookie = createCookie("auth-cookie",{
	httpOnly:true,
	sameSite:"lax",
	path:"/",
	secure:process.env.NODE_ENV === "production",
	secrets:["s3cre!_"],
	maxAge:60 * 60 * 24 * 7
})