import type { Update } from "grammy/types";
import webhookCallback from "./bot";

const port = process.env.PORT || 3000;

Bun.serve({
  port,
  fetch(request) {
    return webhookCallback({
      headers: request.headers as Headers,
      json: async () => {
        return (await request.json()) as Update;
      },
    });
  },
});

console.log(`Server is running on port ${port}`);
