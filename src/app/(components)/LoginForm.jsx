"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginForm() {
	const router = useRouter();
	const [error, setError] = useState("");
	const { data: session } = useSession();

	useEffect(() => {
		if (session) {
			router.push("/dashboard");
		}
		if (session === null) {
			router.replace("/");
		}
	}, [session, router]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		const formData = new FormData(event.target);
		const email = formData.get("email");
		const password = formData.get("password");
		if (!email || !password) {
			setError("Please enter all fields");
			return;
		}
		try {
			const res = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			if (!res.ok) {
				setError("Invalid Credentials");
				return;
			} else if (res.ok) {
				router.push("/dashboard");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="form mb-3">
				<label htmlFor="email">Email</label>
				<input type="email" id="email" name="email" placeholder="email" />
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="password"
				/>
				<button type="submit">Log In</button>
				{error !== "" && (
					<span className="flex justify-center">
						<p className="field-error">{error}</p>
					</span>
				)}
			</form>
			<p className="text-center p-0 m-0">
				No account?{" "}
				<Link
					className="text-slate-200 border border-slate-800 bg-slate-700 font-bold bubble hover:bg-slate-500 hover:border-opacity-30 transition-all duration-75 ease-linear"
					href="/signup"
				>
					Sign Up
				</Link>
			</p>
		</>
	);
}
