// modules/ayuda.js
import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

export async function handleAyuda(message) {
  try {
    const embed = new EmbedBuilder()
      .setColor('#FFD700')
      .setTitle('📚 Comandos de PassQuirk RPG')
      .setDescription('Selecciona una categoría para ver los comandos disponibles:');

    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('help_category')
          .setPlaceholder('Selecciona una categoría')
          .addOptions([
            { label: 'Básicos', value: 'basic', description: 'Comandos básicos del juego' },
            { label: 'Personaje', value: 'character', description: 'Comandos relacionados con tu personaje' },
            { label: 'Combate', value: 'combat', description: 'Comandos de combate y entrenamiento' },
            { label: 'Economía', value: 'economy', description: 'Comandos relacionados con la economía del juego' },
            { label: 'Exploración', value: 'exploration', description: 'Comandos para explorar el mundo' },
            { label: 'Otros', value: 'others', description: 'Otros comandos útiles' },
          ])
      );

    const helpMessage = await message.reply({ embeds: [embed], components: [row] });

    const filter = i => i.customId === 'help_category' && i.user.id === message.author.id;
    const collector = helpMessage.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async interaction => {
      const category = interaction.values[0];
      const categoryEmbed = createCategoryEmbed(category);
      await interaction.update({ embeds: [categoryEmbed], components: [row] });
    });

    collector.on('end', () => {
      helpMessage.edit({ components: [] });
    });
  } catch (error) {
    console.error('Error en handleAyuda:', error);
    await message.reply('Ocurrió un error al mostrar la ayuda. Por favor, inténtalo de nuevo.');
  }
}

export async function handleHelpCategory(interaction) {
  const category = interaction.values[0];
  const categoryEmbed = createCategoryEmbed(category);
  await interaction.update({ embeds: [categoryEmbed], components: [interaction.message.components[0]] });
}

function createCategoryEmbed(category) {
  const embed = new EmbedBuilder().setColor('#FFD700');

  switch (category) {
    case 'basic':
      embed.setTitle('📚 Comandos Básicos')
        .setDescription('Estos son los comandos básicos del juego:')
        .addFields(
          { name: '/start', value: 'Inicia tu aventura en PassQuirk RPG' },
          { name: '/crearpersonaje', value: 'Crea tu personaje para comenzar a jugar' },
          { name: '/tutorial', value: 'Muestra información detallada sobre el juego y sus mecánicas' },
          { name: '/ayuda', value: 'Muestra este menú de ayuda' }
        );
      break;
    case 'character':
      embed.setTitle('👤 Comandos de Personaje')
        .setDescription('Comandos relacionados con tu personaje:')
        .addFields(
          { name: '/personaje', value: 'Muestra la información de tu personaje' },
          { name: '/newquirk', value: 'Obtén un nuevo quirk aleatorio' },
          { name: '/nivel', value: 'Muestra tu nivel actual y experiencia' },
          { name: '/image [ID]', value: 'Actualiza la imagen de tu personaje' }
        );
      break;
    case 'combat':
      embed.setTitle('⚔️ Comandos de Combate')
        .setDescription('Comandos relacionados con el combate y entrenamiento:')
        .addFields(
          { name: '/luchar', value: 'Inicia un combate con un enemigo encontrado' },
          { name: '/entrenamiento', value: 'Entrena para ganar experiencia y mejorar tus estadísticas' }
        );
      break;
    case 'economy':
      embed.setTitle('💰 Comandos de Economía')
        .setDescription('Comandos relacionados con la economía del juego:')
        .addFields(
          { name: '/balance', value: 'Muestra tu balance actual de PassCoins' },
          { name: '/tienda', value: 'Muestra los ítems disponibles para comprar' },
          { name: '/comprar [item]', value: 'Compra un ítem de la tienda' },
          { name: '/casino', value: 'Accede a los juegos del casino' }
        );
      break;
    case 'exploration':
      embed.setTitle('🌍 Comandos de Exploración')
        .setDescription('Comandos para explorar el mundo de PassQuirk:')
        .addFields(
          { name: '/explorar [lugar]', value: 'Explora un lugar específico o uno aleatorio' },
          { name: '/mapa', value: 'Muestra el mapa del mundo y las ubicaciones disponibles' }
        );
      break;
    case 'others':
      embed.setTitle('🔧 Otros Comandos')
        .setDescription('Otros comandos útiles:')
        .addFields(
          { name: '/items', value: 'Muestra tu inventario de ítems' },
          { name: '/passquirk', value: 'Información sobre las PassQuirk que has obtenido' },
          { name: '/gachapon', value: 'Usa el gachapón para obtener ítems aleatorios' },
          { name: '/reset', value: 'Reinicia tu progreso (¡usa con precaución!)' }
        );
      break;
  }

  return embed;
}