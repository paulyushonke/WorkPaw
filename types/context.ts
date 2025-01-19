import { Context } from "grammy";
import type { ChatMembersFlavor } from "@grammyjs/chat-members";
import type { ConversationFlavor } from "@grammyjs/conversations";
import type { FileFlavor } from "@grammyjs/files";

export type MyContext = FileFlavor<
  Context & ConversationFlavor & ChatMembersFlavor
>;
