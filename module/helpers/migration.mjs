export async function migrate() {
    migrateItems();
    migrateActors();
}

async function migrateItems() {
    for (let item of game.items) {
        const system = { ...item.system };

        if (system.rolls === undefined) {
            system.rolls = {};
        } else {
            const attack = system.rolls.attack;
            const damage = system.rolls.damage;

            if (attack !== undefined || damage !== undefined) {
                ui.notification.info(
                    `updating ${item.name} to have arbitrary rolls`
                );
                system.rolls = null;
                await item.update({ system: system });

                let counter = 0;
                if (attack) {
                    system.rolls[counter] = {
                        name: "Attack Roll",
                        formula: attack,
                    };
                    counter++;
                }
                if (damage) {
                    system.rolls[counter] = { name: "Damage", formula: damage };
                    counter++;
                }
            }
        }

        if (item.type == "item") {
            if (system.consumable == undefined) {
                system.consumable = false;
            }
            if (system.resource == undefined) {
                system.resource = null;
            }
        }

        await item.update({ system: system });
    }
}

async function migrateActors() {
    for (let actor of game.actors) {
        const system = { ...actor.system };

        //Update attack_bonus
        if (system.attack_bonus !== undefined || system.attack_bonus !== null) {
            system.attributes.attack_bonus = {
                value: system.attack_bonus,
                bonus: 0,
            };
        }

        await actor.update({ system: system });
    }
}
