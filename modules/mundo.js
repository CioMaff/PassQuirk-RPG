// modules/mundo.js
import { EmbedBuilder } from 'discord.js';
import { players } from './jugadores.js';
import { worldMap, items } from './datos.js';

export async function handleExplorar(message, args) {
  try {
    const player = players[message.author.id];
    if (!player) {
      return message.reply("❌ Aún no has comenzado tu aventura. Usa /start para iniciar.");
    }

    let location;
    if (args.length > 0) {
      const requestedLocation = args.join(' ').toLowerCase();
      location = Object.entries(worldMap).find(([name, info]) => 
        name.toLowerCase() === requestedLocation || info.alias.some(alias => alias.toLowerCase() === requestedLocation)
      );
      
      if (!location) {
        return message.reply("❌ Ubicación no encontrada. Usa /mapa para ver las ubicaciones disponibles.");
      }
      
      if (player.level < info.minLevel) {
        return message.reply(`❌ Tu nivel es muy bajo para explorar esta zona. Necesitas ser nivel ${info.minLevel} o superior.`);
      }
      
      location = location[1];
    } else {
      const availableLocations = Object.entries(worldMap).filter(([_, info]) => player.level >= info.minLevel);
      location = availableLocations[Math.floor(Math.random() * availableLocations.length)][1];
    }

    const embed = new EmbedBuilder()
      .setColor('#1E90FF')
      .setTitle(`🌍 Explorando: ${location.name}`)
      .setDescription(location.description)
      .addFields(
        { name: '📊 Nivel Recomendado', value: `${location.minLevel}-${location.maxLevel}` }
      );

    const eventChance = Math.random();
    if (eventChance > 0.7) {
      // Encuentro con enemigo
      const enemy = location.enemies[Math.floor(Math.random() * location.enemies.length)];
      embed.addFields({ name: '⚠️ ¡Cuidado!', value: `Has encontrado un ${enemy.name}. Usa /luchar para enfrentarlo.` });
      player.currentEnemy = enemy;
    } else {
      // Encontrar item
      const itemChance = Math.random();
      if (itemChance > 0.5) {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        player.items.push(randomItem.name);
        const coinsGained = Math.floor(Math.random() * 50) + 10;
        player.passCoin += coinsGained;
        
        const itemEmbed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('🎁 ¡Tesoro Encontrado!')
          .setDescription(`Has encontrado: ${randomItem.name}`)
          .addFields(
            { name: '💸 PassCoins Ganadas', value: `+${coinsGained}` },
            { name: '💰 Balance Total', value: `${player.passCoin} PassCoins` }
          );
        
        await message.reply({ embeds: [embed, itemEmbed] });
      } else {
        embed.addFields({ name: '👣 Exploración Tranquila', value: 'No has encontrado nada inusual en esta exploración.'});
        await message.reply({ embeds: [embed] });
      }
    }
  } catch (error) {
    console.error('Error en handleExplorar:', error);
    await message.reply('Ocurrió un error durante la exploración. Por favor, inténtalo de nuevo.');
  }
}

export async function handleMapa(message) {
  try {
    const embed = new EmbedBuilder()
      .setColor('#32CD32')
      .setTitle('🗺️ Mapa del Mundo')
      .setDescription('Estos son los lugares que puedes explorar:');

    for (const [name, info] of Object.entries(worldMap)) {
      embed.addFields({ name: name, value: `${info.description}
Nivel: ${info.minLevel}-${info.maxLevel}` });
    }

    embed.setFooter({ text: 'Usa /explorar [nombre del lugar] para visitar uno de estos lugares.' });

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error en handleMapa:', error);
    await message.reply('Ocurrió un error al mostrar el mapa. Por favor, inténtalo de nuevo.');
  }
}