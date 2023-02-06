/**
 * @extends {ActiveEffectConfig}
 */

export class WarlordsEffectConfigSheet extends ActiveEffectConfig {
    get template() {
        return `systems/warlords/templates/item/active-effect-config-sheet.html`;
    }
    /** @override */
    submit(opts) {
        super.submit(opts);
    }

    getData() {
        const sheetData = super.getData();
        sheetData.config = CONFIG.WARLORDS;
        return sheetData;
    }
}
