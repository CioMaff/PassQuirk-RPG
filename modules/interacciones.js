// modules/interacciones.js
import { handleCharacterCreation } from './passquirk-bot.js';
import { handleHelpCategory } from './ayuda.js';

export async function handleInteractions(interaction) {
  try {
    if (interaction.isButton()) {
      if (interaction.customId === 'create_character') {
        await handleCharacterCreation(interaction);
      }
    } else if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'help_category') {
        await handleHelpCategory(interaction);
      }
    }
  } catch (error) {
    console.error('Error al manejar la interacción:', error);
    if (interaction.isRepliable()) {
      await interaction.reply({ content: 'Ocurrió un error al procesar tu interacción. Por favor, inténtalo de nuevo.', ephemeral: true });
    }
  }
}