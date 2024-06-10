"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
	const [count, setCount] = useState(3);
	const router = useRouter();
	useEffect(() => {
		if (count > 0) {
			setInterval(() => {
				setCount(count - 1);
			}, 1000);
		}
		setTimeout(() => {
			router.push("/dashboard");
		}, 3000);
	}, [router, count]);

	return (
		<div className="flex flex-col justify-center w-screen h-[calc(100vh-7vh)] items-center">
			<h1 className="text-3xl font-semibold border-4 p-5 border-red-600 rounded-lg bg-red-950 text-zinc-200">
				You are not authorized to view this page
			</h1>
			<p className="text-lg p-3 font-semibold text-zinc-700">
				Redirecting in {count}
			</p>
		</div>
	);
}
