import type { MyContext } from "../types/context";
import { format } from "@formkit/tempo";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { notificationsBot } from "../config/bot";

export async function handleStart(ctx: MyContext) {
  await ctx.conversation.exit("answerQuestion");
  ctx.reply(
    "🐾 Meow there, fur-iend! Welcome to WorkPaw OCR Bot! 🐾\n\nSimply send a file, photo, or URL to extract data or get answers to your questions. Supported formats are PDF, PNG, and JPEG.\n\nYou can control me by sending these commands:\n/start - Start the bot\n/commands - List available commands\n/contact - Contact the developer\n\nHappy text extracting!"
  );
  const chatMember = await ctx.chatMembers.getChatMember();
  const ifExists = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.user_id, chatMember.user.id.toString()));
  if (ifExists.length === 0) {
    await db.insert(usersTable).values({
      user_id: chatMember.user.id.toString(),
      first_name: chatMember.user.first_name,
      last_name: chatMember.user.last_name,
      username: chatMember.user.username,
      language_code: chatMember.user.language_code,
      added: new Date(),
    });
    notificationsBot.api.sendMessage(
      611963420,
      `🔥New user\nUser: ${chatMember.user.first_name} ${
        chatMember.user.last_name
      }\nUsername: ${chatMember.user.username}\nAdded: ${format(new Date(), {
        date: "full",
        time: "short",
      })}`
    );
  }
}

export async function handleCommands(ctx: MyContext) {
  await ctx.conversation.exit("answerQuestion");
  await ctx.conversation.enter("commands");
}

export async function handleContact(ctx: MyContext) {
  await ctx.conversation.exit("answerQuestion");
  ctx.reply("For any queries or feedback, please contact me\n@paulyushonke");
}
