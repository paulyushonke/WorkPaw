import { z } from "@parsedog/sdk";
import { extractData } from "@parsedog/sdk";

export async function extractDataFromFile({ file_url }: { file_url: string }) {
  console.log("FILE URL", file_url);
  try {
    const data = await extractData({
      schema: z.object({
        text: z.string({
          description: "Extract all text from the file",
        }),
      }),
      document: file_url,
    });
    console.log("DATA", data);
    return { status: true, data };
  } catch (e) {
    console.log("ERROR", e);
    return { status: false };
  }
}
