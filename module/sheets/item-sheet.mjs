/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class WarlordsItemSheet extends ItemSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["warlords", "sheet", "item"],
            width: 520,
            height: 480,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "description",
                },
            ],
        });
    }

    /** @override */
    get template() {
        const path = "systems/warlords/templates/item";
        // Return a single sheet for all item types.
        // return `${path}/item-sheet.html`;

        // Alternatively, you could use the following return statement to do a
        // unique item sheet by type, like `weapon-sheet.html`.
        return `${path}/item-${this.item.type}-sheet.html`;
    }

    /* -------------------------------------------- */

    /** @override */
    getData() {
        // Retrieve base data structure.
        const context = super.getData();

        // Use a safe clone of the item data for further operations.
        const itemData = context.item;

        // Retrieve the roll data for TinyMCE editors.
        context.rollData = {};
        let actor = this.object?.parent ?? null;
        if (actor) {
            context.rollData = actor.getRollData();
        }

        // Add the actor's data to context.data for easier access, as well as flags.
        context.system = itemData.system;
        context.flags = itemData.flags;
        context.resources = [];
        let rItems = [];
        let rResources = [];
        if (actor) {
            actor.items.forEach((item) => {
                if (item.type == "item" && item.system.consumable) {
                    rItems.push({
                        item: item,
                        selected: item.id == this.item.system.resourceId,
                    });
                } else if (item.type == "resource") {
                    rResources.push({
                        item: item,
                        selected: item.id == this.item.system.resourceId,
                    });
                }
            });
        }
        context.resources = rItems.concat(rResources);
        context.rolls = itemData.collections.rolls;
        return context;
    }

    /* -------------------------------------------- */

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;
        // Roll handlers, click handlers, etc. would go here.
        html.find(".resource-list").change((ev) => {
            let val = ev.currentTarget.value;
            if (val === "") {
                val = null;
            }
            this.item.system.resourceId = val;
            this.item.update({ system: { resourceId: val } });
        });

        html.find(".roll-delete").click((ev) => {
            const currentTarget = $(ev.currentTarget);
            const index = currentTarget.data("index");

            const toUpdate = {};

            const newRolls = {};
            let counter = 0;
            for (let i in this.item.system.rolls) {
                i = parseInt(i);
                if (i !== index) {
                    console.log(i, index);
                    newRolls[counter] = this.item.system.rolls[i];
                    counter++;
                }
            }

            toUpdate.rolls = null;
            this.item.update({ system: toUpdate }).then(() => {
                toUpdate.rolls = newRolls;
                this.item.update({ system: toUpdate });
            });
        });

        html.find(".roll-create").click((ev) => {
            const toUpdate = { rolls: {} };
            let max = 0;
            for (let i in this.item.system.rolls) {
                i = parseInt(i);
                max = Math.max(max, i);
            }
            toUpdate.rolls[max + 1] = { name: "", formula: "" };
            this.item.update({ system: toUpdate });
        });

        html.find(".check-consumable").change((ev) => {
            const consumable = this.item.system.consumable;
            this.item.update({ system: { consumable: !consumable } });
        });
    }
}
