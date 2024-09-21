// modules/items.js
import { EmbedBuilder } from 'discord.js';
import { players } from './jugadores.js';

export async function handleItems(message) {
  try {
    const player = players[message.author.id];
    if (!player) {
      return message.reply("❌ Aún no has comenzado tu aventura. Usa /start para iniciar.");
    }

    const embed = new EmbedBuilder()
      .setColor('#1E90FF')
      .setTitle('🎒 Tu Inventario')
      .setDescription(player.items.length > 0 ? 'Estos son los items que posees:' : 'Tu inventario está vacío.');

    if (player.items.length > 0) {
      const itemCounts = player.items.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});

      for (const [item, count] of Object.entries(itemCounts)) {
        embed.addFields({ name: `${getItemEmoji(item)} | ${item}`, value: `x${count}`, inline: true });
      }
    }

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error en handleItems:', error);
    await message.reply('Ocurrió un error al mostrar tu inventario. Por favor, inténtalo de nuevo.');
  }
}

function getItemEmoji(itemName) {
  const emojiMap = {
    'Poción de Vida': '🧪',
    'Poción de Energía': '⚗️',
    'Espada Encantada': '⚔️',
    'Escudo Mágico': '🛡️',
    'Amuleto de Poder': '🏺',
    'Gema de Habilidad': '💎'
  };
  return emojiMap[itemName] || '📦';
}