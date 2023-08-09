export class WarlordsRoll extends Roll {
    static CHAT_TEMPLATE = "systems/warlords/templates/roll/chat-message.html";

    constructor(formula, data = {}, options = {}) {
        super(formula, data, options);
        console.log(data.name);
    }

    /**
     * @override
     */
    async render({
        flavor,
        template = this.constructor.CHAT_TEMPLATE,
        isPrivate = false,
    } = {}) {
        if (!this._evaluated) await this.evaluate({ async: true });

        let crit = false;
        let fumble = false;
        for (const die of this.dice) {
            for (const result of die.results) {
                if (result.result === die.faces) {
                    crit = true;
                } else if (result.result === 1) {
                    fumble = true;
                }

                if (crit && fumble) break;
            }
            if (crit && fumble) break;
        }

        let color = null;

        if (crit && fumble) {
            color = "blue";
        } else if (crit) {
            color = "green";
        } else if (fumble) {
            color = "red";
        }

        const chatData = {
            formula: isPrivate ? "???" : this._formula,
            flavor: isPrivate ? null : flavor,
            user: game.user.id,
            tooltip: isPrivate ? "" : await this.getTooltip(),
            total: isPrivate ? "?" : Math.round(this.total * 100) / 100,
            color: isPrivate ? null : color,
            name: isPrivate ? null : this.data.name,
        };
        return renderTemplate(template, chatData);
    }
}
