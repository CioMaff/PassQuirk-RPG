// modules/casino.js
import { EmbedBuilder } from 'discord.js';
import { players } from './jugadores.js';

export async function handleCasino(message) {
  try {
    const player = players[message.author.id];
    if (!player) {
      return message.reply("❌ Aún no has comenzado tu aventura. Usa /start para iniciar.");
    }

    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setTitle('🎰 Bienvenido al Casino')
      .setDescription('Elige un juego para apostar:')
      .addFields(
        { name: '🎲 Ruleta', value: 'Apuesta a un número y gira la ruleta.' },
        { name: '🃏 Blackjack', value: 'Juega contra el crupier y llega lo más cerca posible a 21.' }
      )
      .setFooter({ text: 'Usa /ruleta o /blackjack para jugar.' });

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error en handleCasino:', error);
    await message.reply('Ocurrió un error al acceder al casino. Por favor, inténtalo de nuevo.');
  }
}