export class MenuItems {
    private label: string;
    private value: number;
    private disabled: boolean;
    private defaultColor: string;

    constructor(labell: string, valuel: number, disabledl: boolean, defaultColorl: string) {
        this.label = labell;
        this.value = valuel;
        this.disabled = disabledl;
        this.defaultColor = defaultColorl;
    }
}
