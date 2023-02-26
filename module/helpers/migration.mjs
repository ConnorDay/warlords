export async function migrate() {
    migrateItems();
    migrateActors();
}

async function migrateItems() {
    for (let item of game.items) {
        const system = { ...item.system };
        //No Migration for items yet

        if (system.rolls && system.rolls.attack !== undefined) {
            const attack = system.rolls.attack;
            const damage = system.rolls.damage;
            system.rolls = null;
            await item.update({ system: system });
            system.rolls = {
                0: { name: "Attack Roll", formula: attack },
                1: { name: "Damage", formula: damage },
            };
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
