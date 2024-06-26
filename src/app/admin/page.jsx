import React from "react";
import Unauthorized from "../(components)/Unauthorized";
import UsersList from "../(components)/UsersList";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Admin() {
	const session = await getServerSession(authOptions);

	const users = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
		cache: "no-store",
		revalidate: 0,
	}).then((res) => res.json());

	if (session?.user?.role !== "admin") {
		return <Unauthorized />;
	}

	return (
		<div className="flex flex-col items-center justify-center w-full h-[100vh-7dvh]">
			<ul className="max-w-[90dvw] w-[50rem] space-y-4 divide-y divide-gray-500 p-5">
				{users.map((user) => (
					<UsersList key={user._id} user={user} />
				))}
			</ul>
		</div>
	);
}
