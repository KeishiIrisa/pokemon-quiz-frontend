// pokemon description is array object, so it includes various language description, so this function select two english and japanese sentences which has same meaning.
export const selectPokemonDescription = (updatedPokemon) => {
  if (updatedPokemon.pokespecies.flavor_text_entries) {
    // getting japanese flavor text
    const flavors_ja = updatedPokemon.pokespecies.flavor_text_entries.filter(
      (entry) => entry.language.name === "ja"
    );
    // getting english flavor text
    const flavors_en = updatedPokemon.pokespecies.flavor_text_entries.filter(
      (entry) => entry.language.name === "en"
    );

    const pokemonDescriptions = flavors_ja
      .map((entry_ja) => {
        const entry_en = flavors_en.find(
          (entry_en) => entry_en.version.name === entry_ja.version.name
        );
        if (entry_en) {
          return {
            ja: entry_ja,
            en: entry_en,
            version: entry_en.version.name,
          };
        }
        return null;
      })
      .filter((entry) => entry !== null);

    return pokemonDescriptions[0];
  }
};

export const getRandomKatakanaCharacter = () => {
  const characters =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォャュョッ";
  return characters.charAt(Math.floor(Math.random() * characters.length));
};

export const generateAnswerCandidates = (answer) => {
  let candidates = answer;
  while (candidates.length < 10) {
    const randomChar = getRandomKatakanaCharacter();
    if (!candidates.includes(randomChar)) {
      candidates.push(randomChar);
    }
  }
  candidates.sort(() => Math.random() - 0.5);
  return candidates;
};
