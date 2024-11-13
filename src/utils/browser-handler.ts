import open from "open";

export default async function openBrowser(uri: string) {
  try {
    await open(uri); // Opens the default browser with the specified URI
    console.log(`Browser opened with URI: ${uri}`);
  } catch (error) {
    console.error("Failed to open browser:", error);
  }
}
