// modules/gachapon.js
import { EmbedBuilder } from 'discord.js';
import { players } from './jugadores.js';
import { passQuirks, items } from './datos.js';

export async function handleGachapon(message) {
  try {
    const player = players[message.author.id];
    if (!player) {
      return message.reply("❌ Aún no has comenzado tu aventura. Usa /start para iniciar.");
    }

    const gachaCost = 100;
    if (player.passCoin < gachaCost) {
      return message.reply(`❌ Necesitas ${gachaCost} PassCoins para usar el gachapón. Actualmente tienes ${player.passCoin} PassCoins.`);
    }

    player.passCoin -= gachaCost;

    const passQuirkChance = Math.random();
    if (passQuirkChance > 0.99) {
      const randomPassQuirk = passQuirks[Math.floor(Math.random() * passQuirks.length)];
      player.passQuirk = randomPassQuirk.name;

      const embed = new EmbedBuilder()
        .setColor('#FFD700')
        .setTitle('🌟 ¡PassQuirk Obtenida!')
        .setDescription(`¡Increíble! Has obtenido la PassQuirk: ${randomPassQuirk.name}`)
        .addFields({ name: '📜 Descripción', value: randomPassQuirk.description });

      await message.reply({ embeds: [embed] });
    } else {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      player.items.push(randomItem.name);

      const embed = new EmbedBuilder()
        .setColor('#1E90FF')
        .setTitle('🎁 ¡Objeto Obtenido!')
        .setDescription(`Has obtenido: ${randomItem.name}`)
        .addFields(
          { name: '🏷️ Rareza', value: randomItem.rarity },
          { name: '✨ Efecto', value: randomItem.effect }
        );

      await message.reply({ embeds: [embed] });
    }
  } catch (error) {
    console.error('Error en handleGachapon:', error);
    await message.reply('Ocurrió un error al usar el gachapón. Por favor, inténtalo de nuevo.');
  }
}