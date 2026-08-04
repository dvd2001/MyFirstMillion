import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme-service';
import { DataReadingService } from '../../services/data-reading-service/data-reading-service';
import { Router } from '@angular/router';
import { Field } from '../../models/Field';
import { NgIf } from '@angular/common';
import { ParseError } from '@angular/compiler';
import { Accomodation } from '../../models/Accomodation';

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
  private maxFlatId: number = 0;
  private maxPansionId: number = 0;
  private flats: Accomodation[] = [];
  private pansions: Accomodation[] = [];
  public showFlat = false;
  public showPansion = false;
  public mobile = false;
  public showGoldModal = false;
  public showMineModal = false;
  public showChocolateModal = false;
  public showFlatModal = false;
  public showPansionModal = false;
  public showOnlineBasicModal = false;
  public showOnlineModal = false;
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
    if (this.flats.length > 0) this.showFlat = true;
    if (this.pansions.length > 0) this.showPansion = true;
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
    if (typeof window !== 'undefined') {
      if (confirm('Vissza a kezdőlapra a játékadatok törlésével!' + '(Ha vissza szeretnél térni ehhez a játékmenethez, ' +
        'akkor nyomd meg a Mégse gombot és a kezdőlapról bármikor visszatérhetsz, ' +
        'viszont figyelj arra, hogy ne zárd be a böngészőt, se ezt az ablakot benne, ' +
        'valamint telefon ne húzd ki a böngészőt a nemrég használt alkalmazások közül, ' +
        'különben elveszítheted a játékadataidat!)')) {
        window.sessionStorage.clear();
      }
    }
    this.router.navigate(['']);
  }

  goldInfo(): void {
    this.showGoldModal = true;
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'hidden';

      setTimeout(() => {
        const modalGold1 = document.querySelector('#modalGoldPrice1') as HTMLElement;
        const modalGold2 = document.querySelector('#modalGoldPrice2') as HTMLElement;
        const modalGold3 = document.querySelector('#modalGoldPrice3') as HTMLElement;
        const modalGold4 = document.querySelector('#modalGoldPrice4') as HTMLElement;
        const modalGold5 = document.querySelector('#modalGoldPrice5') as HTMLElement;
        const modalGold6 = document.querySelector('#modalGoldPrice6') as HTMLElement;

        if (!modalGold1 || !modalGold2 || !modalGold3 || !modalGold4 || !modalGold5 || !modalGold6) {
          return;
        }

        modalGold1.innerText = `$ ${(this.fields[this.field + 1].gold * 1000).toLocaleString('hu-HU')}`;
        modalGold2.innerText = `$ ${(this.fields[this.field + 2].gold * 1000).toLocaleString('hu-HU')}`;
        modalGold3.innerText = `$ ${(this.fields[this.field + 3].gold * 1000).toLocaleString('hu-HU')}`;
        modalGold4.innerText = `$ ${(this.fields[this.field + 4].gold * 1000).toLocaleString('hu-HU')}`;
        modalGold5.innerText = `$ ${(this.fields[this.field + 5].gold * 1000).toLocaleString('hu-HU')}`;
        modalGold6.innerText = `$ ${(this.fields[this.field + 6].gold * 1000).toLocaleString('hu-HU')}`;
      }, 0);
    }
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
    this.showMineModal = true;
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'hidden';

      setTimeout(() => {
        const modalMine1 = document.querySelector('#modalMinePrice1') as HTMLElement;
        const modalMine2 = document.querySelector('#modalMinePrice2') as HTMLElement;
        const modalMine3 = document.querySelector('#modalMinePrice3') as HTMLElement;
        const modalMine4 = document.querySelector('#modalMinePrice4') as HTMLElement;
        const modalMine5 = document.querySelector('#modalMinePrice5') as HTMLElement;
        const modalMine6 = document.querySelector('#modalMinePrice6') as HTMLElement;
        const mineToGold1 = document.querySelector('#mineToGold1') as HTMLElement;
        const mineToGold2 = document.querySelector('#mineToGold2') as HTMLElement;
        const mineToGold3 = document.querySelector('#mineToGold3') as HTMLElement;
        const mineToGold4 = document.querySelector('#mineToGold4') as HTMLElement;
        const mineToGold5 = document.querySelector('#mineToGold5') as HTMLElement;
        const mineToGold6 = document.querySelector('#mineToGold6') as HTMLElement;

        if (!modalMine1 || !modalMine2 || !modalMine3 || !modalMine4 || !modalMine5 || !modalMine6 || !mineToGold1 ||
          !mineToGold2 || !mineToGold3 || !mineToGold4 || !mineToGold5 || !mineToGold6) {
          return;
        }

        modalMine1.innerText = `$ ${(this.fields[this.field + 1].mine * 1000).toLocaleString('hu-HU')}`;
        modalMine2.innerText = `$ ${(this.fields[this.field + 2].mine * 1000).toLocaleString('hu-HU')}`;
        modalMine3.innerText = `$ ${(this.fields[this.field + 3].mine * 1000).toLocaleString('hu-HU')}`;
        modalMine4.innerText = `$ ${(this.fields[this.field + 4].mine * 1000).toLocaleString('hu-HU')}`;
        modalMine5.innerText = `$ ${(this.fields[this.field + 5].mine * 1000).toLocaleString('hu-HU')}`;
        modalMine6.innerText = `$ ${(this.fields[this.field + 6].mine * 1000).toLocaleString('hu-HU')}`;
        mineToGold3.innerText = `${(this.fields[this.field + 3].mine / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
        mineToGold2.innerText = `${(this.fields[this.field + 2].mine / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
        mineToGold1.innerText = `${(this.fields[this.field + 1].mine / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
        mineToGold4.innerText = `${(this.fields[this.field + 4].mine / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
        mineToGold5.innerText = `${(this.fields[this.field + 5].mine / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
        mineToGold6.innerText = `${(this.fields[this.field + 6].mine / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
      }, 0);
    }
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
    this.showChocolateModal = true;
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'hidden';

      setTimeout(() => {
        const modalChocolate1 = document.querySelector('#modalChocolatePrice1') as HTMLElement;
        const modalChocolate2 = document.querySelector('#modalChocolatePrice2') as HTMLElement;
        const modalChocolate3 = document.querySelector('#modalChocolatePrice3') as HTMLElement;
        const modalChocolate4 = document.querySelector('#modalChocolatePrice4') as HTMLElement;
        const modalChocolate5 = document.querySelector('#modalChocolatePrice5') as HTMLElement;
        const modalChocolate6 = document.querySelector('#modalChocolatePrice6') as HTMLElement;
        const chocolateToGold1 = document.querySelector('#chocolateToGold1') as HTMLElement;
        const chocolateToGold2 = document.querySelector('#chocolateToGold2') as HTMLElement;
        const chocolateToGold3 = document.querySelector('#chocolateToGold3') as HTMLElement;
        const chocolateToGold4 = document.querySelector('#chocolateToGold4') as HTMLElement;
        const chocolateToGold5 = document.querySelector('#chocolateToGold5') as HTMLElement;
        const chocolateToGold6 = document.querySelector('#chocolateToGold6') as HTMLElement;

        if (!modalChocolate1 || !modalChocolate2 || !modalChocolate3 || !modalChocolate4 || !modalChocolate5 ||
          !modalChocolate6 || !chocolateToGold1 || !chocolateToGold2 || !chocolateToGold3 || !chocolateToGold4 ||
          !chocolateToGold5 || !chocolateToGold6) {
          return;
        }

        modalChocolate1.innerText = `$ ${(this.fields[this.field + 1].chocolate * 1000).toLocaleString('hu-HU')}`;
        modalChocolate2.innerText = `$ ${(this.fields[this.field + 2].chocolate * 1000).toLocaleString('hu-HU')}`;
        modalChocolate3.innerText = `$ ${(this.fields[this.field + 3].chocolate * 1000).toLocaleString('hu-HU')}`;
        modalChocolate4.innerText = `$ ${(this.fields[this.field + 4].chocolate * 1000).toLocaleString('hu-HU')}`;
        modalChocolate5.innerText = `$ ${(this.fields[this.field + 5].chocolate * 1000).toLocaleString('hu-HU')}`;
        modalChocolate6.innerText = `$ ${(this.fields[this.field + 6].chocolate * 1000).toLocaleString('hu-HU')}`;
        chocolateToGold3.innerText = `${(this.fields[this.field + 3].chocolate / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
        chocolateToGold2.innerText = `${(this.fields[this.field + 2].chocolate / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
        chocolateToGold1.innerText = `${(this.fields[this.field + 1].chocolate / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
        chocolateToGold4.innerText = `${(this.fields[this.field + 4].chocolate / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
        chocolateToGold5.innerText = `${(this.fields[this.field + 5].chocolate / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
        chocolateToGold6.innerText = `${(this.fields[this.field + 6].chocolate / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
      }, 0);
    }
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
    this.showFlatModal = true;
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'hidden';

      setTimeout(() => {
        const debt1 = document.querySelector('#modalDebtFlat1') as HTMLElement;
        const buyGold1 = document.querySelector('#modalBuyFlat1Gold') as HTMLElement;
        const buy1 = document.querySelector('#modalBuyFlat1Price') as HTMLElement;
        const rentGold1 = document.querySelector('#modalRentFlat1Gold') as HTMLElement;
        const rent1 = document.querySelector('#modalRentFlat1Price') as HTMLElement;
        const sellGold1 = document.querySelector('#modalSellFlat1Gold') as HTMLElement;
        const sell1 = document.querySelector('#modalSellFlat1Price') as HTMLElement;
        const debt2 = document.querySelector('#modalDebtFlat2') as HTMLElement;
        const buyGold2 = document.querySelector('#modalBuyFlat2Gold') as HTMLElement;
        const buy2 = document.querySelector('#modalBuyFlat2Price') as HTMLElement;
        const rentGold2 = document.querySelector('#modalRentFlat2Gold') as HTMLElement;
        const rent2 = document.querySelector('#modalRentFlat2Price') as HTMLElement;
        const sellGold2 = document.querySelector('#modalSellFlat2Gold') as HTMLElement;
        const sell2 = document.querySelector('#modalSellFlat2Price') as HTMLElement;
        const debt3 = document.querySelector('#modalDebtFlat3') as HTMLElement;
        const buyGold3 = document.querySelector('#modalBuyFlat3Gold') as HTMLElement;
        const buy3 = document.querySelector('#modalBuyFlat3Price') as HTMLElement;
        const rentGold3 = document.querySelector('#modalRentFlat3Gold') as HTMLElement;
        const rent3 = document.querySelector('#modalRentFlat3Price') as HTMLElement;
        const sellGold3 = document.querySelector('#modalSellFlat3Gold') as HTMLElement;
        const sell3 = document.querySelector('#modalSellFlat3Price') as HTMLElement;
        const debt4 = document.querySelector('#modalDebtFlat4') as HTMLElement;
        const buyGold4 = document.querySelector('#modalBuyFlat4Gold') as HTMLElement;
        const buy4 = document.querySelector('#modalBuyFlat4Price') as HTMLElement;
        const rentGold4 = document.querySelector('#modalRentFlat4Gold') as HTMLElement;
        const rent4 = document.querySelector('#modalRentFlat4Price') as HTMLElement;
        const sellGold4 = document.querySelector('#modalSellFlat4Gold') as HTMLElement;
        const sell4 = document.querySelector('#modalSellFlat4Price') as HTMLElement;
        const debt5 = document.querySelector('#modalDebtFlat5') as HTMLElement;
        const buyGold5 = document.querySelector('#modalBuyFlat5Gold') as HTMLElement;
        const buy5 = document.querySelector('#modalBuyFlat5Price') as HTMLElement;
        const rentGold5 = document.querySelector('#modalRentFlat5Gold') as HTMLElement;
        const rent5 = document.querySelector('#modalRentFlat5Price') as HTMLElement;
        const sellGold5 = document.querySelector('#modalSellFlat5Gold') as HTMLElement;
        const sell5 = document.querySelector('#modalSellFlat5Price') as HTMLElement;
        const debt6 = document.querySelector('#modalDebtFlat6') as HTMLElement;
        const buyGold6 = document.querySelector('#modalBuyFlat6Gold') as HTMLElement;
        const buy6 = document.querySelector('#modalBuyFlat6Price') as HTMLElement;
        const rentGold6 = document.querySelector('#modalRentFlat6Gold') as HTMLElement;
        const rent6 = document.querySelector('#modalRentFlat6Price') as HTMLElement;
        const sellGold6 = document.querySelector('#modalSellFlat6Gold') as HTMLElement;
        const sell6 = document.querySelector('#modalSellFlat6Price') as HTMLElement;

        if (!buy1 || !buy2 || !buy3 || !buy4 || !buy5 || !buy6 || !buyGold1 || !buyGold2 || !buyGold3 || !buyGold4
          || !buyGold5 || !buyGold6 || !rent1 || !rent2 || !rent3 || !rent4 || !rent5 || !rent6
          || !rentGold1 || !rentGold2 || !rentGold3 || !rentGold4 || !rentGold5 || !rentGold6 || !sell1 || !sell2
          || !sell3 || !sell4 || !sell5 || !sell6 || !sellGold1 || !sellGold2 || !sellGold3 || !sellGold4
          || !sellGold5 || !sellGold6 || !debt1 || !debt2 || !debt3 || !debt4 || !debt5 || !debt6) {
          return;
        }

        debt1.innerText = `$ ${(this.fields[this.field + 1].flatDebt * 1000).toLocaleString('hu-HU')}`;
        debt2.innerText = `$ ${(this.fields[this.field + 2].flatDebt * 1000).toLocaleString('hu-HU')}`;
        debt3.innerText = `$ ${(this.fields[this.field + 3].flatDebt * 1000).toLocaleString('hu-HU')}`;
        debt4.innerText = `$ ${(this.fields[this.field + 4].flatDebt * 1000).toLocaleString('hu-HU')}`;
        debt5.innerText = `$ ${(this.fields[this.field + 5].flatDebt * 1000).toLocaleString('hu-HU')}`;
        debt6.innerText = `$ ${(this.fields[this.field + 6].flatDebt * 1000).toLocaleString('hu-HU')}`;
        buy1.innerText = `$ ${(this.fields[this.field + 1].flatBuy * 1000).toLocaleString('hu-HU')}`;
        buy2.innerText = `$ ${(this.fields[this.field + 2].flatBuy * 1000).toLocaleString('hu-HU')}`;
        buy3.innerText = `$ ${(this.fields[this.field + 3].flatBuy * 1000).toLocaleString('hu-HU')}`;
        buy4.innerText = `$ ${(this.fields[this.field + 4].flatBuy * 1000).toLocaleString('hu-HU')}`;
        buy5.innerText = `$ ${(this.fields[this.field + 5].flatBuy * 1000).toLocaleString('hu-HU')}`;
        buy6.innerText = `$ ${(this.fields[this.field + 6].flatBuy * 1000).toLocaleString('hu-HU')}`;
        buyGold1.innerText = `${(this.fields[this.field + 1].flatBuy / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
        buyGold2.innerText = `${(this.fields[this.field + 2].flatBuy / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
        buyGold3.innerText = `${(this.fields[this.field + 3].flatBuy / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
        buyGold4.innerText = `${(this.fields[this.field + 4].flatBuy / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
        buyGold5.innerText = `${(this.fields[this.field + 5].flatBuy / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
        buyGold6.innerText = `${(this.fields[this.field + 6].flatBuy / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
        rent1.innerText = `$ ${(this.fields[this.field + 1].flatRent * 1000).toLocaleString('hu-HU')}`;
        rent2.innerText = `$ ${(this.fields[this.field + 2].flatRent * 1000).toLocaleString('hu-HU')}`;
        rent3.innerText = `$ ${(this.fields[this.field + 3].flatRent * 1000).toLocaleString('hu-HU')}`;
        rent4.innerText = `$ ${(this.fields[this.field + 4].flatRent * 1000).toLocaleString('hu-HU')}`;
        rent5.innerText = `$ ${(this.fields[this.field + 5].flatRent * 1000).toLocaleString('hu-HU')}`;
        rent6.innerText = `$ ${(this.fields[this.field + 6].flatRent * 1000).toLocaleString('hu-HU')}`;
        rentGold1.innerText = `${(this.fields[this.field + 1].flatRent / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
        rentGold2.innerText = `${(this.fields[this.field + 2].flatRent / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
        rentGold3.innerText = `${(this.fields[this.field + 3].flatRent / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
        rentGold4.innerText = `${(this.fields[this.field + 4].flatRent / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
        rentGold5.innerText = `${(this.fields[this.field + 5].flatRent / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
        rentGold6.innerText = `${(this.fields[this.field + 6].flatRent / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
        sell1.innerText = `$ ${(this.fields[this.field + 1].flatBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
        sell2.innerText = `$ ${(this.fields[this.field + 2].flatBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
        sell3.innerText = `$ ${(this.fields[this.field + 3].flatBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
        sell4.innerText = `$ ${(this.fields[this.field + 4].flatBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
        sell5.innerText = `$ ${(this.fields[this.field + 5].flatBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
        sell6.innerText = `$ ${(this.fields[this.field + 6].flatBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
        sellGold1.innerText = `${(this.fields[this.field + 1].flatBuy * 0.95 / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
        sellGold2.innerText = `${(this.fields[this.field + 2].flatBuy * 0.95 / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
        sellGold3.innerText = `${(this.fields[this.field + 3].flatBuy * 0.95 / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
        sellGold4.innerText = `${(this.fields[this.field + 4].flatBuy * 0.95 / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
        sellGold5.innerText = `${(this.fields[this.field + 5].flatBuy * 0.95 / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
        sellGold6.innerText = `${(this.fields[this.field + 6].flatBuy * 0.95 / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
      }, 0);
    }
  }

  flatBuy(): void {
    const price: number = this.fields[this.field].flatBuy * 1000;
    if (price <= this.cash) {
      const flat: Accomodation = new Accomodation(++this.maxFlatId, price);
      this.flats.push(flat);
      this.cash -= price;
      this.update();
    }
    else alert('Nincs elég pénzed a vásárláshoz!');
    console.log(this.flats);
    return;
  }

  pansionInfo(): void {
    this.showPansionModal = true;
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'hidden';

      setTimeout(() => {
        const debt1 = document.querySelector('#modalDebtPansion1') as HTMLElement;
        const buyGold1 = document.querySelector('#modalBuyPansion1Gold') as HTMLElement;
        const buy1 = document.querySelector('#modalBuyPansion1Price') as HTMLElement;
        const incomeGold1 = document.querySelector('#modalIncomePansion1Gold') as HTMLElement;
        const income1 = document.querySelector('#modalIncomePansion1Price') as HTMLElement;
        const sellGold1 = document.querySelector('#modalSellPansion1Gold') as HTMLElement;
        const sell1 = document.querySelector('#modalSellPansion1Price') as HTMLElement;
        const debt2 = document.querySelector('#modalDebtPansion2') as HTMLElement;
        const buyGold2 = document.querySelector('#modalBuyPansion2Gold') as HTMLElement;
        const buy2 = document.querySelector('#modalBuyPansion2Price') as HTMLElement;
        const incomeGold2 = document.querySelector('#modalIncomePansion2Gold') as HTMLElement;
        const income2 = document.querySelector('#modalIncomePansion2Price') as HTMLElement;
        const sellGold2 = document.querySelector('#modalSellPansion2Gold') as HTMLElement;
        const sell2 = document.querySelector('#modalSellPansion2Price') as HTMLElement;
        const debt3 = document.querySelector('#modalDebtPansion3') as HTMLElement;
        const buyGold3 = document.querySelector('#modalBuyPansion3Gold') as HTMLElement;
        const buy3 = document.querySelector('#modalBuyPansion3Price') as HTMLElement;
        const incomeGold3 = document.querySelector('#modalIncomePansion3Gold') as HTMLElement;
        const income3 = document.querySelector('#modalIncomePansion3Price') as HTMLElement;
        const sellGold3 = document.querySelector('#modalSellPansion3Gold') as HTMLElement;
        const sell3 = document.querySelector('#modalSellPansion3Price') as HTMLElement;
        const debt4 = document.querySelector('#modalDebtPansion4') as HTMLElement;
        const buyGold4 = document.querySelector('#modalBuyPansion4Gold') as HTMLElement;
        const buy4 = document.querySelector('#modalBuyPansion4Price') as HTMLElement;
        const incomeGold4 = document.querySelector('#modalIncomePansion4Gold') as HTMLElement;
        const income4 = document.querySelector('#modalIncomePansion4Price') as HTMLElement;
        const sellGold4 = document.querySelector('#modalSellPansion4Gold') as HTMLElement;
        const sell4 = document.querySelector('#modalSellPansion4Price') as HTMLElement;
        const debt5 = document.querySelector('#modalDebtPansion5') as HTMLElement;
        const buyGold5 = document.querySelector('#modalBuyPansion5Gold') as HTMLElement;
        const buy5 = document.querySelector('#modalBuyPansion5Price') as HTMLElement;
        const incomeGold5 = document.querySelector('#modalIncomePansion5Gold') as HTMLElement;
        const income5 = document.querySelector('#modalIncomePansion5Price') as HTMLElement;
        const sellGold5 = document.querySelector('#modalSellPansion5Gold') as HTMLElement;
        const sell5 = document.querySelector('#modalSellPansion5Price') as HTMLElement;
        const debt6 = document.querySelector('#modalDebtPansion6') as HTMLElement;
        const buyGold6 = document.querySelector('#modalBuyPansion6Gold') as HTMLElement;
        const buy6 = document.querySelector('#modalBuyPansion6Price') as HTMLElement;
        const incomeGold6 = document.querySelector('#modalIncomePansion6Gold') as HTMLElement;
        const income6 = document.querySelector('#modalIncomePansion6Price') as HTMLElement;
        const sellGold6 = document.querySelector('#modalSellPansion6Gold') as HTMLElement;
        const sell6 = document.querySelector('#modalSellPansion6Price') as HTMLElement;

        if (!buy1 || !buy2 || !buy3 || !buy4 || !buy5 || !buy6 || !buyGold1 || !buyGold2 || !buyGold3 || !buyGold4
          || !buyGold5 || !buyGold6 || !income1 || !income2 || !income3 || !income4 || !income5 || !income6
          || !incomeGold1 || !incomeGold2 || !incomeGold3 || !incomeGold4 || !incomeGold5 || !incomeGold6 || !sell1 || !sell2
          || !sell3 || !sell4 || !sell5 || !sell6 || !sellGold1 || !sellGold2 || !sellGold3 || !sellGold4
          || !sellGold5 || !sellGold6 || !debt1 || !debt2 || !debt3 || !debt4 || !debt5 || !debt6) {
          return;
        }

        debt1.innerText = `$ ${(this.fields[this.field + 1].pansionDebt * 1000).toLocaleString('hu-HU')}`;
        debt2.innerText = `$ ${(this.fields[this.field + 2].pansionDebt * 1000).toLocaleString('hu-HU')}`;
        debt3.innerText = `$ ${(this.fields[this.field + 3].pansionDebt * 1000).toLocaleString('hu-HU')}`;
        debt4.innerText = `$ ${(this.fields[this.field + 4].pansionDebt * 1000).toLocaleString('hu-HU')}`;
        debt5.innerText = `$ ${(this.fields[this.field + 5].pansionDebt * 1000).toLocaleString('hu-HU')}`;
        debt6.innerText = `$ ${(this.fields[this.field + 6].pansionDebt * 1000).toLocaleString('hu-HU')}`;
        buy1.innerText = `$ ${(this.fields[this.field + 1].pansionBuy * 1000).toLocaleString('hu-HU')}`;
        buy2.innerText = `$ ${(this.fields[this.field + 2].pansionBuy * 1000).toLocaleString('hu-HU')}`;
        buy3.innerText = `$ ${(this.fields[this.field + 3].pansionBuy * 1000).toLocaleString('hu-HU')}`;
        buy4.innerText = `$ ${(this.fields[this.field + 4].pansionBuy * 1000).toLocaleString('hu-HU')}`;
        buy5.innerText = `$ ${(this.fields[this.field + 5].pansionBuy * 1000).toLocaleString('hu-HU')}`;
        buy6.innerText = `$ ${(this.fields[this.field + 6].pansionBuy * 1000).toLocaleString('hu-HU')}`;
        buyGold1.innerText = `${(this.fields[this.field + 1].pansionBuy / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
        buyGold2.innerText = `${(this.fields[this.field + 2].pansionBuy / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
        buyGold3.innerText = `${(this.fields[this.field + 3].pansionBuy / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
        buyGold4.innerText = `${(this.fields[this.field + 4].pansionBuy / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
        buyGold5.innerText = `${(this.fields[this.field + 5].pansionBuy / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
        buyGold6.innerText = `${(this.fields[this.field + 6].pansionBuy / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
        income1.innerText = `$ ${(this.fields[this.field + 1].pansionIncome * 1000).toLocaleString('hu-HU')}`;
        income2.innerText = `$ ${(this.fields[this.field + 2].pansionIncome * 1000).toLocaleString('hu-HU')}`;
        income3.innerText = `$ ${(this.fields[this.field + 3].pansionIncome * 1000).toLocaleString('hu-HU')}`;
        income4.innerText = `$ ${(this.fields[this.field + 4].pansionIncome * 1000).toLocaleString('hu-HU')}`;
        income5.innerText = `$ ${(this.fields[this.field + 5].pansionIncome * 1000).toLocaleString('hu-HU')}`;
        income6.innerText = `$ ${(this.fields[this.field + 6].pansionIncome * 1000).toLocaleString('hu-HU')}`;
        incomeGold1.innerText = `${(this.fields[this.field + 1].pansionIncome / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
        incomeGold2.innerText = `${(this.fields[this.field + 2].pansionIncome / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
        incomeGold3.innerText = `${(this.fields[this.field + 3].pansionIncome / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
        incomeGold4.innerText = `${(this.fields[this.field + 4].pansionIncome / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
        incomeGold5.innerText = `${(this.fields[this.field + 5].pansionIncome / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
        incomeGold6.innerText = `${(this.fields[this.field + 6].pansionIncome / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
        sell1.innerText = `$ ${(this.fields[this.field + 1].pansionBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
        sell2.innerText = `$ ${(this.fields[this.field + 2].pansionBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
        sell3.innerText = `$ ${(this.fields[this.field + 3].pansionBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
        sell4.innerText = `$ ${(this.fields[this.field + 4].pansionBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
        sell5.innerText = `$ ${(this.fields[this.field + 5].pansionBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
        sell6.innerText = `$ ${(this.fields[this.field + 6].pansionBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
        sellGold1.innerText = `${(this.fields[this.field + 1].pansionBuy * 0.95 / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
        sellGold2.innerText = `${(this.fields[this.field + 2].pansionBuy * 0.95 / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
        sellGold3.innerText = `${(this.fields[this.field + 3].pansionBuy * 0.95 / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
        sellGold4.innerText = `${(this.fields[this.field + 4].pansionBuy * 0.95 / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
        sellGold5.innerText = `${(this.fields[this.field + 5].pansionBuy * 0.95 / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
        sellGold6.innerText = `${(this.fields[this.field + 6].pansionBuy * 0.95 / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
      }, 0);
    }
  }

  pansionBuy(): void {
    const price: number = this.fields[this.field].pansionBuy * 1000;
    if (price <= this.cash) {
      const pansion: Accomodation = new Accomodation(++this.maxPansionId, price);
      this.pansions.push(pansion);
      this.cash -= price;
      this.update();
    }
    else alert('Nincs elég pénzed a vásárláshoz!');
    console.log(this.pansions);
    return;
  }

  onlineInfo(): void {
    this.showOnlineBasicModal = true;
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'hidden';

      setTimeout(() => {
        const modalOnline1 = document.querySelector('#modalOnlineBasicPrice1') as HTMLElement;
        const modalOnline2 = document.querySelector('#modalOnlineBasicPrice2') as HTMLElement;
        const modalOnline3 = document.querySelector('#modalOnlineBasicPrice3') as HTMLElement;
        const modalOnline4 = document.querySelector('#modalOnlineBasicPrice4') as HTMLElement;
        const modalOnline5 = document.querySelector('#modalOnlineBasicPrice5') as HTMLElement;
        const modalOnline6 = document.querySelector('#modalOnlineBasicPrice6') as HTMLElement;
        const onlineToGold1 = document.querySelector('#onlineBasicToGold1') as HTMLElement;
        const onlineToGold2 = document.querySelector('#onlineBasicToGold2') as HTMLElement;
        const onlineToGold3 = document.querySelector('#onlineBasicToGold3') as HTMLElement;
        const onlineToGold4 = document.querySelector('#onlineBasicToGold4') as HTMLElement;
        const onlineToGold5 = document.querySelector('#onlineBasicToGold5') as HTMLElement;
        const onlineToGold6 = document.querySelector('#onlineBasicToGold6') as HTMLElement;

        if (!modalOnline1 || !modalOnline2 || !modalOnline3 || !modalOnline4 || !modalOnline5 || !modalOnline6 || !onlineToGold1 ||
          !onlineToGold2 || !onlineToGold3 || !onlineToGold4 || !onlineToGold5 || !onlineToGold6) {
          return;
        }

        modalOnline1.innerText = `$ ${(this.fields[this.field + 1].onlineBuy * 1000).toLocaleString('hu-HU')}`;
        modalOnline2.innerText = `$ ${(this.fields[this.field + 2].onlineBuy * 1000).toLocaleString('hu-HU')}`;
        modalOnline3.innerText = `$ ${(this.fields[this.field + 3].onlineBuy * 1000).toLocaleString('hu-HU')}`;
        modalOnline4.innerText = `$ ${(this.fields[this.field + 4].onlineBuy * 1000).toLocaleString('hu-HU')}`;
        modalOnline5.innerText = `$ ${(this.fields[this.field + 5].onlineBuy * 1000).toLocaleString('hu-HU')}`;
        modalOnline6.innerText = `$ ${(this.fields[this.field + 6].onlineBuy * 1000).toLocaleString('hu-HU')}`;
        onlineToGold1.innerText = `${(this.fields[this.field + 1].onlineBuy / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
        onlineToGold2.innerText = `${(this.fields[this.field + 2].onlineBuy / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
        onlineToGold3.innerText = `${(this.fields[this.field + 3].onlineBuy / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
        onlineToGold4.innerText = `${(this.fields[this.field + 4].onlineBuy / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
        onlineToGold5.innerText = `${(this.fields[this.field + 5].onlineBuy / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
        onlineToGold6.innerText = `${(this.fields[this.field + 6].onlineBuy / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
      }, 0);
    }
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

  levelInfo(level: number): void {
    this.showOnlineModal = true;
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'hidden';

      setTimeout(() => {
        const title = document.querySelector('#modalLevelTitle') as HTMLElement;
        const incomeGold1 = document.querySelector('#modalIncomeLevel1Gold') as HTMLElement;
        const income1 = document.querySelector('#modalIncomeLevel1Price') as HTMLElement;
        const sellGold1 = document.querySelector('#modalSellLevel1Gold') as HTMLElement;
        const sell1 = document.querySelector('#modalSellLevel1Price') as HTMLElement;
        const incomeGold2 = document.querySelector('#modalIncomeLevel2Gold') as HTMLElement;
        const income2 = document.querySelector('#modalIncomeLevel2Price') as HTMLElement;
        const sellGold2 = document.querySelector('#modalSellLevel2Gold') as HTMLElement;
        const sell2 = document.querySelector('#modalSellLevel2Price') as HTMLElement;
        const incomeGold3 = document.querySelector('#modalIncomeLevel3Gold') as HTMLElement;
        const income3 = document.querySelector('#modalIncomeLevel3Price') as HTMLElement;
        const sellGold3 = document.querySelector('#modalSellLevel3Gold') as HTMLElement;
        const sell3 = document.querySelector('#modalSellLevel3Price') as HTMLElement;
        const incomeGold4 = document.querySelector('#modalIncomeLevel4Gold') as HTMLElement;
        const income4 = document.querySelector('#modalIncomeLevel4Price') as HTMLElement;
        const sellGold4 = document.querySelector('#modalSellLevel4Gold') as HTMLElement;
        const sell4 = document.querySelector('#modalSellLevel4Price') as HTMLElement;
        const incomeGold5 = document.querySelector('#modalIncomeLevel5Gold') as HTMLElement;
        const income5 = document.querySelector('#modalIncomeLevel5Price') as HTMLElement;
        const sellGold5 = document.querySelector('#modalSellLevel5Gold') as HTMLElement;
        const sell5 = document.querySelector('#modalSellLevel5Price') as HTMLElement;
        const incomeGold6 = document.querySelector('#modalIncomeLevel6Gold') as HTMLElement;
        const income6 = document.querySelector('#modalIncomeLevel6Price') as HTMLElement;
        const sellGold6 = document.querySelector('#modalSellLevel6Gold') as HTMLElement;
        const sell6 = document.querySelector('#modalSellLevel6Price') as HTMLElement;
        if (!income1 || !income2 || !income3 || !income4 || !income5 || !income6 || !title || !incomeGold1 ||
          !incomeGold2 || !incomeGold3 || !incomeGold4 || !incomeGold5 || !incomeGold6 || !sellGold1 || !sellGold2
          || !sellGold3 || !sellGold4 || !sellGold5 || !sellGold6 || !sell1 || !sell2 || !sell3 || !sell4 || !sell5
          || !sell6) {
          return;
        }
        title.innerText = `${level}. szintű üzlet piaci alakulása`
        switch (level) {
          case 1: {
            incomeGold1.innerText = `${(this.fields[this.field + 1].onlineIncome1 / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
            incomeGold2.innerText = `${(this.fields[this.field + 2].onlineIncome1 / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
            incomeGold3.innerText = `${(this.fields[this.field + 3].onlineIncome1 / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
            incomeGold4.innerText = `${(this.fields[this.field + 4].onlineIncome1 / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
            incomeGold5.innerText = `${(this.fields[this.field + 5].onlineIncome1 / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
            incomeGold6.innerText = `${(this.fields[this.field + 6].onlineIncome1 / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
            income1.innerText = `$ ${(this.fields[this.field + 1].onlineIncome1 * 1000).toLocaleString('hu-HU')}`;
            income2.innerText = `$ ${(this.fields[this.field + 2].onlineIncome1 * 1000).toLocaleString('hu-HU')}`;
            income3.innerText = `$ ${(this.fields[this.field + 3].onlineIncome1 * 1000).toLocaleString('hu-HU')}`;
            income4.innerText = `$ ${(this.fields[this.field + 4].onlineIncome1 * 1000).toLocaleString('hu-HU')}`;
            income5.innerText = `$ ${(this.fields[this.field + 5].onlineIncome1 * 1000).toLocaleString('hu-HU')}`;
            income6.innerText = `$ ${(this.fields[this.field + 6].onlineIncome1 * 1000).toLocaleString('hu-HU')}`;
            sellGold1.innerText = `${(this.fields[this.field + 1].onlineSell1 / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
            sellGold2.innerText = `${(this.fields[this.field + 2].onlineSell1 / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
            sellGold3.innerText = `${(this.fields[this.field + 3].onlineSell1 / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
            sellGold4.innerText = `${(this.fields[this.field + 4].onlineSell1 / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
            sellGold5.innerText = `${(this.fields[this.field + 5].onlineSell1 / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
            sellGold6.innerText = `${(this.fields[this.field + 6].onlineSell1 / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
            sell1.innerText = `$ ${(this.fields[this.field + 1].onlineSell1 * 1000).toLocaleString('hu-HU')}`;
            sell2.innerText = `$ ${(this.fields[this.field + 2].onlineSell1 * 1000).toLocaleString('hu-HU')}`;
            sell3.innerText = `$ ${(this.fields[this.field + 3].onlineSell1 * 1000).toLocaleString('hu-HU')}`;
            sell4.innerText = `$ ${(this.fields[this.field + 4].onlineSell1 * 1000).toLocaleString('hu-HU')}`;
            sell5.innerText = `$ ${(this.fields[this.field + 5].onlineSell1 * 1000).toLocaleString('hu-HU')}`;
            sell6.innerText = `$ ${(this.fields[this.field + 6].onlineSell1 * 1000).toLocaleString('hu-HU')}`;
            break;
          }
          case 2: {
            incomeGold1.innerText = `${(this.fields[this.field + 1].onlineIncome2 / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
            incomeGold2.innerText = `${(this.fields[this.field + 2].onlineIncome2 / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
            incomeGold3.innerText = `${(this.fields[this.field + 3].onlineIncome2 / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
            incomeGold4.innerText = `${(this.fields[this.field + 4].onlineIncome2 / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
            incomeGold5.innerText = `${(this.fields[this.field + 5].onlineIncome2 / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
            incomeGold6.innerText = `${(this.fields[this.field + 6].onlineIncome2 / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
            income1.innerText = `$ ${(this.fields[this.field + 1].onlineIncome2 * 1000).toLocaleString('hu-HU')}`;
            income2.innerText = `$ ${(this.fields[this.field + 2].onlineIncome2 * 1000).toLocaleString('hu-HU')}`;
            income3.innerText = `$ ${(this.fields[this.field + 3].onlineIncome2 * 1000).toLocaleString('hu-HU')}`;
            income4.innerText = `$ ${(this.fields[this.field + 4].onlineIncome2 * 1000).toLocaleString('hu-HU')}`;
            income5.innerText = `$ ${(this.fields[this.field + 5].onlineIncome2 * 1000).toLocaleString('hu-HU')}`;
            income6.innerText = `$ ${(this.fields[this.field + 6].onlineIncome2 * 1000).toLocaleString('hu-HU')}`;
            sellGold1.innerText = `${(this.fields[this.field + 1].onlineSell2 / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
            sellGold2.innerText = `${(this.fields[this.field + 2].onlineSell2 / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
            sellGold3.innerText = `${(this.fields[this.field + 3].onlineSell2 / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
            sellGold4.innerText = `${(this.fields[this.field + 4].onlineSell2 / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
            sellGold5.innerText = `${(this.fields[this.field + 5].onlineSell2 / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
            sellGold6.innerText = `${(this.fields[this.field + 6].onlineSell2 / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
            sell1.innerText = `$ ${(this.fields[this.field + 1].onlineSell2 * 1000).toLocaleString('hu-HU')}`;
            sell2.innerText = `$ ${(this.fields[this.field + 2].onlineSell2 * 1000).toLocaleString('hu-HU')}`;
            sell3.innerText = `$ ${(this.fields[this.field + 3].onlineSell2 * 1000).toLocaleString('hu-HU')}`;
            sell4.innerText = `$ ${(this.fields[this.field + 4].onlineSell2 * 1000).toLocaleString('hu-HU')}`;
            sell5.innerText = `$ ${(this.fields[this.field + 5].onlineSell2 * 1000).toLocaleString('hu-HU')}`;
            sell6.innerText = `$ ${(this.fields[this.field + 6].onlineSell2 * 1000).toLocaleString('hu-HU')}`;
            break;
          }
          case 3: {
            incomeGold1.innerText = `${(this.fields[this.field + 1].onlineIncome3 / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
            incomeGold2.innerText = `${(this.fields[this.field + 2].onlineIncome3 / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
            incomeGold3.innerText = `${(this.fields[this.field + 3].onlineIncome3 / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
            incomeGold4.innerText = `${(this.fields[this.field + 4].onlineIncome3 / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
            incomeGold5.innerText = `${(this.fields[this.field + 5].onlineIncome3 / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
            incomeGold6.innerText = `${(this.fields[this.field + 6].onlineIncome3 / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
            income1.innerText = `$ ${(this.fields[this.field + 1].onlineIncome3 * 1000).toLocaleString('hu-HU')}`;
            income2.innerText = `$ ${(this.fields[this.field + 2].onlineIncome3 * 1000).toLocaleString('hu-HU')}`;
            income3.innerText = `$ ${(this.fields[this.field + 3].onlineIncome3 * 1000).toLocaleString('hu-HU')}`;
            income4.innerText = `$ ${(this.fields[this.field + 4].onlineIncome3 * 1000).toLocaleString('hu-HU')}`;
            income5.innerText = `$ ${(this.fields[this.field + 5].onlineIncome3 * 1000).toLocaleString('hu-HU')}`;
            income6.innerText = `$ ${(this.fields[this.field + 6].onlineIncome3 * 1000).toLocaleString('hu-HU')}`;
            sellGold1.innerText = `${(this.fields[this.field + 1].onlineSell3 / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
            sellGold2.innerText = `${(this.fields[this.field + 2].onlineSell3 / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
            sellGold3.innerText = `${(this.fields[this.field + 3].onlineSell3 / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
            sellGold4.innerText = `${(this.fields[this.field + 4].onlineSell3 / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
            sellGold5.innerText = `${(this.fields[this.field + 5].onlineSell3 / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
            sellGold6.innerText = `${(this.fields[this.field + 6].onlineSell3 / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
            sell1.innerText = `$ ${(this.fields[this.field + 1].onlineSell3 * 1000).toLocaleString('hu-HU')}`;
            sell2.innerText = `$ ${(this.fields[this.field + 2].onlineSell3 * 1000).toLocaleString('hu-HU')}`;
            sell3.innerText = `$ ${(this.fields[this.field + 3].onlineSell3 * 1000).toLocaleString('hu-HU')}`;
            sell4.innerText = `$ ${(this.fields[this.field + 4].onlineSell3 * 1000).toLocaleString('hu-HU')}`;
            sell5.innerText = `$ ${(this.fields[this.field + 5].onlineSell3 * 1000).toLocaleString('hu-HU')}`;
            sell6.innerText = `$ ${(this.fields[this.field + 6].onlineSell3 * 1000).toLocaleString('hu-HU')}`;
            break;
          }
          case 4: {
            incomeGold1.innerText = `${(this.fields[this.field + 1].onlineIncome4 / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
            incomeGold2.innerText = `${(this.fields[this.field + 2].onlineIncome4 / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
            incomeGold3.innerText = `${(this.fields[this.field + 3].onlineIncome4 / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
            incomeGold4.innerText = `${(this.fields[this.field + 4].onlineIncome4 / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
            incomeGold5.innerText = `${(this.fields[this.field + 5].onlineIncome4 / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
            incomeGold6.innerText = `${(this.fields[this.field + 6].onlineIncome4 / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
            income1.innerText = `$ ${(this.fields[this.field + 1].onlineIncome4 * 1000).toLocaleString('hu-HU')}`;
            income2.innerText = `$ ${(this.fields[this.field + 2].onlineIncome4 * 1000).toLocaleString('hu-HU')}`;
            income3.innerText = `$ ${(this.fields[this.field + 3].onlineIncome4 * 1000).toLocaleString('hu-HU')}`;
            income4.innerText = `$ ${(this.fields[this.field + 4].onlineIncome4 * 1000).toLocaleString('hu-HU')}`;
            income5.innerText = `$ ${(this.fields[this.field + 5].onlineIncome4 * 1000).toLocaleString('hu-HU')}`;
            income6.innerText = `$ ${(this.fields[this.field + 6].onlineIncome4 * 1000).toLocaleString('hu-HU')}`;
            sellGold1.innerText = `${(this.fields[this.field + 1].onlineSell4 / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
            sellGold2.innerText = `${(this.fields[this.field + 2].onlineSell4 / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
            sellGold3.innerText = `${(this.fields[this.field + 3].onlineSell4 / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
            sellGold4.innerText = `${(this.fields[this.field + 4].onlineSell4 / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
            sellGold5.innerText = `${(this.fields[this.field + 5].onlineSell4 / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
            sellGold6.innerText = `${(this.fields[this.field + 6].onlineSell4 / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
            sell1.innerText = `$ ${(this.fields[this.field + 1].onlineSell4 * 1000).toLocaleString('hu-HU')}`;
            sell2.innerText = `$ ${(this.fields[this.field + 2].onlineSell4 * 1000).toLocaleString('hu-HU')}`;
            sell3.innerText = `$ ${(this.fields[this.field + 3].onlineSell4 * 1000).toLocaleString('hu-HU')}`;
            sell4.innerText = `$ ${(this.fields[this.field + 4].onlineSell4 * 1000).toLocaleString('hu-HU')}`;
            sell5.innerText = `$ ${(this.fields[this.field + 5].onlineSell4 * 1000).toLocaleString('hu-HU')}`;
            sell6.innerText = `$ ${(this.fields[this.field + 6].onlineSell4 * 1000).toLocaleString('hu-HU')}`;
            break;
          }
          case 5: {
            incomeGold1.innerText = `${(this.fields[this.field + 1].onlineIncome5 / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
            incomeGold2.innerText = `${(this.fields[this.field + 2].onlineIncome5 / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
            incomeGold3.innerText = `${(this.fields[this.field + 3].onlineIncome5 / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
            incomeGold4.innerText = `${(this.fields[this.field + 4].onlineIncome5 / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
            incomeGold5.innerText = `${(this.fields[this.field + 5].onlineIncome5 / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
            incomeGold6.innerText = `${(this.fields[this.field + 6].onlineIncome5 / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
            income1.innerText = `$ ${(this.fields[this.field + 1].onlineIncome5 * 1000).toLocaleString('hu-HU')}`;
            income2.innerText = `$ ${(this.fields[this.field + 2].onlineIncome5 * 1000).toLocaleString('hu-HU')}`;
            income3.innerText = `$ ${(this.fields[this.field + 3].onlineIncome5 * 1000).toLocaleString('hu-HU')}`;
            income4.innerText = `$ ${(this.fields[this.field + 4].onlineIncome5 * 1000).toLocaleString('hu-HU')}`;
            income5.innerText = `$ ${(this.fields[this.field + 5].onlineIncome5 * 1000).toLocaleString('hu-HU')}`;
            income6.innerText = `$ ${(this.fields[this.field + 6].onlineIncome5 * 1000).toLocaleString('hu-HU')}`;
            sellGold1.innerText = `${(this.fields[this.field + 1].onlineSell5 / this.fields[this.field + 1].gold).toLocaleString('hu-HU')}`;
            sellGold2.innerText = `${(this.fields[this.field + 2].onlineSell5 / this.fields[this.field + 2].gold).toLocaleString('hu-HU')}`;
            sellGold3.innerText = `${(this.fields[this.field + 3].onlineSell5 / this.fields[this.field + 3].gold).toLocaleString('hu-HU')}`;
            sellGold4.innerText = `${(this.fields[this.field + 4].onlineSell5 / this.fields[this.field + 4].gold).toLocaleString('hu-HU')}`;
            sellGold5.innerText = `${(this.fields[this.field + 5].onlineSell5 / this.fields[this.field + 5].gold).toLocaleString('hu-HU')}`;
            sellGold6.innerText = `${(this.fields[this.field + 6].onlineSell5 / this.fields[this.field + 6].gold).toLocaleString('hu-HU')}`;
            sell1.innerText = `$ ${(this.fields[this.field + 1].onlineSell5 * 1000).toLocaleString('hu-HU')}`;
            sell2.innerText = `$ ${(this.fields[this.field + 2].onlineSell5 * 1000).toLocaleString('hu-HU')}`;
            sell3.innerText = `$ ${(this.fields[this.field + 3].onlineSell5 * 1000).toLocaleString('hu-HU')}`;
            sell4.innerText = `$ ${(this.fields[this.field + 4].onlineSell5 * 1000).toLocaleString('hu-HU')}`;
            sell5.innerText = `$ ${(this.fields[this.field + 5].onlineSell5 * 1000).toLocaleString('hu-HU')}`;
            sell6.innerText = `$ ${(this.fields[this.field + 6].onlineSell5 * 1000).toLocaleString('hu-HU')}`;
            break;
          }
        }
      }, 0);
    }
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
    if (this.cash < 0) {
      alert('Nem lehet tartozásod, adj el valamit, hogy legalább 0-ra hozd az egyenlegedet!');
      return;
    }
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
        this.cash += this.fields[this.field].onlineIncome5 * 1000 * this.online5;
        this.cash += this.fields[this.field].onlineIncome4 * 1000 * this.online4;
        this.cash += this.fields[this.field].onlineIncome3 * 1000 * this.online3;
        this.cash += this.fields[this.field].onlineIncome2 * 1000 * this.online2;
        this.cash += this.fields[this.field].onlineIncome1 * 1000 * this.online1;
        this.online5 += this.online4;
        this.online4 = this.online3;
        this.online3 = this.online2;
        this.online2 = this.online1;
        this.online1 = 0;
        this.cash += this.fields[this.field].flatRent * 1000 * this.flats.length;
        this.cash += this.fields[this.field].pansionIncome * 1000 * this.pansions.length;
        for (const flat of this.flats) {
          this.cash -= flat.repay();
          flat.debtLevelUp();
        }
        for (const pansion of this.pansions) {
          this.cash -= pansion.repay();
          pansion.debtLevelUp();
        }
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
      if (bank % 1000 !== 0) {
        alert('A bankba helyezett összegnek 1000-rel oszthatónak kell lennie!');
        bankInp.value = this.bank.toString();
        return;
      }
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
      if (gbp % 1000 !== 0) {
        alert('A GBP/USD mennyiségnek 1000-rel oszthatónak kell lennie!');
        gbpInp.value = this.gbp.toString();
        return;
      }
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
      if (eur % 1000 !== 0) {
        alert('A EUR/USD mennyiségnek 1000-rel oszthatónak kell lennie!');
        eurInp.value = this.eur.toString();
        return;
      }
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
      if (usd % 1000 !== 0) {
        alert('A USD/JPY mennyiségnek 1000-rel oszthatónak kell lennie!');
        usdInp.value = this.usd.toString();
        return;
      }
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
  closeGoldModal(): void {
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'auto';
    }
    this.showGoldModal = false;
  }
  closeMineModal(): void {
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'auto';
    }
    this.showMineModal = false;
  }
  closeChocolateModal(): void {
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'auto';
    }
    this.showChocolateModal = false;
  }
  closeOnlineBasicModal(): void {
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'auto';
    }
    this.showOnlineBasicModal = false;
  }
  closeLevelModal(): void {
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'auto';
    }
    this.showOnlineModal = false;
  }
  closeFlatModal(): void {
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'auto';
    }
    this.showFlatModal = false;
  }
  closePansionModal(): void {
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLElement;
      body.style.overflow = 'auto';
    }
    this.showPansionModal = false;
  }

  @HostListener('window:popstate')
  onPopState(): void {
    this.onBack();
  }
}