// passquirk-bot.js
import { Client, GatewayIntentBits } from 'discord.js';
import { handleCommands } from './comandos.js';
import { handleInteractions } from './interacciones.js';
import { handleStart, handleCrearPersonaje, handleCharacterCreation } from './creacionPersonaje.js';
import dotenv from 'dotenv';

// Configuration
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Event Handlers
client.once('ready', () => {
  console.log('PassQuirk RPG Bot está en línea!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  if (message.content.toLowerCase() === '!start') {
    await handleStart(message);
  } else {
    await handleCommands(message, { handleCrearPersonaje });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton() && interaction.customId === 'create_character') {
    await handleCharacterCreation(interaction);
  } else {
    await handleInteractions(interaction);
  }
});

// Bot Login
client.login(process.env.DISCORD_TOKEN).catch(error => {
  console.error('Error al iniciar sesión del bot:', error);
});