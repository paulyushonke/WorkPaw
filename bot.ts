import { bot } from "./config/bot";
import { createConversation } from "@grammyjs/conversations";
import { answerQuestion } from "./conversations/answerQuestion";
import { commands } from "./conversations/commands";
import { menu } from "./handlers/menuHandlers";
import { handleFile } from "./handlers/fileHandler";
import {
  handleStart,
  handleCommands,
  handleContact,
} from "./handlers/commandHandlers";
import { webhookCallback } from "grammy";

bot.use(createConversation(answerQuestion));
bot.use(createConversation(commands));
bot.use(menu);

bot.on([":file", ":document", ":photo", "::url"], handleFile);
bot.command("start", handleStart);
bot.command("commands", handleCommands);
bot.command("contact", handleContact);

bot.start({
  allowed_updates: ["chat_member", "message", "callback_query"],
});

export default webhookCallback(bot, "bun");
