// index.js
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';
import { handleCommands } from './modules/comandos.js';
import { handleInteractions } from './modules/interacciones.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.once('ready', () => {
  console.log('PassQuirk RPG Bot está listo!');
});

client.on('messageCreate', handleCommands);
client.on('interactionCreate', handleInteractions);

client.login(process.env.process.env.MTI4NjMyMTIzMTc0MTU4NzQ4OQ.GjzhDY.Sy6Xo0PayJJ2VYYyQyKAblOxzfRRAV1ohzyUkA);