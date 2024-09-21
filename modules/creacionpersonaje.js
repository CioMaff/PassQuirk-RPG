// creacionpersonaje.js
import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';
import { saveCharacter, getCharacter } from './database.js'; // Asume que tienes un módulo de base de datos

const CLASSES = ['Arquero 🏹', 'Ninja 🥷', 'Espadachín ⚔️', 'Guerrero 🛡️', 'Mago 🧙‍♂️'];

export async function handleStart(message) {
  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('🌟 Bienvenido a PassQuirk RPG 🌟')
    .setDescription('¡Comienza tu aventura creando tu personaje!')
    .addField('Cómo empezar', 'Haz clic en el botón "Crear Personaje" para comenzar.');

  const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('create_character')
        .setLabel('Crear Personaje')
        .setStyle('PRIMARY')
    );

  await message.reply({ embeds: [embed], components: [row] });
}

export async function handleCrearPersonaje(message) {
  await startCharacterCreation(message);
}

export async function handleCharacterCreation(interaction) {
  await interaction.deferReply({ ephemeral: true });
  await startCharacterCreation(interaction);
}

async function startCharacterCreation(context) {
  const userId = context.author ? context.author.id : context.user.id;
  const existingCharacter = await getCharacter(userId);

  if (existingCharacter) {
    await replyToContext(context, '¡Ya tienes un personaje creado! Usa /personaje para ver tus detalles.');
    return;
  }

  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('🎨 ¡Hora de Crear tu Personaje! 🎨')
    .setDescription('Responde a las siguientes preguntas para dar vida a tu personaje:')
    .addField('Nombre 🏷️', '¿Cómo te llamarás en este mundo?')
    .addField('Género 🚹🚺', '¿Serás un hombre o una mujer?')
    .addField('Apariencia 🪞', 'Describe tu apariencia. ¿Cómo te verás?')
    .addField('Historia 📜', 'Cuéntanos tu historia. ¿De dónde vienes? ¿Qué te ha traído aquí?')
    .addField('Clase 🛡️🏹⚔️', `Escoge una de las siguientes clases:\n${CLASSES.join('\n')}`);

  await replyToContext(context, { embeds: [embed] });

  const filter = m => m.author.id === userId;
  const collector = context.channel.createMessageCollector({ filter, time: 300000, max: 5 });

  let characterInfo = {};

  collector.on('collect', async (m) => {
    const currentField = Object.keys(characterInfo).length;
    const fields = ['nombre', 'genero', 'apariencia', 'historia', 'clase'];

    characterInfo[fields[currentField]] = m.content;

    if (currentField === 4) {
      if (!CLASSES.includes(m.content)) {
        await m.reply('Clase no válida. Por favor, elige una de las clases listadas.');
        delete characterInfo.clase;
      } else {
        collector.stop();
      }
    }
  });

  collector.on('end', async (collected) => {
    if (collected.size < 5) {
      await replyToContext(context, 'Tiempo agotado o información incompleta. Por favor, intenta crear tu personaje de nuevo.');
    } else {
      await saveCharacter(userId, characterInfo);
      const successEmbed = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle('✨ ¡Personaje Creado con Éxito! ✨')
        .setDescription('Tu personaje está listo para la aventura.')
        .addField('Siguiente Paso', 'Usa el comando /newquirk para obtener tu poder único y comenzar tu viaje.');

      await replyToContext(context, { embeds: [successEmbed] });
    }
  });
}

async function replyToContext(context, content) {
  if (context.reply) {
    await context.reply(content);
  } else if (context.editReply) {
    await context.editReply(content);
  }
}