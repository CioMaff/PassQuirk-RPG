// modules/newquirk.js
import { EmbedBuilder } from 'discord.js';
import { players } from './jugadores.js';
import { quirksByClass } from './datos.js';

export async function handleNewQuirk(message) {
  try {
    const player = players[message.author.id];
    if (!player) {
      return message.reply("❌ Aún no has comenzado tu aventura. Usa /start para iniciar.");
    }

    if (!player.class_type) {
      return message.reply("❌ Primero debes elegir una clase. Usa /crearpersonaje para completar tu perfil.");
    }

    const quirksForClass = quirksByClass[player.class_type];
    if (!quirksForClass) {
      return message.reply("❌ Error: Clase no válida. Por favor, contacta a un administrador.");
    }

    const newQuirk = quirksForClass[Math.floor(Math.random() * quirksForClass.length)];
    player.quirk = newQuirk;

    const embed = new EmbedBuilder()
      .setColor('#FFD700')
      .setTitle('🎉 ¡Nuevo Quirk Obtenido!')
      .setDescription(`Has obtenido el poder de ${newQuirk.name} (Rango ${newQuirk.rank})`)
      .setFooter({ text: 'Usa este poder sabiamente en tu aventura.' });

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error en handleNewQuirk:', error);
    await message.reply('Ocurrió un error al obtener un nuevo quirk. Por favor, inténtalo de nuevo.');
  }
}