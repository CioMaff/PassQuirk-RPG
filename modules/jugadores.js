export const players = {};

export class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.level = 1;
    this.exp = 0;
    this.quirk = null;
    this.class_type = null;
    this.location = "Inicio";
    this.appearance = null;
    this.gender = null;
    this.backstory = null;
    this.passCoin = 0;
    this.weapon = null;
    this.items = [];
    this.stats = {
      strength: 10,
      agility: 10,
      resistance: 10,
      magicControl: 10
    };
    this.passQuirk = null;
  }
}


