import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserByUsername } from "@/lib/api/user";
import { getSession } from "@/lib/auth/session";

import EditProfileButton from "./_components/EditProfileButton";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  if (!username) {
    throw new Error("Username not found");
  }

  const session = await getSession();

  const userRes = await getUserByUsername(username);
  if (userRes.statusCode !== 200 || !userRes.data) {
    throw new Error("User not found");
  }

  const user = userRes.data;

  return (
    <>
      <div className="flex justify-between rounded-xl border bg-white p-4">
        <div className="flex gap-4">
          <Avatar className="size-36">
            <AvatarImage src={user.profile_image_url} alt={user.full_name} />
            <AvatarFallback>{user.full_name.split(" ")[0][0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="h2-bold">{user.full_name}</h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role: {user.role}</p>
              <p className="text-sm text-gray-500">
                {/* Member since: {new Date(user.created_at).toLocaleDateString()} */}
                Anggota sejak:{" "}
                {new Date(user.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
        {session && session.user.id === user.id && (
          <EditProfileButton
            user={user}
            token={session.accessToken}
            username={username}
          />
        )}
      </div>
    </>
  );
}
