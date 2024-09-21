// modules/reset.js
import { players } from './jugadores.js';

export async function handleReset(message) {
  try {
    delete players[message.author.id];
    await message.reply("✅ Tu personaje ha sido reiniciado. Usa /start para comenzar una nueva aventura.");
  } catch (error) {
    console.error('Error en handleReset:', error);
    await message.reply('Ocurrió un error al reiniciar tu personaje. Por favor, inténtalo de nuevo.');
  }
}