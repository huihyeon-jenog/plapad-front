'use server'

import {cookies} from "next/headers";

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
}

export async function getToken() {
  return (await cookies()).get('token')?.value;
}
