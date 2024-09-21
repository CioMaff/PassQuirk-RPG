export const quirksByClass = {
    "Arquero 🏹": [
      { name: "Flecha Ligera", rank: "D" },
      { name: "Flecha Veloz", rank: "C" },
      { name: "Disparo de Energía", rank: "B" },
      { name: "Flecha Perforante", rank: "A" },
      { name: "Flecha Fantasma", rank: "S" }
    ],
    "Ninja 🥷": [
      { name: "Sigilo Básico", rank: "D" },
      { name: "Doble Salto", rank: "C" },
      { name: "Ataque Sombrío", rank: "B" },
      { name: "Teletransporte Corto", rank: "A" },
      { name: "Desaparición Total", rank: "S" }
    ],
    "Espadachín ⚔️": [
      { name: "Corte Rápido", rank: "D" },
      { name: "Defensa Rápida", rank: "C" },
      { name: "Corte Aéreo", rank: "B" },
      { name: "Hoja Giratoria", rank: "A" },
      { name: "Golpe de Espada Relámpago", rank: "S" }
    ],
    "Guerrero 🛡️": [
      { name: "Golpe Sólido", rank: "D" },
      { name: "Escudo de Hierro", rank: "C" },
      { name: "Furia del Guerrero", rank: "B" },
      { name: "Defensa Total", rank: "A" },
      { name: "Destrucción Imparable", rank: "S" }
    ],
    "Mago 🧙‍♂️": [
      { name: "Bola de Fuego", rank: "D" },
      { name: "Telekinesis", rank: "C" },
      { name: "Rayo de Energía", rank: "B" },
      { name: "Control Elemental", rank: "A" },
      { name: "Manipulación del Tiempo", rank: "S" }
    ]
  };
  
  export const passQuirks = [
    { name: "Quirk del Fénix", description: "Potencia habilidades de regeneración y aumenta el poder de fuego.", classes: ["Mago 🧙‍♂️", "Guerrero 🛡️"] },
    { name: "Quirk del Vendaval", description: "Otorga velocidad extrema y control del viento.", classes: ["Arquero 🏹", "Ninja 🥷"] },
    { name: "Quirk de la Tierra", description: "Permite controlar la tierra y rocas a gran escala.", classes: ["Espadachín ⚔️", "Guerrero 🛡️"] },
    { name: "Quirk de la Oscuridad", description: "Permite absorber luz y volverse invisible.", classes: ["Ninja 🥷", "Mago 🧙‍♂️"] },
    { name: "Quirk de la Bestia", description: "Aumenta la fuerza y la resistencia física drásticamente.", classes: ["Guerrero 🛡️", "Espadachín ⚔️"] },
    { name: "Quirk del Trueno", description: "Control sobre relámpagos y velocidad aumentada.", classes: ["Arquero 🏹", "Mago 🧙‍♂️"] },
    { name: "Quirk del Dragón", description: "Otorga fuerza y defensa dracónica.", classes: ["Guerrero 🛡️", "Espadachín ⚔️"] },
    { name: "Quirk del Agua",  description: "Permite manipular agua y curar aliados.", classes: ["Mago 🧙‍♂️", "Arquero 🏹"] },
    { name: "Quirk del Vacío", description: "Controla la gravedad y manipula el espacio.", classes: ["Ninja 🥷", "Mago 🧙‍♂️"] },
    { name: "Quirk del Caos", description: "Otorga un poder inestable que puede destruir todo a su paso.", classes: ["Todas las clases"] }
  ];
  
  export const items = [
    { name: "Poción de Vida 🧪", rarity: "Común", effect: "Restaura un pequeño porcentaje de salud." },
    { name: "Poción de Energía ⚗️", rarity: "Común", effect: "Restaura energía para usar quirks." },
    { name: "Espada Encantada ⚔️", rarity: "Raro", effect: "Aumenta el daño de los ataques físicos." },
    { name: "Escudo Mágico 🛡️", rarity: "Raro", effect: "Aumenta la defensa del jugador por un tiempo limitado." },
    { name: "Amuleto de Poder 🏺", rarity: "Legendario", effect: "Otorga una mejora permanente en una estadística aleatoria." },
    { name: "Gema de Habilidad 💎", rarity: "Épico", effect: "Mejora una habilidad mágica o física del jugador." }
  ];
  
  export const worldMap = {
    "Bosque Encantado": {
      name: "Bosque Encantado",
      description: "Un bosque misterioso lleno de criaturas mágicas.",
      minLevel: 1,
      maxLevel: 5,
      alias: ["bosque", "encantado"],
      enemies: [
        { name: "Goblin", level: 1, health: 20, attack: 5 },
        { name: "Lobo", level: 2, health: 30, attack: 7 },
        { name: "Murciélago Gigante", level: 3, health: 25, attack: 6 }
      ]
    },
    "Colinas de Akai": {
      name: "Colinas de Akai",
      description: "Extensas colinas donde se entrenan los guerreros.",
      minLevel: 5,
      maxLevel: 10,
      alias: ["colinas", "akai"],
      enemies: [
        { name: "Ogro", level: 6, health: 80, attack: 15 },
        { name: "Espectro", level: 7, health: 60, attack: 20 },
        { name: "Golem de Piedra", level: 8, health: 100, attack: 18 }
      ]
    },
    "Montañas Heladas": {
      name: "Montañas Heladas",
      description: "Picos nevados donde habitan dragones de hielo.",
      minLevel: 10,
      maxLevel: 15,
      alias: ["montañas", "heladas"],
      enemies: [
        { name: "Dragón de Hielo", level: 12, health: 150, attack: 30 },
        { name: "Wyvern", level: 13, health: 130, attack: 35 }
      ]
    },
    "Desierto de las Ilusiones": {
      name: "Desierto de las Ilusiones",
      description: "Un vasto desierto lleno de espejismos y peligros ocultos.",
      minLevel: 15,
      maxLevel: 20,
      alias: ["desierto", "ilusiones"],
      enemies: [
        { name: "Dragón de Fuego", level: 17, health: 200, attack: 45 },
        { name: "Hidra", level: 18, health: 250, attack: 40 }
      ]
    },
    "Isla del Rey Demonio": {
      name: "Isla del Rey Demonio",
      description: "El lugar donde reside el Rey Demonio. Solo los más valientes se atreven a venir aquí.",
      minLevel: 30,
      maxLevel: 100,
      alias: ["isla", "rey demonio"],
      enemies: [
        { name: "Rey Demonio", level: 50, health: 1000, attack: 100 },
        { name: "Dragón Ancestral", level: 45, health: 800, attack: 90 }
      ]
    }
  };
  
  export default function Component() {
    return null;
  }