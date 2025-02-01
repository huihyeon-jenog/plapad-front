'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function createToken(userToken: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  (await cookies()).set(
    'token',
    userToken, {
      path: '/',
      expires: expiresAt,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    }
  )
}

export async function deleteToken() {
  (await cookies()).delete('token');
  redirect("/login");
}

export async function getToken() {
  return (await cookies()).get('token')?.value;
}

export async function setUserInfo(user: {
  token?: string;
  name: string;
  email: string;
  avatar?: string;
}) {
  "use client"
  if (user.hasOwnProperty('token')) {
    delete user.token;
  }

  localStorage.setItem("user", JSON.stringify(user));
}

export async function deleteUserInfo() {
  "use client"

  localStorage.removeItem("user");
}