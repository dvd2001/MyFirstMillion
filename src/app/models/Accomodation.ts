export class Accomodation {
    id: number;
    price: number;
    debt: number;
    debtLevel: number;

    constructor(id: number, price: number, debt: number = 0) {
        this.id = id;
        this.price = price;
        this.debt = debt;
        debt > 0 ? this.debtLevel = 1 : this.debtLevel = 0;
    }

    debtLevelUp(): void {
        if (this.debtLevel < 5 && this.debtLevel !== 0) this.debtLevel++;
        else this.debtLevel = 0;
        return;
    }

    totalRepay(cash: number): number {
        let total = 0;
        switch (this.debtLevel - 1) {
            case 1: {
                total = this.debt * 0.88;
                break;
            }
            case 2: {
                total = this.debt * 0.66;
                break;
            }
            case 3: {
                total = this.debt * 0.44;
                break;
            }
            case 4: {
                total = this.debt * 0.22;
                break;
            }
        }
        if (cash < total) total = 0;
        else if (total !== 0) {
            this.debt = 0;
            this.debtLevel = 0;
        }
        return total;
    }

    repay(): number {
        let total = 0;
        switch (this.debtLevel) {
            case 1: {
                total = this.debt * 0.3;
                break;
            }
            case 2: {
                total = this.debt * 0.28;
                break;
            }
            case 3: {
                total = this.debt * 0.26;
                break;
            }
            case 4: {
                total = this.debt * 0.24;
                break;
            }
            case 5: {
                total = this.debt * 0.22;
                break;
            }
        }
        return total;
    }

    setDebt(debt: number): void {
        this.debt = debt;
        this.debtLevel = 1;
        return;
    }
}