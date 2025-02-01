import {deleteToken} from "@/app/lib/session";
import {redirect} from "next/navigation";
import callAPI from "@/app/lib/callAPI";

export async function GET() {
  await callAPI("POST", "logout");
  await deleteToken();
  return Response.json({status: 'success'}, redirect('/login'));
}