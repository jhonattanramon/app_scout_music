import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const searchParams = request.nextUrl.searchParams;
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const code =  searchParams.get("code");
    const state =  searchParams.get("state");
    const redirect_uri = process.env.REDIRECT_URI;
    const token_uri = process.env.TOKEN_URI || null;
  
    // const storedState = req.cookies ? req.cookies["stateKey"] : null;
    async function redirection() {
      try {
        if (!token_uri) {
          throw new Error("ocorre um error inesperado");
        }

      return await axios
          .post(
            token_uri,
            {
              code: code,
              redirect_uri: redirect_uri,
              grant_type: "authorization_code",
            },
            {
              headers: {
                "content-type": "application/x-www-form-urlencoded",
                Authorization:
                  "Basic " +
                  Buffer.from(client_id + ":" + client_secret).toString(
                    "base64"
                  ),
              },
            }
          )
          .then(({ data }) => {
            return NextResponse.redirect(`http://192.168.0.7:3000/home/${data.access_token}/${data.refresh_token}`)
          });
      } catch (err) {
        return NextResponse.json({
          error: err
        })
      }
    }

    if (code) {
     return  await redirection();
    } else {
        return NextResponse.json("ocorreu um error")
    }
}