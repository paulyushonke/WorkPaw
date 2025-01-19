import type { MyConversation } from "../types/conversation";
import type { MyContext } from "../types/context";
export async function commands(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply(
    "List of commands available:\n\n/start - Start the bot\n/commands - List of commands available\n/contact - Contact the developer"
  );
}
