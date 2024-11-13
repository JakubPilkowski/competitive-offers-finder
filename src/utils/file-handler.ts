import { promises as fs } from "fs";
import * as path from "path";

export async function saveObjectToFile(
  obj: Record<string, unknown>,
  fileName: string
): Promise<void> {
  try {
    const filePath = path.join(__dirname, fileName);
    const jsonData = JSON.stringify(obj, null, 2); // Convert the object to a JSON string with indentation
    await fs.writeFile(filePath, jsonData, "utf-8"); // Write JSON string to file
    console.log("Object saved to file successfully.");
  } catch (error) {
    console.error("Error saving object to file:", error);
  }
}

export async function getObjectFromFile(
  fileName: string
): Promise<Record<string, unknown> | null> {
  try {
    const filePath = path.join(__dirname, fileName);
    const jsonData = await fs.readFile(filePath, "utf-8"); // Read JSON file as a string
    const obj = JSON.parse(jsonData); // Parse JSON string to object
    console.log("Object retrieved from file:", obj);
    return obj;
  } catch (error) {
    console.error("Error retrieving object from file:", error);
    return null;
  }
}
