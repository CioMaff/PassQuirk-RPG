// modules/entrenamiento.js
import { EmbedBuilder } from 'discord.js';
import { players } from './jugadores.js';

export async function handleEntrenamiento(message) {
  try {
    const player = players[message.author.id];
    if (!player) {
      return message.reply("❌ Aún no has comenzado tu aventura. Usa /start para iniciar.");
    }

    const trainingOptions = ['strength', 'agility', 'resistance', 'magicControl'];
    const randomStat = trainingOptions[Math.floor(Math.random() * trainingOptions.length)];
    const improvement = Math.floor(Math.random() * 3) + 1;

    player.stats[randomStat] += improvement;
    player.exp += 10;

    const embed = new EmbedBuilder()
      .setColor('#FFA500')
      .setTitle('🏋️ Entrenamiento Completado')
      .setDescription(`Has mejorado tu ${randomStat} en ${improvement} puntos.`)
      .addFields(
        { name: '🌟 Experiencia Ganada', value: '10 EXP' },
        { name: `💪 ${randomStat.charAt(0).toUpperCase() + randomStat.slice(1)} Actual`, value: player.stats[randomStat].toString() }
      );

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error en handleEntrenamiento:', error);
    await message.reply('Ocurrió un error durante el entrenamiento. Por favor, inténtalo de nuevo.');
  }
}