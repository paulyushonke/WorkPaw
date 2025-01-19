# WorkPaw OCR Bot 🐾

A friendly Telegram bot that helps you extract text from images and PDFs. Ask questions about your documents, and get answers right away! Not every file might work perfectly, but it does its best! Max file size is 20MB.

## What Can It Do? 

- 📝 Extract text from PDFs, PNGs, and JPEGs
- ❓ Ask questions about your documents
- 🔗 Process files from URLs too
- 🤖 Super easy to use with a simple menu

## Tech Behind It

- Bun
- Grammy (Telegram Bot Framework)
- ParseDog SDK
- DrizzleORM
- TypeScript

## Quick Start

### Prerequisites
- Create a Telegram bot via [@BotFather](https://t.me/botfather)
- Install [Bun](https://bun.sh)

1. Clone it
```bash
git clone https://github.com/yourusername/workpaw-ocr-bot.git
cd workpaw-ocr-bot
```

2. Install stuff
```bash
bun install
```

3. Create `.env` and add your token
```env
BOT_TOKEN=your_telegram_bot_token
NOTIFICATIONS_BOT_TOKEN=your_notifications_bot_token
```

4. Run it!
```bash
bun start
```

## How to Use

1. Find the bot on Telegram
2. Send any PDF or image
3. Pick what you want:
   - Extract: Get all the text
   - Answer: Ask questions about your document

## Want to Help?

Feel free to jump in! Open an issue or submit a PR if you want to help make this bot even better. No fancy rules - just be cool and write good code! 😎

## Thanks to

- [@parsedog](https://parsedog.io) for the awesome OCR
- [Grammy](https://grammy.dev) for making bot development fun
