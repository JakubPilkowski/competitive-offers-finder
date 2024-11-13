import axios from "axios";
import * as dotenv from "dotenv";
import { getObjectFromFile, saveObjectToFile } from "../../utils/file-handler";
import openBrowser from "../../utils/browser-handler";

dotenv.config();

const allegroDeviceUrl = "https://allegro.pl/auth/oauth/device";

const allegroClientAuthTokensFileName = "allegro-client-auth-tokens.json";

export async function getAccessToken() {
  try {
    const tokens = await getObjectFromFile(allegroClientAuthTokensFileName);

    if (tokens) {
      return tokens.accessToken;
    }

    return await generateAccessToken();
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}

async function generateAccessToken(): Promise<Record<string, string>> {
  try {
    const { deviceCode, interval, verificationUriComplete } =
      await getDeviceCode();

    openBrowser(verificationUriComplete);

    return new Promise((resolve, reject) => {
      const tokenFromDeviceInterval = setInterval(async () => {
        try {
          const tokens = await getTokenFromDeviceCode(deviceCode);

          clearInterval(tokenFromDeviceInterval);

          console.log("Access token received:", tokens);

          await saveObjectToFile(tokens, allegroClientAuthTokensFileName);

          resolve(tokens);
        } catch (error) {
          console.error("Error fetching access token:", error);

          if (
            error?.error !== "authorization_pending" ||
            error?.error !== "slow_down"
          ) {
            clearInterval(tokenFromDeviceInterval);
            reject(error);
          }

          throw error;
        }
      }, interval);
    });
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
}

async function getDeviceCode() {
  try {
    const response = await axios.post(
      allegroDeviceUrl,
      "grant_type=client_credentials",
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

    const { user_code, device_code, interval, verification_uri_complete } =
      response.data;

    return {
      userCode: user_code,
      deviceCode: device_code,
      interval,
      verificationUriComplete: verification_uri_complete,
    };
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
}

const allegroTokenUrl = "https://allegro.pl/auth/oath/token";

async function getTokenFromDeviceCode(
  deviceCode: string
): Promise<Record<string, string>> {
  try {
    const response = await axios.post(
      allegroTokenUrl,
      `grant_type=urn:ietf:params:oauth:grant-type:device_code&device_code=${deviceCode}`,
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

    const { access_token, refresh_token } = response.data;

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  } catch (error) {
    console.error("Error fetching token from device code:", error);
    throw error;
  }
}

export async function refreshAccessToken() {
  try {
    const tokens = await getObjectFromFile(allegroClientAuthTokensFileName);

    if (!tokens) {
      console.error("Refresh token is not available.");
      throw new Error("No refresh token available.");
    }

    const response = await axios.post(
      allegroTokenUrl,
      `grant_type=refresh_token&refresh_token=${tokens.refreshToken}`,
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

    const { access_token, refresh_token } = response.data;

    const newTokens = {
      accessToken: access_token,
      refreshToken: refresh_token,
    };

    await saveObjectToFile(newTokens, allegroClientAuthTokensFileName);

    return newTokens;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}
