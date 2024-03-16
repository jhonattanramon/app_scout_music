import { generateRandomString } from "@/src/utils/generateRandomString";
import { NextResponse } from "next/server";
import { stringify } from "querystring";


export async function GET(req:Request){
    const scope = process.env.SCOPES;
    const client_id = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    const state = generateRandomString(16);

   return NextResponse.redirect(
      "https://accounts.spotify.com/authorize?" +
        stringify({
          response_type: "code",
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        })
    );

}