/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
    return loadTemplates([
        // Actor partials.
        "systems/warlords/templates/actor/parts/actor-features.html",
        "systems/warlords/templates/actor/parts/actor-items.html",
        "systems/warlords/templates/actor/parts/actor-spells.html",
        "systems/warlords/templates/actor/parts/actor-effects.html",
        "systems/warlords/templates/actor/parts/actor-resources.html",
        "systems/warlords/templates/actor/parts/actor-skills.html",
        "systems/warlords/templates/item/parts/item-rolls.html",
        "systems/warlords/templates/roll/chat-message.html",
    ]);
};
