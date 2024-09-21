// modules/comandos.js
import { handleStart, handleCrearPersonaje } from './passquirk-bot.js';
import { handleAyuda } from './ayuda.js';
import { handlePersonaje } from './personaje.js';
import { handleNewQuirk } from './newquirk.js';
import { handleBalance, handleTienda, handleComprar } from './economia.js';
import { handleLuchar } from './sistemalucha.js';
import { handleExplorar, handleMapa } from './mundo.js';
import { handleItems } from './items.js';
import { handlePassQuirk } from './passquirk.js';
import { handleEntrenamiento } from './entrenamiento.js';
import { handleGachapon } from './gachapon.js';
import { handleCasino } from './casino.js';
import { handleReset } from './reset.js';
import { handleTutorial } from './tutorial.js';
import { handleNivel } from './niveles.js';

export async function handleCommands(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith('/')) return;

  const args = message.content.slice(1).split(/ +/);
  const command = args.shift().toLowerCase();

  try {
    switch(command) {
      case 'start':
        await handleStart(message);
        break;
      case 'ayuda':
        await handleAyuda(message);
        break;
      case 'crearpersonaje':
        await handleCrearPersonaje(message);
        break;
      case 'personaje':
        await handlePersonaje(message);
        break;
      case 'newquirk':
        await handleNewQuirk(message);
        break;
      case 'nivel':
        await handleNivel(message);
        break;
      case 'balance':
        await handleBalance(message);
        break;
      case 'tienda':
        await handleTienda(message);
        break;
      case 'comprar':
        await handleComprar(message, args);
        break;
      case 'luchar':
        await handleLuchar(message);
        break;
      case 'explorar':
        await handleExplorar(message, args);
        break;
      case 'items':
        await handleItems(message);
        break;
      case 'passquirk':
        await handlePassQuirk(message);
        break;
      case 'mapa':
        await handleMapa(message);
        break;
      case 'entrenamiento':
        await handleEntrenamiento(message);
        break;
      case 'gachapon':
        await handleGachapon(message);
        break;
      case 'casino':
        await handleCasino(message);
        break;
      case 'reset':
        await handleReset(message);
        break;
      case 'tutorial':
        await handleTutorial(message, args);
        break;
      default:
        message.reply('Comando no reconocido. Usa /ayuda para ver la lista de comandos.');
    }
  } catch (error) {
    console.error('Error al procesar el comando:', error);
    await message.reply('Ocurrió un error al procesar tu comando. Por favor, inténtalo de nuevo.');
  }
}