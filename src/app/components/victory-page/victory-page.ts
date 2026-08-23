import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme-service/theme-service';
import { Field } from '../../models/Field';
import { GameData } from '../../models/GameData';
import { Accomodation } from '../../models/Accomodation';

@Component({
  selector: 'app-victory-page',
  imports: [],
  templateUrl: './victory-page.html',
  styleUrl: './victory-page.css',
})
export class VictoryPage implements OnInit {
  private field: Field = new Field;
  private gameData: GameData = new GameData;
  private debt1: number = 0;
  private debt2: number = 0;
  private debt3: number = 0;
  private debt4: number = 0;
  private debt5: number = 0;

  constructor(public themeService: ThemeService, private router: Router) {
    if (typeof window !== 'undefined') {
      const storedField = window.sessionStorage.getItem('field');
      const storedGameData = window.sessionStorage.getItem('gameData');

      if (storedField) {
        this.field = Object.assign(new Field(), JSON.parse(storedField));
      }
      if (storedGameData) {
        const storedData = JSON.parse(storedGameData);
        this.gameData = Object.assign(new GameData(), storedData, {
          flats: (storedData.flats ?? []).map((flat: Accomodation) => Object.assign(
            new Accomodation(flat.id, flat.price), flat)),
          pansions: (storedData.pansions ?? []).map((pansion: Accomodation) => Object.assign(
            new Accomodation(pansion.id, pansion.price), pansion)),
        });
      }
    }
  }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    if (typeof document !== 'undefined') {
      const congrats = document.querySelector('#congratsText') as HTMLElement;
      const goldPrice = document.querySelector('#goldPrice') as HTMLElement;
      const goldAmount = document.querySelector('#goldAmount') as HTMLElement;
      const minePrice = document.querySelector('#minePrice') as HTMLElement;
      const mineAmount = document.querySelector('#mineAmount') as HTMLElement;
      const chocolatePrice = document.querySelector('#chocolatePrice') as HTMLElement;
      const chocolateAmount = document.querySelector('#chocolateAmount') as HTMLElement;
      const flatSell = document.querySelector('#flatSell') as HTMLElement;
      const flatRent = document.querySelector('#flatRent') as HTMLElement;
      const flatAmount = document.querySelector('#flatAmount') as HTMLElement;
      const pansionSell = document.querySelector('#pansionSell') as HTMLElement;
      const pansionIncome = document.querySelector('#pansionIncome') as HTMLElement;
      const pansionAmount = document.querySelector('#pansionAmount') as HTMLElement;
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
      const debt1Total = document.querySelector('#debt1Total') as HTMLElement;
      const debt2Total = document.querySelector('#debt2Total') as HTMLElement;
      const debt3Total = document.querySelector('#debt3Total') as HTMLElement;
      const debt4Total = document.querySelector('#debt4Total') as HTMLElement;
      const debt5Total = document.querySelector('#debt5Total') as HTMLElement;
      const money = document.querySelector('#money') as HTMLElement;
      this.debtCount();
      congrats.innerHTML = `Tekintsd meg összesítve, hogy a játék által reprezentált "x" év alatt mit értél el $ 1 000 000 kezdő tőkéből!`
      goldPrice.innerText = `$ ${(this.field.gold * 1000).toLocaleString('hu-HU')}`;
      goldAmount.innerText = `${this.gameData.gold.toLocaleString('hu-HU')}`;
      minePrice.innerText = `$ ${(this.field.mine * 1000).toLocaleString('hu-HU')}`;
      mineAmount.innerText = `${this.gameData.mine.toLocaleString('hu-HU')}`;
      chocolatePrice.innerText = `$ ${(this.field.chocolate * 1000).toLocaleString('hu-HU')}`;
      chocolateAmount.innerText = `${this.gameData.chocolate.toLocaleString('hu-HU')}`;
      flatSell.innerText = `$ ${(this.field.flatBuy * 1000).toLocaleString('hu-HU')}`;
      flatRent.innerText = `$ ${(this.field.flatRent * 1000).toLocaleString('hu-HU')}`;
      flatAmount.innerText = `${this.gameData.flats.length.toLocaleString('hu-HU')}`;
      pansionSell.innerText = `$ ${(this.field.pansionBuy * 1000).toLocaleString('hu-HU')}`;
      pansionIncome.innerText = `$ ${(this.field.pansionIncome * 1000).toLocaleString('hu-HU')}`;
      pansionAmount.innerText = `${this.gameData.pansions.length.toLocaleString('hu-HU')}`;
      online1Income.innerText = `$ ${(this.field.onlineIncome1 * 1000).toLocaleString('hu-HU')}`;
      online1Sell.innerText = `$ ${(this.field.onlineSell1 * 1000).toLocaleString('hu-HU')}`;
      online1Amount.innerText = `${this.gameData.online1.toLocaleString('hu-HU')}`;
      online2Income.innerText = `$ ${(this.field.onlineIncome2 * 1000).toLocaleString('hu-HU')}`;
      online2Sell.innerText = `$ ${(this.field.onlineSell2 * 1000).toLocaleString('hu-HU')}`;
      online2Amount.innerText = `${this.gameData.online2.toLocaleString('hu-HU')}`;
      online3Income.innerText = `$ ${(this.field.onlineIncome3 * 1000).toLocaleString('hu-HU')}`;
      online3Sell.innerText = `$ ${(this.field.onlineSell3 * 1000).toLocaleString('hu-HU')}`;
      online3Amount.innerText = `${this.gameData.online3.toLocaleString('hu-HU')}`;
      online4Income.innerText = `$ ${(this.field.onlineIncome4 * 1000).toLocaleString('hu-HU')}`;
      online4Sell.innerText = `$ ${(this.field.onlineSell4 * 1000).toLocaleString('hu-HU')}`;
      online4Amount.innerText = `${this.gameData.online4.toLocaleString('hu-HU')}`;
      online5Income.innerText = `$ ${(this.field.onlineIncome5 * 1000).toLocaleString('hu-HU')}`;
      online5Sell.innerText = `$ ${(this.field.onlineSell5 * 1000).toLocaleString('hu-HU')}`;
      online5Amount.innerText = `${this.gameData.online5.toLocaleString('hu-HU')}`;
      debt1Total.innerText = `$ ${this.debt1}`;
      debt2Total.innerText = `$ ${this.debt2}`;
      debt3Total.innerText = `$ ${this.debt3}`;
      debt4Total.innerText = `$ ${this.debt4}`;
      debt5Total.innerText = `$ ${this.debt5}`;
      money.innerText = `$ ${this.changeToMoney().toLocaleString('hu-HU')}`;
    }
  }

  onBackToMain(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
    this.router.navigate(['']);
  }

  debtCount(): void {
    for (let i = 0; i < this.gameData.flats.length; i++) {
      const level = this.gameData.flats[i].debtLevel;
      switch (level) {
        case 1: {
          this.debt1 += this.gameData.flats[i].debt;
          break;
        }
        case 2: {
          this.debt2 += this.gameData.flats[i].debt;
          break;
        }
        case 3: {
          this.debt3 += this.gameData.flats[i].debt;
          break;
        }
        case 4: {
          this.debt4 += this.gameData.flats[i].debt;
          break;
        }
        case 5: {
          this.debt5 += this.gameData.flats[i].debt;
          break;
        }
      }
    }
  }

  changeToMoney(): number {
    let money: number = this.gameData.cash;
    money += this.gameData.gold * this.field.gold * 1000;
    money += this.gameData.mine * this.field.mine * 1000;
    money += this.gameData.chocolate * this.field.chocolate * 1000;
    money += this.gameData.flats.length * this.field.flatRent * 1000;
    money += this.gameData.flats.length * this.field.flatBuy * 1000;
    money += this.gameData.pansions.length * this.field.pansionIncome * 1000;
    money += this.gameData.pansions.length * this.field.pansionBuy * 1000;
    money += this.gameData.online1 * this.field.onlineIncome1 * 1000;
    money += this.gameData.online1 * this.field.onlineSell1 * 1000;
    money += this.gameData.online2 * this.field.onlineIncome2 * 1000;
    money += this.gameData.online2 * this.field.onlineSell2 * 1000;
    money += this.gameData.online3 * this.field.onlineIncome3 * 1000;
    money += this.gameData.online3 * this.field.onlineSell3 * 1000;
    money += this.gameData.online4 * this.field.onlineIncome4 * 1000;
    money += this.gameData.online4 * this.field.onlineSell4 * 1000;
    money += this.gameData.online5 * this.field.onlineIncome5 * 1000;
    money += this.gameData.online5 * this.field.onlineSell5 * 1000;
    for (let i = 0; i < this.gameData.flats.length; i++) money -= this.gameData.flats[i].totalRepay(money);
    for (let i = 0; i < this.gameData.pansions.length; i++) money -= this.gameData.pansions[i].totalRepay(money);
    return money;
  }
}
