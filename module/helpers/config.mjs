import { WarlordsActor } from "../documents/actor.mjs";

export const WARLORDS = {};

/**
 * The set of Ability Scores used within the sytem.
 * @type {Object}
 */
WARLORDS.abilities = {
    str: "WARLORDS.AbilityStr",
    dex: "WARLORDS.AbilityDex",
    con: "WARLORDS.AbilityCon",
    int: "WARLORDS.AbilityInt",
    wis: "WARLORDS.AbilityWis",
};

WARLORDS.abilityAbbreviations = {
    str: "WARLORDS.AbilityStrAbbr",
    dex: "WARLORDS.AbilityDexAbbr",
    con: "WARLORDS.AbilityConAbbr",
    int: "WARLORDS.AbilityIntAbbr",
    wis: "WARLORDS.AbilityWisAbbr",
};

WARLORDS.saves = {
    fort: "WARLORDS.SaveFort",
    refl: "WARLORDS.SaveRefl",
    will: "WARLORDS.SaveWill",
};

WARLORDS.saveAbbreviations = {
    fort: "WARLORDS.SaveFortAbbr",
    refl: "WARLORDS.SaveReflAbbr",
    will: "WARLORDS.SaveWillAbbr",
};

WARLORDS.health = {
    max: "WARLORDS.MaxHealth",
    current: "WARLORDS.CurrentHealth",
};

WARLORDS.power = {
    max: "WARLORDS.MaxPower",
    current: "WARLORDS.CurrentPower",
};

WARLORDS.activeEffectChanges = {
    "data.abilities.str.bonus": "WARLORDS.AbilityStr",
    "data.abilities.dex.bonus": "WARLORDS.AbilityDex",
    "data.abilities.con.bonus": "WARLORDS.AbilityCon",
    "data.abilities.int.bonus": "WARLORDS.AbilityInt",
    "data.saves.fort.bonus": "WARLORDS.SaveFort",
    "data.saves.refl.bonus": "WARLORDS.SaveRefl",
    "data.saves.will.bonus": "WARLORDS.SaveWill",
    "data.health.bonus": "WARLORDS.MaxHealth",
    "data.power.bonus": "WARLORDS.MaxPower",
};
