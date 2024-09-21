// modules/tutorial.js
import { EmbedBuilder } from 'discord.js';

const tutorialSections = {
  historia: {
    title: '📜 Historia del Mundo',
    description: 'Un vasto mundo mágico lleno de fantasía y misterios...',
    fields: [
      { name: '🌍 Mundo', value: 'Compuesto por portales que conectan diferentes regiones...' },
      { name: '🎯 Objetivo', value: 'Derrotar al temible Rey Demonio y encontrar las 10 PassQuirk...' },
    ]
  },
  clases: {
    title: '🏹 Clases y Quirks Básicos',
    description: 'Los jugadores pueden elegir entre 5 clases, cada una con quirks únicos...',
    fields: [
      { name: 'Arquero 🏹', value: 'Quirks: Flecha Ligera (D), Flecha Veloz (C), ...' },
      { name: 'Ninja 🥷', value: 'Quirks: Sigilo Básico (D), Doble Salto (C), ...' },
      { name: 'Espadachín ⚔️', value: 'Quirks: Corte Rápido (D), Defensa Rápida (C), ...' },
      { name: 'Guerrero 🛡️', value: 'Quirks: Golpe Sólido (D), Escudo de Hierro (C), ...' },
      { name: 'Mago 🧙‍♂️', value: 'Quirks: Bola de Fuego (D), Telekinesis (C), ...' },
    ]
  },
  quirks: {
    title: '🔮 PassQuirk (Poderes Potenciados)',
    description: 'Las PassQuirk son objetos extremadamente poderosos y raros...',
    fields: [
      { name: 'Quirk del Fénix', value: 'Potencia habilidades de regeneración y aumenta el poder de fuego...' },
      { name: 'Quirk del Vendaval', value: 'Otorga velocidad extrema y control del viento...' },
      // ... Otros PassQuirks ...
    ]
  },
  mapa: {
    title: '🗺️ Mapa del Mundo',
    description: 'Estos son los lugares que puedes explorar...',
    fields: [
      { name: 'Reino de Akai (Rojo)', value: '🌳 Bosque Encantado (Fácil), 🏞️ Colinas de Akai (Intermedio)' },
      { name: 'Reino de Say (Verde)', value: '📚 Bosque de Say (Fácil), 🏞️ Valle de Say (Intermedio)' },
      { name: 'Reino de Masai (Amarillo)', value: '🛠️ Plaza del Mercado (Fácil), 🏜️ Desierto de Masai (Intermedio)' },
      { name: 'Áreas Especiales', value: '🏔️ Montañas Heladas (Difícil), 🏜️ Desierto de las Ilusiones (Muy Difícil), 👹 Isla del Rey Demonio (Caos)' },
    ]
  },
  items: {
    title: '🎒 Sistema de Ítems',
    description: 'Los ítems ayudan a los jugadores en sus aventuras...',
    fields: [
      { name: 'Pociones de Vida 🧪', value: 'Común: Restaura un pequeño porcentaje de salud.' },
      { name: 'Pociones de Energía ⚗️', value: 'Común: Restaura energía para usar quirks.' },
      { name: 'Armas Raras ⚔️', value: 'Raro: Espadas, arcos y otras armas mejoradas con habilidades especiales.' },
      { name: 'Escudos Mágicos 🛡️', value: 'Raro: Aumenta la defensa del jugador por un tiempo limitado.' },
      { name: 'Artefactos Legendarios 🏺', value: 'Legendario: Otorgan mejoras permanentes en las estadísticas.' },
      { name: 'Gemas Encantadas 💎', value: 'Épico: Mejora las habilidades mágicas o físicas del jugador.' },
    ]
  },
  enemigos: {
    title: '👹 Sistema de Villanos',
    description: 'El mapa se divide en varias áreas, cada una con diferentes niveles de dificultad y tipos de enemigos...',
    fields: [
      { name: 'Fácil (Nivel 1-5)', value: 'Monstruos comunes: Goblins, lobos, murciélagos gigantes.' },
      { name: 'Intermedio (Nivel 5-10)', value: 'Monstruos raros: Ogros, espectros, golems de piedra.' },
      { name: 'Difícil (Nivel 10-15)', value: 'Dragones de Clase Baja: Dragones de hielo, wyverns.' },
      { name: 'Muy Difícil (Nivel 15-20)', value: 'Dragones de Clase Media: Dragones de fuego, hidras.' },
      { name: 'Caos (Nivel 30+)', value: 'Rey Demonio y Dragones de Clase Alta: Rey Demonio, dragones ancestrales.' },
    ]
  },
  casino: {
    title: '🎰 Casino',
    description: 'Información sobre el sistema de casino...',
    fields: [
      { name: 'Juegos disponibles', value: 'Ruleta, Blackjack, etc.' },
      { name: 'Cómo jugar', value: 'Usa /casino para acceder a los juegos del casino.' },
    ]
  },
  economia: {
    title: '💰 Economía',
    description: 'Sistema económico del juego...',
    fields: [
      { name: 'PassCoins 💸', value: 'Moneda principal del juego.' },
      { name: 'Cómo ganar PassCoins', value: 'Derrotando enemigos, completando misiones, vendiendo ítems.' },
      { name: 'Dónde gastar PassCoins', value: 'En la tienda, casino, mejoras de equipo.' },
    ]
  },
};

export async function handleTutorial(message, args) {
  const section = args[0]?.toLowerCase();

  if (!section || !tutorialSections[section]) {
    const embed = new EmbedBuilder()
      .setColor('#FFD700')
      .setTitle('📚 Tutorial de PassQuirk RPG')
      .setDescription('Selecciona una sección para obtener más información:')
      .addFields(
        { name: '/tutorial historia', value: 'Historia del mundo y objetivo del juego' },
        { name: '/tutorial clases', value: 'Información sobre las clases y quirks básicos' },
        { name: '/tutorial quirks', value: 'Detalles sobre las PassQuirk' },
        { name: '/tutorial mapa', value: 'Mapa del mundo y áreas explorables' },
        { name: '/tutorial items', value: 'Sistema de ítems y su uso' },
        { name: '/tutorial enemigos', value: 'Información sobre los villanos y enemigos' },
        { name: '/tutorial casino', value: 'Sistema de casino y juegos' },
        { name: '/tutorial economia', value: 'Sistema económico del juego' }
      );

    await message.reply({ embeds: [embed] });
    return;
  }

  const sectionInfo = tutorialSections[section];
  const embed = new EmbedBuilder()
    .setColor('#FFD700')
    .setTitle(sectionInfo.title)
    .setDescription(sectionInfo.description)
    .addFields(sectionInfo.fields);

  await message.reply({ embeds: [embed] });
}