import { extractData, z } from "@parsedog/sdk";

export async function extractDataFromFile({ file_url }: { file_url: string }) {
  try {
    const data = await extractData({
      schema: z.object({
        text: z.string({
          description: "Extract all text from the file",
        }),
      }),
      document: file_url,
    });
    return { status: true, data };
  } catch (e) {
    console.error("Data extraction error:", e);
    return { status: false };
  }
}
