// modules/niveles.js
import { EmbedBuilder } from 'discord.js';
import { players } from './jugadores.js';

export async function handleNivel(message) {
  try {
    const player = players[message.author.id];
    if (!player) {
      return message.reply("❌ Aún no has comenzado tu aventura. Usa /start para iniciar.");
    }

    const expNeeded = player.level * 100;
    if (player.exp >= expNeeded) {
      player.level++;
      player.exp -= expNeeded;
      player.stats.strength += 2;
      player.stats.agility += 2;
      player.stats.resistance += 2;
      player.stats.magicControl += 2;

      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('🎊 ¡Subida de Nivel!')
        .setDescription(`Has alcanzado el nivel ${player.level}`)
        .addFields(
          { name: '💪 Nuevas Estadísticas', value: `
            Fuerza: ${player.stats.strength}
            Agilidad: ${player.stats.agility}
            Resistencia: ${player.stats.resistance}
            Control Mágico: ${player.stats.magicControl}
          `}
        );

      await message.reply({ embeds: [embed] });
    } else {
      await message.reply(`📊 Necesitas ${expNeeded - player.exp} puntos de experiencia más para subir al siguiente nivel.`);
    }
  } catch (error) {
    console.error('Error en handleNivel:', error);
    await message.reply('Ocurrió un error al procesar tu nivel. Por favor, inténtalo de nuevo.');
  }
}