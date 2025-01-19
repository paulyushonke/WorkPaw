import { Menu } from "@grammyjs/menu";
import type { MyContext } from "../types/context";
import { InputFile } from "grammy";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { filesTable } from "../db/schema";
import { extractDataFromFile } from "../utils/extractData";

let message: { message_id: number } | undefined;

export const menu = new Menu<MyContext>("menu")
  .text("Extract", async (ctx) => {
    if (message) {
      await ctx.deleteMessages([message.message_id]);
    }
    const sticker = await ctx.replyWithSticker(
      new InputFile("assets/stickers/a2.tgs")
    );
    const chatMember = ctx.from.id;
    const db_result = await db
      .select({ field1: filesTable.file_url })
      .from(filesTable)
      .where(eq(filesTable.user_id, chatMember.toString()));
    const { field1 } = db_result[0];
    if (!field1) {
      await ctx.deleteMessages([sticker.message_id]);
      await ctx.reply("Please share a valid file to extract data from.");
      return;
    }
    const result = await extractDataFromFile({ file_url: field1 });
    if (result.status && result.data?.text) {
      await ctx.deleteMessages([sticker.message_id]);
      await ctx.reply(result.data.text);
    } else {
      await ctx.deleteMessages([sticker.message_id]);
      await ctx.reply("Sorry, I couldn't extract data from this file.");
    }
  })
  .row()
  .text("Answer", async (ctx) => {
    await ctx.conversation.enter("answerQuestion").then(() => {
      if (message) {
        ctx.deleteMessages([message.message_id]);
      }
    });
  })
  .row();
