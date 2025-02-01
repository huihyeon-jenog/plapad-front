import {createToken, deleteUserInfo, setUserInfo} from "@/app/lib/session";
import {redirect} from "next/navigation";

export async function GET(request:Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const param = {
    socialType: 'GOOGLE',
    code
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include', // 쿠키를 포함한 요청
    body: JSON.stringify(param)
  })

  if (response.ok) {
    const user = await response.json();
    await createToken(user.data.token);
    // await setUserInfo(user.data);
    return Response.json({status: 'success'}, redirect("/"));
  } else {
    // await deleteUserInfo();
    return Response.json({status: 'fail'}, redirect("/login"));
  }
}

