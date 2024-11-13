import axios from "axios";
import * as dotenv from "dotenv";
import { getObjectFromFile, saveObjectToFile } from "../../utils/file-handler";

dotenv.config();

const allegroAuthUrl = "https://allegro.pl/auth/oauth/device";

const allegroApplicationAuthTokensFileName =
  "allegro-application-auth-tokens.json";

export async function getAccessToken() {
  try {
    const tokens = await getObjectFromFile(
      allegroApplicationAuthTokensFileName
    );

    if (tokens) {
      return tokens.accessToken;
    }

    const newTokens = await generateAccessToken();
    return newTokens.accessToken;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}

export async function refreshAccessToken() {
  try {
    return await generateAccessToken();
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}

async function generateAccessToken(): Promise<Record<string, string>> {
  try {
    const response = await axios.post(
      allegroAuthUrl,
      `grant-type:client_credentials`,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.ALLEGRO_CLIENT_ID}:${process.env.ALLEGRO_CLIENT_SECRET}`
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = response.data;

    const tokens = {
      accessToken: access_token,
    };

    await saveObjectToFile(tokens, allegroApplicationAuthTokensFileName);

    return tokens;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
}
