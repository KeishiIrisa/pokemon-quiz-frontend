export const fetchPokemon = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return await response.json();
};

// pokemonSpecies includes description about the pokemon such as ""This POKéMON has electricity-storing\npouches on its cheeks. These appear to\nbecome electrically charged during the\fnight while PIKACHU sleeps.\nIt occasionally discharges electricity\nwhen it is dozy after waking up.""
export const fetchPokemonSpecies = async (id) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  return await response.json();
};

// pokemonAbility includes the description of ability the pokemon has.
export const fetchPokemonAbilityDescription = async (abilities) => {
  const abilitiesDatas = [];

  for (const ability of abilities) {
    const response = await fetch(ability.ability.url);
    const data = await response.json();
    abilitiesDatas.push(data);
  }

  return abilitiesDatas;
};
