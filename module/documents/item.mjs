/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class WarlordsItem extends Item {
    /**
     * Augment the basic Item data model with additional dynamic data.
     */
    prepareData() {
        // As with the actor class, items are documents that can have their data
        // preparation methods overridden (such as prepareBaseData()).
        super.prepareData();
    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }

    /**
     * Prepare a data object which is passed to any Roll formulas which are created related to this Item
     * @private
     */
    getRollData() {
        // If present, return the actor's roll data.
        if (!this.actor) return null;
        const rollData = this.actor.getRollData();
        // Grab the item's system data as well.
        rollData.item = foundry.utils.deepClone(this.system);

        return rollData;
    }

    /**
     * Handle clickable rolls.
     * @param {Event} event   The originating click event
     * @private
     */
    async roll() {
        const item = this;

        // Initialize chat data.
        const speaker = ChatMessage.getSpeaker({ actor: this.actor });
        const rollMode = game.settings.get("core", "rollMode");
        const label = `[${item.type}] ${item.name}`;

        // If there's no roll data, send a chat message.
        if (!this.system.rolls) {
            ChatMessage.create({
                speaker: speaker,
                rollMode: rollMode,
                flavor: label,
                content: item.system.description ?? "",
            });
            return;
        }

        //Update the resource for the roll
        const resource = this.actor.items.get(item.system.resourceId);
        if (!resource) return;

        if (resource.type == "item") {
            resource.system.quantity--;
            resource.system.quantity = Math.max(resource.system.quantity, 0);
        } else if (resource.type == "resource") {
            resource.system.value--;
            resource.system.value = Math.max(resource.system.value, 0);
            resource.system.value = Math.min(
                resource.system.value,
                resource.system.max
            );
        } else {
            console.error(`${item}`);
        }
        resource.update({ system: resource.system });

        // Create a roll and send a chat message from it.
        // Retrieve roll data.
        const rollData = this.getRollData();

        // Invoke the roll and submit it to chat.
        let content = "";
        for (let i in rollData.item.rolls) {
            const roll = rollData.item.rolls[i];
            content += `<p><b>${roll.name}: </b>[[${roll.formula}]]</p>`;
        }

        // If you need to store the value first, uncomment the next line.
        // let result = await roll.roll({async: true});
        ChatMessage.create({
            speaker: speaker,
            rollMode: rollMode,
            flavor: label,
            content: content,
        });
    }
}
