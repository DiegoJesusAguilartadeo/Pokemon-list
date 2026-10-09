export interface NamedAPIres{
    name:string;
    url:string;
}
export interface UnnamedAPIres{
    url:string;
}

// --- Nuevas interfaces para Pokémon ---

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  res: NamedAPIres[];
}

export interface PokemonDetailed {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIres;
  }[];
  forms: NamedAPIres[];
  game_indices: {
    game_index: number;
    version: NamedAPIres;
  }[];
  held_items: {
    item: NamedAPIres;
    version_details: {
      rarity: number;
      version: NamedAPIres;
    }[];
  }[];
  location_area_encounters: string;
  moves: {
    move: NamedAPIres;
    version_group_details: {
      level_learned_at: number;
      version_group: NamedAPIres;
      move_learn_method: NamedAPIres;
      order: number;
    }[];
  }[];
  species: NamedAPIres;
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other?: {
      dream_world?: {
        front_default: string | null;
        front_female: string | null;
      };
      home?: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      'official-artwork'?: {
        front_default: string | null;
        front_shiny: string | null;
      };
      showdown?: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    versions?: Record<string, any>;
  };
  cries: {
    latest: string;
    legacy: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: NamedAPIres;
  }[];
  types: {
    slot: number;
    type: NamedAPIres;
  }[];
  past_types?: {
    generation: NamedAPIres;
    types: {
      slot: number;
      type: NamedAPIres;
    }[];
  }[];
  past_abilities?: {
    generation: NamedAPIres;
    abilities: {
      ability: NamedAPIres | null;
      is_hidden: boolean;
      slot: number;
    }[];
  }[];
}


export interface Berries{
id:number;
name:string;
growth_time:number;
max_harvest:number;
natural_gift_power:number;
size:number;
smoothness:number;
soil_dryness:number;
firmness: NamedAPIres;
    item: NamedAPIres;
    natural_gift_type: NamedAPIres; // <-- ¡Aquí está el que faltaba!
    flavors: BerryFlavorMap[];
}

export interface BerryFlavorMap{
    potency:number;
    flavor: NamedAPIres;
}

export interface BerryFirmnessName {
    name: string;         
    language: NamedAPIres; 
}


export interface BerryFirmness {
    id: number;
    name: string;             
    berries: NamedAPIres[];   
    names: BerryFirmnessName[]; 
}

export interface FlavorBerryMap {
    potency: number;
    berry: NamedAPIres;
}


export interface BerryFlavorName {
    name: string;
    language: NamedAPIres;
}

export interface BerryFlavor {
    id: number;
    name: string;                        
    berries: FlavorBerryMap[];           
    contest_type: NamedAPIres;            
    names: BerryFlavorName[];             
}