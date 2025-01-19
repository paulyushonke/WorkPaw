import { Bot } from "grammy";
import type { MyContext } from "../types/context";
import { hydrateFiles } from "@grammyjs/files";
import { session } from "grammy";
import { conversations } from "@grammyjs/conversations";
import { chatMembers } from "@grammyjs/chat-members";
import { MemorySessionStorage } from "grammy";
import type { ChatMember } from "grammy/types";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

export const notificationsBot = new Bot(
  process.env.NOTIFICATIONS_BOT_TOKEN ?? ""
);
export const bot = new Bot<MyContext>(token);

const adapter = new MemorySessionStorage<ChatMember>();
bot.api.config.use(hydrateFiles(bot.token));

bot.use(
  session({
    initial() {
      return {};
    },
  })
);

bot.use(conversations());
bot.use(chatMembers(adapter));
