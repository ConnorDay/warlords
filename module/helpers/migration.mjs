export async function migrate() {
    migrateItems();
    migrateActors();
}

async function migrateItems() {
    for (let item of game.items) {
        const toUpdate = {};

        if (item.system.rolls === undefined) {
            toUpdate.rolls = {};
        } else {
            const attack = item.system.rolls.attack;
            const damage = item.system.rolls.damage;

            if (attack !== undefined || damage !== undefined) {
                ui.notification.info(
                    `updating ${item.name} to have arbitrary rolls`
                );
                toUpdate.rolls = null;
                await item.update({ system: toUpdate });

                let counter = 0;
                toUpdate.rolls = {};
                if (attack) {
                    toUpdate.rolls[counter] = {
                        name: "Attack Roll",
                        formula: attack,
                    };
                    counter++;
                }
                if (damage) {
                    toUpdate.rolls[counter] = {
                        name: "Damage",
                        formula: damage,
                    };
                    counter++;
                }
            }
        }

        if (item.type == "item") {
            if (toUpdate.consumable == undefined) {
                toUpdate.consumable = false;
            }
            if (toUpdate.resource == undefined) {
                toUpdate.resource = null;
            }
        }

        await item.update({ system: toUpdate });
    }
}

async function migrateActors() {
    for (let actor of game.actors) {
        const toUpdate = {};

        //Update attack_bonus
        if (
            actor.system.attack_bonus !== undefined ||
            actor.system.attack_bonus !== null
        ) {
            toUpdate.attributes = {
                attack_bonus: {
                    value: system.attack_bonus,
                    bonus: 0,
                },
            };
            toUpdate.status = {
                vitality: {
                    value: 12,
                    max: 12,
                    bonus: 0
                },
                toxicity: {
                    value: 0,
                    max: 6,
                    bonus: 0
                },
                sanity: {
                    value: 4,
                    max: 4,
                    bonus: 0
                },
                experience: {
                    value: 0,
                    max: 25,
                    bonus: 0
                }
            }
        }

        await actor.update({ system: toUpdate });
    }
}
