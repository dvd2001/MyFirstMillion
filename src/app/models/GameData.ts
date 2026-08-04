import { Accomodation } from "./Accomodation";

export class GameData {
    cash: number = 1000000;
    gold: number = 0;
    mine: number = 0;
    chocolate: number = 0;
    online1: number = 0;
    online2: number = 0;
    online3: number = 0;
    online4: number = 0;
    online5: number = 0;
    bank: number = 0;
    gbp: number = 0;
    eur: number = 0;
    usd: number = 0;
    maxFlatId: number = 0;
    maxPansionId: number = 0;
    flats: Accomodation[] = [];
    pansions: Accomodation[] = [];
    showFlat: boolean = false;
    showPansion: boolean = false;
    showGoldModal: boolean = false;
    showMineModal: boolean = false;
    showChocolateModal: boolean = false;
    showFlatModal: boolean = false;
    showPansionModal: boolean = false;
    showOnlineBasicModal: boolean = false;
    showOnlineModal: boolean = false;
}