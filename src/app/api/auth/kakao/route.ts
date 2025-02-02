import {createToken} from "@/app/lib/session";
import {redirect} from "next/navigation";

export async function GET(request:Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const param = {
    socialType: 'KAKAO',
    code
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include', // 쿠키를 포함한 요청
    body: JSON.stringify(param)
  })

  if (response.ok) {
    const user = await response.json();
    console.log(user,"user");
    await createToken(user.data.token);
    return Response.json({status: 'success'}, redirect("/"));
  } else {
    return Response.json({status: 'fail'}, redirect("/login"));
  }
}

