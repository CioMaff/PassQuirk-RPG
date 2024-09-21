// modules/sistemalucha.js
import { EmbedBuilder } from 'discord.js';
import { players } from './jugadores.js';

export async function handleLuchar(message) {
  try {
    const player = players[message.author.id];
    if (!player) {
      return message.reply("❌ Aún no has comenzado tu aventura. Usa /start para iniciar.");
    }

    if (!player.currentEnemy) {
      return message.reply("❌ No hay ningún enemigo para luchar. Usa /explorar para encontrar uno.");
    }

    const enemy = player.currentEnemy;
    let playerHealth = player.stats.resistance * 10;
    let enemyHealth = enemy.health;

    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('⚔️ ¡Combate Iniciado!')
      .setDescription(`Te enfrentas a un ${enemy.name} de nivel ${enemy.level}`);

    await message.reply({ embeds: [embed] });

    while (playerHealth > 0 && enemyHealth > 0) {
      const playerDamage = Math.floor(Math.random() * player.stats.strength) + 1;
      const enemyDamage = Math.floor(Math.random() * enemy.attack) + 1;

      playerHealth -= enemyDamage;
      enemyHealth -= playerDamage;

      await message.channel.send(`🗡️ Causaste ${playerDamage} de daño. 🛡️ El enemigo te causó ${enemyDamage} de daño.`);
    }

    if (playerHealth > 0) {
      const expGained = enemy.level * 10;
      const coinsGained = enemy.level * 5;
      player.exp += expGained;
      player.passCoin += coinsGained;

      const victoryEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('🎉 ¡Victoria!')
        .setDescription(`Derrotaste al ${enemy.name} de nivel ${enemy.level}`)
        .addFields(
          { name: '🌟 Experiencia Ganada', value: `${expGained} EXP` },
          { name: '💸 PassCoins Ganadas', value: `+${coinsGained}` },
          { name: '💰 Balance Total', value: `${player.passCoin} PassCoins` }
        );

      // Probabilidad de obtener un item
      if (Math.random() > 0.7) {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        player.items.push(randomItem.name);
        victoryEmbed.addFields({ name: '🎁 ¡Item Obtenido!', value: randomItem.name });
      }

      await message.reply({ embeds: [victoryEmbed] });
    } else {
      const coinsLost = Math.floor(player.passCoin * 0.1); // Pierde el 10% de sus PassCoins
      player.passCoin = Math.max(0, player.passCoin - coinsLost);

      const defeatEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('😢 Derrota')
        .setDescription('Has sido derrotado. Descansa y vuelve más fuerte.')
        .addFields(
          { name: '💸 PassCoins Perdidas', value: `${coinsLost}` },
          { name: '💰 Balance Restante', value: `${player.passCoin} PassCoins` }
        );

      await message.reply({ embeds: [defeatEmbed] });
    }

    player.currentEnemy = null; // Resetea el enemigo actual
  } catch (error) {
    console.error('Error en handleLuchar:', error);
    await message.reply('Ocurrió un error durante el combate. Por favor, inténtalo de nuevo.');
  }
}