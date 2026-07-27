import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme-service';
import { DataReadingService } from '../../services/data-reading-service/data-reading-service';
import { Router } from '@angular/router';
import { Field } from '../../models/Field';
import { NgIf } from '@angular/common';
import { ParseError } from '@angular/compiler';

@Component({
  selector: 'app-game-page',
  imports: [NgIf],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage implements OnInit {
  private fields: Field[] = [];
  private field: number = 0;
  private maxOnline: number = 0;
  private cash: number = 1000000;
  private gold: number = 0;
  private mine: number = 0;
  private chocolate: number = 0;
  private online1: number = 0;
  private online2: number = 0;
  private online3: number = 0;
  private online4: number = 0;
  private online5: number = 0;
  private bank: number = 0;
  private gbp: number = 0;
  private eur: number = 0;
  private usd: number = 0;
  public showLevel1 = false;
  public showLevel2 = false;
  public showLevel3 = false;
  public showLevel4 = false;
  public showLevel5 = false;
  public showFlat = false;
  public showPansion = false;
  public mobile = false;
  public showGoldModal = false;
  public showMineModal = false;
  public showChocolateModal = false;
  public showFlatModal = false;
  public showPansionModal = false;
  public showOnlineBasicModal = false;
  public showOnline1Modal = false;
  public showOnline2Modal = false;
  public showOnline3Modal = false;
  public showOnline4Modal = false;
  public showOnline5Modal = false;
  constructor(public themeService: ThemeService, private router: Router, private reader: DataReadingService) {
    if (typeof window !== 'undefined') {
      const field = window.sessionStorage.getItem('field');
      const online = window.sessionStorage.getItem('maxOnline');
      if (field) {
        this.field = parseInt(field);
      }
      if (online) {
        this.maxOnline = parseInt(online);
      }
    }

  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      if (window.screen.width <= 1200) this.mobile = true;
    }
    this.fields = this.reader.readingFields();
    this.update();
  }

  update(isRoll: boolean = false): void {
    if (isRoll) {
      this.bank = 0;
      this.gbp = 0;
      this.eur = 0;
      this.usd = 0;
    }
    if (typeof document !== 'undefined') {
      const money = document.querySelector('#money') as HTMLElement;
      const goldPrice = document.querySelector('#goldPrice') as HTMLElement;
      const goldAmount = document.querySelector('#goldAmount') as HTMLElement;
      const minePrice = document.querySelector('#minePrice') as HTMLElement;
      const mineAmount = document.querySelector('#mineAmount') as HTMLElement;
      const chocolatePrice = document.querySelector('#chocolatePrice') as HTMLElement;
      const chocolateAmount = document.querySelector('#chocolateAmount') as HTMLElement;
      const flatPrice = document.querySelector('#flatPrice') as HTMLElement;
      const flatDebt = document.querySelector('#flatDebt') as HTMLElement;
      const flatSell = document.querySelector('#flatSell') as HTMLElement;
      const flatRent = document.querySelector('#flatRent') as HTMLElement;
      const pansionPrice = document.querySelector('#pansionPrice') as HTMLElement;
      const pansionDebt = document.querySelector('#pansionDebt') as HTMLElement;
      const pansionSell = document.querySelector('#pansionSell') as HTMLElement;
      const pansionIncome = document.querySelector('#pansionIncome') as HTMLElement;
      const onlinePrice = document.querySelector('#onlinePrice') as HTMLElement;
      const online1Income = document.querySelector('#online1Income') as HTMLElement;
      const online1Sell = document.querySelector('#online1Sell') as HTMLElement;
      const online1Amount = document.querySelector('#online1Amount') as HTMLElement;
      const online2Income = document.querySelector('#online2Income') as HTMLElement;
      const online2Sell = document.querySelector('#online2Sell') as HTMLElement;
      const online2Amount = document.querySelector('#online2Amount') as HTMLElement;
      const online3Income = document.querySelector('#online3Income') as HTMLElement;
      const online3Sell = document.querySelector('#online3Sell') as HTMLElement;
      const online3Amount = document.querySelector('#online3Amount') as HTMLElement;
      const online4Income = document.querySelector('#online4Income') as HTMLElement;
      const online4Sell = document.querySelector('#online4Sell') as HTMLElement;
      const online4Amount = document.querySelector('#online4Amount') as HTMLElement;
      const online5Income = document.querySelector('#online5Income') as HTMLElement;
      const online5Sell = document.querySelector('#online5Sell') as HTMLElement;
      const online5Amount = document.querySelector('#online5Amount') as HTMLElement;
      const bankAmount = document.querySelector('#bankAmount') as HTMLInputElement;
      const gbpAmount = document.querySelector('#gbpAmount') as HTMLInputElement;
      const eurAmount = document.querySelector('#eurAmount') as HTMLInputElement;
      const usdAmount = document.querySelector('#usdAmount') as HTMLInputElement;
      const bankMoney = document.querySelector('#bankMoney') as HTMLElement;
      const gbpMoney = document.querySelector('#gbpMoney') as HTMLElement;
      const eurMoney = document.querySelector('#eurMoney') as HTMLElement;
      const usdMoney = document.querySelector('#usdMoney') as HTMLElement;
      const field = this.fields[this.field];
      bankAmount.value = this.bank.toString();
      gbpAmount.value = this.gbp.toString();
      eurAmount.value = this.eur.toString();
      usdAmount.value = this.usd.toString();
      bankMoney.innerText = `$ ${this.bank.toLocaleString('hu-HU')}`;
      gbpMoney.innerText = `$ ${this.gbp.toLocaleString('hu-HU')}`;
      eurMoney.innerText = `$ ${this.eur.toLocaleString('hu-HU')}`;
      usdMoney.innerText = `$ ${this.usd.toLocaleString('hu-HU')}`;
      money.innerText = `$ ${this.cash.toLocaleString('hu-HU')}`;
      goldPrice.innerText = `$ ${(field.gold * 1000).toLocaleString('hu-HU')}`;
      goldAmount.innerText = `${this.gold} db`;
      minePrice.innerText = `$ ${(field.mine * 1000).toLocaleString('hu-HU')}`;
      mineAmount.innerText = `${this.mine} db`;
      chocolatePrice.innerText = `$ ${(field.chocolate * 1000).toLocaleString('hu-HU')}`;
      chocolateAmount.innerText = `${this.chocolate} db`;
      flatPrice.innerText = `$ ${(field.flatBuy * 1000).toLocaleString('hu-HU')}`;
      flatDebt.innerText = `$ ${(field.flatDebt * 1000).toLocaleString('hu-HU')}`;
      flatSell.innerText = `$ ${(field.flatBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
      flatRent.innerText = `$ ${(field.flatRent * 1000).toLocaleString('hu-HU')}`;
      pansionPrice.innerText = `$ ${(field.pansionBuy * 1000).toLocaleString('hu-HU')}`;
      pansionDebt.innerText = `$ ${(field.pansionDebt * 1000).toLocaleString('hu-HU')}`;
      pansionSell.innerText = `$ ${(field.pansionBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
      pansionIncome.innerText = `$ ${(field.pansionIncome * 1000).toLocaleString('hu-HU')}`;
      onlinePrice.innerText = `$ ${(field.onlineBuy * 1000).toLocaleString('hu-HU')}`;
      online1Income.innerText = `$ ${(field.onlineIncome1 * 1000).toLocaleString('hu-HU')}`;
      online1Sell.innerText = `$ ${(field.onlineSell1 * 1000).toLocaleString('hu-HU')}`;
      online1Amount.innerText = `${this.online1} db`;
      online2Income.innerText = `$ ${(field.onlineIncome2 * 1000).toLocaleString('hu-HU')}`;
      online2Sell.innerText = `$ ${(field.onlineSell2 * 1000).toLocaleString('hu-HU')}`;
      online2Amount.innerText = `${this.online2} db`;
      online3Income.innerText = `$ ${(field.onlineIncome3 * 1000).toLocaleString('hu-HU')}`;
      online3Sell.innerText = `$ ${(field.onlineSell3 * 1000).toLocaleString('hu-HU')}`;
      online3Amount.innerText = `${this.online3} db`;
      online4Income.innerText = `$ ${(field.onlineIncome4 * 1000).toLocaleString('hu-HU')}`;
      online4Sell.innerText = `$ ${(field.onlineSell4 * 1000).toLocaleString('hu-HU')}`;
      online4Amount.innerText = `${this.online4} db`;
      online5Income.innerText = `$ ${(field.onlineIncome5 * 1000).toLocaleString('hu-HU')}`;
      online5Sell.innerText = `$ ${(field.onlineSell5 * 1000).toLocaleString('hu-HU')}`;
      online5Amount.innerText = `${this.online5} db`;
    }
  }

  onBack(): void {
    this.router.navigate(['']);
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('field');
      window.sessionStorage.removeItem('maxOnline');
    }
  }

  goldInfo(): void {
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'hidden';
    }
    console.log('Gold Info');
  }

  goldBuy(): void {
    let text = prompt('Hány uncia aranyat vásárolsz?');
    try {
      if (text !== null) {
        let amount: number = parseInt(text);
        if (isNaN(amount)) throw ParseError;
        let cost: number = amount * this.fields[this.field].gold * 1000;
        if (cost > this.cash) throw ParseError;
        this.cash -= cost;
        this.gold += amount;
        this.update();
      }
    } catch (error) {
      alert('Nem teljesíthető vásárlás!');
    }
  }

  goldSell(): void {
    let text = prompt('Hány uncia aranyat adsz el?');
    try {
      if (text !== null) {
        let amount: number = parseInt(text);
        if (isNaN(amount) || amount > this.gold) throw ParseError;
        let income: number = amount * this.fields[this.field].gold * 1000;
        this.cash += income;
        this.gold -= amount;
        this.update();
      }
    } catch (error) {
      alert('Nem teljesíthető eladás!');
    }
  }

  mineInfo(): void {
    console.log('Mine Info');
  }

  mineBuy(): void {
    let text = prompt('Hány darab bánya részvényt vásárolsz?');
    try {
      if (text !== null) {
        let amount: number = parseInt(text);
        if (isNaN(amount)) throw ParseError;
        let cost: number = amount * this.fields[this.field].mine * 1000;
        if (cost > this.cash) throw ParseError;
        this.cash -= cost;
        this.mine += amount;
        this.update();
      }
    } catch (error) {
      alert('Nem teljesíthető vásárlás!');
    }
  }

  mineSell(): void {
    let text = prompt('Hány darab bánya részvényt adsz el?');
    try {
      if (text !== null) {
        let amount: number = parseInt(text);
        if (isNaN(amount) || amount > this.mine) throw ParseError;
        let income: number = amount * this.fields[this.field].mine * 1000;
        this.cash += income;
        this.mine -= amount;
        this.update();
      }
    } catch (error) {
      alert('Nem teljesíthető eladás!');
    }
  }

  chocolateInfo(): void {
    console.log('Chocolate Info');
  }

  chocolateBuy(): void {
    let text = prompt('Hány darab csoki részvényt vásárolsz?');
    try {
      if (text !== null) {
        let amount: number = parseInt(text);
        if (isNaN(amount)) throw ParseError;
        let cost: number = amount * this.fields[this.field].chocolate * 1000;
        if (cost > this.cash) throw ParseError;
        this.cash -= cost;
        this.chocolate += amount;
        this.update();
      }
    } catch (error) {
      alert('Nem teljesíthető vásárlás!');
    }
  }

  chocolateSell(): void {
    let text = prompt('Hány darab csoki részvényt adsz el?');
    try {
      if (text !== null) {
        let amount: number = parseInt(text);
        if (isNaN(amount) || amount > this.chocolate) throw ParseError;
        let income: number = amount * this.fields[this.field].chocolate * 1000;
        this.cash += income;
        this.chocolate -= amount;
        this.update();
      }
    } catch (error) {
      alert('Nem teljesíthető eladás!');
    }
  }

  flatInfo(): void {
    console.log('Flat Info');
  }

  flatBuy(): void {

  }

  pansionInfo(): void {
    console.log('Pansion Info');
  }

  pansionBuy(): void {

  }

  onlineInfo(): void {
    console.log('Online Info');
  }

  onlineBuy(): void {
    let text = prompt('Hány darab online üzletet indítasz?');
    try {
      if (text !== null) {
        let amount: number = parseInt(text);
        let owned: number = this.online1 + this.online2 + this.online3 + this.online4 + this.online5;
        if (isNaN(amount) || (amount + owned) > this.maxOnline) throw ParseError;
        let cost: number = amount * this.fields[this.field].onlineBuy * 1000;
        if (cost > this.cash) throw ParseError;
        this.cash -= cost;
        this.online1 += amount;
        this.update();
      }
    } catch (error) {
      alert('Nem teljesíthető vásárlás!');
    }
  }

  level1Info(): void {
    console.log('Level 1 Info');
  }

  online1Sell(): void {
    let text = prompt('Hány darab 1-es szintű üzletet adsz el?');
    try {
      if (text !== null) {
        let amount: number = parseInt(text);
        if (isNaN(amount) || amount > this.online1) throw ParseError;
        let income: number = amount * this.fields[this.field].onlineSell1 * 1000;
        this.cash += income;
        this.online1 -= amount;

        this.update();
      }
    } catch (error) {
      alert('Nem teljesíthető eladás!');
    }
  }

  level2Info(): void {
    console.log('Level 2 Info');
  }

  online2Sell(): void {
    let text = prompt('Hány darab 2-es szintű üzletet adsz el?');
    try {
      if (text !== null) {
        let amount: number = parseInt(text);
        if (isNaN(amount) || amount > this.online2) throw ParseError;
        let income: number = amount * this.fields[this.field].onlineSell2 * 1000;
        this.cash += income;
        this.online2 -= amount;
        this.update();
      }
    } catch (error) {
      alert('Nem teljesíthető eladás!');
    }
  }

  level3Info(): void {
    console.log('Level 3 Info');
  }

  online3Sell(): void {
    let text = prompt('Hány darab 3-as szintű üzletet adsz el?');
    try {
      if (text !== null) {
        let amount: number = parseInt(text);
        if (isNaN(amount) || amount > this.online3) throw ParseError;
        let income: number = amount * this.fields[this.field].onlineSell3 * 1000;
        this.cash += income;
        this.online3 -= amount;
        this.update();
      }
    } catch (error) {
      alert('Nem teljesíthető eladás!');
    }
  }

  level4Info(): void {
    console.log('Level 4 Info');
  }

  online4Sell(): void {
    let text = prompt('Hány darab 4-es szintű üzletet adsz el?');
    try {
      if (text !== null) {
        let amount: number = parseInt(text);
        if (isNaN(amount) || amount > this.online4) throw ParseError;
        let income: number = amount * this.fields[this.field].onlineSell4 * 1000;
        this.cash += income;
        this.online4 -= amount;
        this.update();
      }
    } catch (error) {
      alert('Nem teljesíthető eladás!');
    }
  }

  level5Info(): void {
    console.log('Level 5 Info');
  }

  online5Sell(): void {
    let text = prompt('Hány darab 5-ös szintű üzletet adsz el?');
    try {
      if (text !== null) {
        let amount: number = parseInt(text);
        if (isNaN(amount) || amount > this.online5) throw ParseError;
        let income: number = amount * this.fields[this.field].onlineSell5 * 1000;
        this.cash += income;
        this.online5 -= amount;
        this.update();
      }
    } catch (error) {
      alert('Nem teljesíthető eladás!');
    }
  }

  roll(): void {
    let next = prompt('Hány mezőt lépsz? (dobás értéke)');
    try {
      if (next !== null) {
        let nextRoll: number = parseInt(next);
        if (isNaN(nextRoll) || nextRoll < 1 || nextRoll > 6) throw ParseError;
        this.field += nextRoll;
        if (this.gbp > 0) this.cash += this.devisaRoll(this.gbp, 'GBP/USD');
        if (this.eur > 0) this.cash += this.devisaRoll(this.eur, 'EUR/USD');
        if (this.usd > 0) this.cash += this.devisaRoll(this.usd, 'USD/JPY');
        this.cash += Math.round(this.bank / 1000 * 1.04) * 1000;
        this.update(true);
      }
    } catch (error) {
      alert('Nincs ilyen szám a dobókockán, próbáld újra!');
    }
  }

  bankSave(): void {
    if (typeof document !== 'undefined') {
      const bankInp = document.querySelector('#bankAmount') as HTMLInputElement;
      let bank = parseInt(bankInp.value);
      if (isNaN(bank)) bank = 0;
      const differance = bank - this.bank;
      if (differance <= this.cash) {
        this.cash -= differance;
        this.bank += differance;
        this.update();
        return;
      }
      alert('Nincs elég pénzed ehhez a tranzakcióhoz!');
    }
  }
  gbpSave(): void {
    if (typeof document !== 'undefined') {
      const gbpInp = document.querySelector('#gbpAmount') as HTMLInputElement;
      let gbp = parseInt(gbpInp.value);
      if (isNaN(gbp)) gbp = 0;
      const differance = gbp - this.gbp;
      if (differance <= this.cash) {
        this.cash -= differance;
        this.gbp += differance;
        this.update();
        return;
      }
      alert('Nincs elég pénzed ehhez a tranzakcióhoz!');
    }
  }
  eurSave(): void {
    if (typeof document !== 'undefined') {
      const eurInp = document.querySelector('#eurAmount') as HTMLInputElement;
      let eur = parseInt(eurInp.value);
      if (isNaN(eur)) eur = 0;
      const differance = eur - this.eur;
      if (differance <= this.cash) {
        this.cash -= differance;
        this.eur += differance;
        this.update();
        return;
      }
      alert('Nincs elég pénzed ehhez a tranzakcióhoz!');
    }
  }
  usdSave(): void {
    if (typeof document !== 'undefined') {
      const usdInp = document.querySelector('#usdAmount') as HTMLInputElement;
      let usd = parseInt(usdInp.value);
      if (isNaN(usd)) usd = 0;
      const differance = usd - this.usd;
      if (differance <= this.cash) {
        this.cash -= differance;
        this.usd += differance;
        this.update();
        return;
      }
      alert('Nincs elég pénzed ehhez a tranzakcióhoz!');
    }
  }
  devisaRoll(dev: number, text: string): number {
    let next = prompt(`Mennyi volt a deviza dobás értéke! (${text})`);
    switch (next) {
      case '1': return Math.round(dev / 1000 * 0.5) * 1000;
      case '2': return Math.round(dev / 1000 * 0.8) * 1000;
      case '3': return dev;
      case '4': return Math.round(dev / 1000 * 1.5) * 1000;
      case '5': return Math.round(dev / 1000 * 1.8) * 1000;
      case '6': return Math.round(dev / 1000 * 2) * 1000;
      default: return 0;
    }
  }
}
