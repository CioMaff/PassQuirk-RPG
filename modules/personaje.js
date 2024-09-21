// modules/personaje.js
import { EmbedBuilder } from 'discord.js';
import { players } from './jugadores.js';

export async function handlePersonaje(message) {
  try {
    const player = players[message.author.id];
    if (!player) {
      return message.reply("❌ Aún no has creado un personaje. Usa /crearpersonaje para comenzar.");
    }

    const embed = new EmbedBuilder()
      .setColor('#FFD700')
      .setTitle(`JUGADOR: ${player.name.toUpperCase()}`)
      .setThumbnail(player.image || message.author.displayAvatarURL())
      .addFields(
        { name: '📈 Nivel', value: player.level.toString(), inline: true },
        { name: '🌟 Experiencia', value: player.exp.toString(), inline: true },
        { name: '🔮 Quirk', value: player.quirk ? `${player.quirk.name} (Rango ${player.quirk.rank})` : 'Ninguno', inline: true },
        { name: '🏆 PassQuirk', value: player.passQuirk || 'Ninguna', inline: true },
        { name: '🏹 Clase', value: player.class_type || 'No asignada', inline: true },
        { name: '⚧ Género', value: player.gender || 'No especificado', inline: true },
        { name: '👤 Apariencia', value: player.appearance || 'No especificada' },
        { name: '📜 Historia', value: player.backstory || 'No especificada' },
        { name: '💸 PassCoins', value: player.passCoin.toString(), inline: true },
        { name: '💪 Estadísticas', value: `
          ⚔️ Fuerza: ${player.stats.strength}
          🏃‍♂️ Agilidad: ${player.stats.agility}
          🛡️ Resistencia: ${player.stats.resistance}
          🔮 Control Mágico: ${player.stats.magicControl}
        ` }
      )
      .setFooter({ text: 'Usa /ayuda para ver más comandos disponibles' });

    if (player.image) {
      embed.setImage(player.image);
    }

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error en handlePersonaje:', error);
    await message.reply('Ocurrió un error al mostrar tu personaje. Por favor, inténtalo de nuevo.');
  }
}

export async function handleImage(message, args) {
  try {
    const player = players[message.author.id];
    if (!player) {
      return message.reply("❌ Aún no has creado un personaje. Usa /crearpersonaje para comenzar.");
    }

    if (args.length === 0) {
      return message.reply("❌ Debes proporcionar el ID de la imagen. Uso: /image [ID de la imagen]");
    }

    const imageId = args[0];
    const imageUrl = `https://cdn.discordapp.com/attachments/${imageId}`;

    player.image = imageUrl;

    await message.reply("✅ Imagen de personaje actualizada con éxito.");
  } catch (error) {
    console.error('Error en handleImage:', error);
    await message.reply('Ocurrió un error al actualizar la imagen de tu personaje. Por favor, inténtalo de nuevo.');
  }
}