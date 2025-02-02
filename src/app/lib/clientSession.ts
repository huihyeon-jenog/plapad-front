"use client";

type UserType = {
  token?: string;
  socialType: string;
  name: string;
  email: string;
  avatar?: string;
}

export function getUserInfo():UserType | null {
  const user = localStorage.getItem("user");

  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
}

export function setUserInfo(user: UserType) {
  "use client"
  if (user.hasOwnProperty('token')) {
    delete user.token;
  }

  localStorage.setItem("user", JSON.stringify(user));
}

export function deleteUserInfo() {
  localStorage.removeItem("user");
}