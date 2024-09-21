// modules/passquirk.js
import { EmbedBuilder } from 'discord.js';
import { passQuirks } from './datos.js';

export async function handlePassQuirk(message) {
  try {
    const embed = new EmbedBuilder()
      .setColor('#9932CC')
      .setTitle('🔮 PassQuirk Existentes')
      .setDescription('Estas son las PassQuirk conocidas en el mundo:');

    passQuirks.forEach(quirk => {
      embed.addFields({ name: quirk.name, value: `${quirk.description}
Clases Afines: ${quirk.classes.join(', ')}` });
    });

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error en handlePassQuirk:', error);
    await message.reply('Ocurrió un error    al mostrar las PassQuirk. Por favor, inténtalo de nuevo.');
  }
}