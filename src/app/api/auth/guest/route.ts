import {createToken} from "@/app/lib/session";
import {redirect} from "next/navigation";

export async function GET() {
  await createToken("GUEST");
  return Response.json({status: 'success'}, redirect("/"));
}

