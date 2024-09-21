// modules/economia.js
import { EmbedBuilder } from 'discord.js';
import { players } from './jugadores.js';

export async function handleBalance(message) {
  try {
    const player = players[message.author.id];
    if (!player) {
      return message.reply("❌ Aún no has comenzado tu aventura. Usa /start para iniciar.");
    }

    const embed = new EmbedBuilder()
      .setColor('#FFD700')
      .setTitle('💰 Tu Balance')
      .setDescription(`Tienes ${player.passCoin} 💸 PassCoins.`)
      .setFooter({ text: 'Usa /tienda para ver los objetos disponibles para comprar.' });

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error en handleBalance:', error);
    await message.reply('Ocurrió un error al mostrar tu balance. Por favor, inténtalo de nuevo.');
  }
}

export async function handleTienda(message) {
  try {
    const embed = new EmbedBuilder()
      .setColor('#4B0082')
      .setTitle('🛒 Tienda de PassQuirk RPG')
      .setDescription('Compra objetos para tu aventura.')
      .addFields(
        { name: '🧪 Poción de Vida', value: '50 PassCoins' },
        { name: '⚗️ Poción de Energía', value: '75 PassCoins' },
        { name: '🗡️ Espada Básica', value: '100 PassCoins' },
        { name: '🏹 Arco Largo', value: '150 PassCoins' },
        { name: '🔨 Martillo de Guerra', value: '200 PassCoins' },
        { name: '🪄 Vara Mágica', value: '250 PassCoins' }
      );

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error en handleTienda:', error);
    await message.reply('Ocurrió un error al mostrar la tienda. Por favor, inténtalo de nuevo.');
  }
}

export async function handleComprar(message, args) {
  try {
    const player = players[message.author.id];
    if (!player) {
      return message.reply("❌ Aún no has comenzado tu aventura. Usa /start para iniciar.");
    }

    const item = args.join(' ').toLowerCase();
    const itemPrices = {
      'poción de vida': 50,
      'poción de energía': 75,
      'espada básica': 100,
      'arco largo': 150,
      'martillo de guerra': 200,
      'vara mágica': 250
    };

    if (itemPrices[item]) {
      if (player.passCoin >= itemPrices[item]) {
        player.passCoin -= itemPrices[item];
        player.items.push(item);
        await message.reply(`✅ Has comprado ${item} por ${itemPrices[item]} PassCoins.`);
      } else {
        await message.reply("❌ No tienes suficientes PassCoins para comprar este objeto.");
      }
    } else {
      await message.reply("❓ Objeto no encontrado. Usa /tienda para ver los objetos disponibles.");
    }
  } catch (error) {
    console.error('Error en handleComprar:', error);
    await message.reply('Ocurrió un error al procesar tu compra. Por favor, inténtalo de nuevo.');
  }
}