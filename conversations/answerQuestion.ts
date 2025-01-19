import { type MyConversation } from "../types/conversation";
import type { MyContext } from "../types/context";
import { InputFile, Context } from "grammy";
import { answerQuestions, z } from "@parsedog/sdk";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { filesTable } from "../db/schema";

export async function answerQuestion(
  conversation: MyConversation,
  ctx: MyContext
) {
  const chatMember = ctx?.from?.id;
  if (!chatMember) {
    await ctx.reply("Chat member not found.");
    return;
  }
  const db_result = await db
    .select({ field1: filesTable.file_url })
    .from(filesTable)
    .where(eq(filesTable.user_id, chatMember.toString()));
  const { field1 } = db_result[0];
  if (!field1) {
    await ctx.reply("File not found");
    return;
  }

  let ask = true;
  let exit = false;
  await ctx.reply(
    "Please enter the questions you want to ask.\nIf you want to stop, just send another file or command."
  );
  while (ask) {
    const question = await conversation.waitUnless(
      Context.has.filterQuery([
        "::bot_command",
        ":file",
        ":document",
        ":photo",
        "::url",
      ]),
      () => {}
    );

    if (!question?.message?.text) {
      return;
    }

    const { success } = await z
      .string()
      .url()
      .safeParseAsync(question.message?.text);
    if (success) {
      conversation.skip();
      return;
    }

    const sticker = await ctx.replyWithSticker(
      new InputFile("assets/stickers/a2.tgs")
    );
    try {
      const [answer] = await answerQuestions({
        questions: [question.message.text],
        document: field1,
      });
      await ctx
        .deleteMessages([sticker.message_id])
        .then(async () => await ctx.reply(answer));
    } catch (e) {
      await ctx.deleteMessages([sticker.message_id]);
      await ctx.reply("Sorry, I couldn't answer this question.");
    }
  }
}
