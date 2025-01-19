import type { MyContext } from "../types/context";
import { GrammyError } from "grammy";
import { z } from "@parsedog/sdk";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { filesTable } from "../db/schema";
import { menu } from "./menuHandlers";

export async function handleFile(ctx: MyContext) {
  await ctx.conversation.exit("answerQuestion");
  let file_url = "";
  const text = ctx.message?.text;
  const document = ctx.message?.document;
  const photo = ctx.message?.photo;
  const sticker = ctx.message?.sticker;

  if (text) {
    const { success } = await z
      .string()
      .url()
      .safeParseAsync(ctx.message?.text);
    if (success) {
      file_url = text;
    } else {
      await ctx.reply("Please share a valid file to extract data from");
      return;
    }
  } else if (document || photo) {
    console.log("DOCUMENT", document?.mime_type);
    if (
      document?.mime_type !== "application/pdf" &&
      document?.mime_type !== "image/jpeg" &&
      document?.mime_type !== "image/png" &&
      document?.mime_type !== "image/jpg"
    ) {
      await ctx.reply(
        "Sorry, I can only extract data from PDF, PNG, and JPEG files."
      );
      return;
    }
    try {
      const file = await ctx.getFile();
      file_url = new URL(file.getUrl()).toString();
    } catch (e) {
      if (e instanceof GrammyError) {
        if (e.description.toLowerCase().includes("file is too big")) {
          await ctx.reply(
            "Sorry, I can't extract data from files larger than 20MB"
          );
          return;
        }
      }
      console.log("ERROR", e);
      await ctx.reply("Sorry, I couldn't extract data from this file.");
      return;
    }
  } else if (sticker) {
    await ctx.reply(
      "Sorry, I can only extract data from PDF, PNG, and JPEG files."
    );
    return;
  }
  const chatMember = ctx.from?.id ?? 0;
  const isUrl = await db
    .select()
    .from(filesTable)
    .where(eq(filesTable.user_id, chatMember.toString()));
  if (isUrl.length > 0) {
    await db
      .delete(filesTable)
      .where(eq(filesTable.user_id, chatMember.toString()));
  }
  await db.insert(filesTable).values({
    user_id: chatMember.toString(),
    file_url,
    file_id: ctx.message?.document?.file_id,
    added: new Date(),
  });
  const message = await ctx.reply(
    "Please choose the option you want to perform:",
    {
      reply_markup: menu,
    }
  );
}
