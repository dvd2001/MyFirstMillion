import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme-service';
import { DataReadingService } from '../../services/data-reading-service/data-reading-service';
import { Router } from '@angular/router';
import { Field } from '../../models/Field';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-game-page',
  imports: [NgIf],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage implements OnInit {
  private fields: Field[] = [];
  private startField: number = 0;
  private maxOnline: number = 0;
  public showLevel1 = false;
  public showLevel2 = false;
  public showLevel3 = false;
  public showLevel4 = false;
  public showLevel5 = false;
  public showFlat = false;
  public showPansion = false;
  public mobile = false;
  constructor(public themeService: ThemeService, private router: Router, private reader: DataReadingService) {
    if (typeof window !== 'undefined') {
      const start = window.sessionStorage.getItem('startField');
      const online = window.sessionStorage.getItem('maxOnline');
      if (start) {
        this.startField = parseInt(start);
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
    if (typeof document !== 'undefined') {
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
      const online2Amount = document.querySelector('#online1Amount') as HTMLElement;
      const online3Income = document.querySelector('#online3Income') as HTMLElement;
      const online3Sell = document.querySelector('#online3Sell') as HTMLElement;
      const online3Amount = document.querySelector('#online1Amount') as HTMLElement;
      const online4Income = document.querySelector('#online4Income') as HTMLElement;
      const online4Sell = document.querySelector('#online4Sell') as HTMLElement;
      const online4Amount = document.querySelector('#online1Amount') as HTMLElement;
      const online5Income = document.querySelector('#online5Income') as HTMLElement;
      const online5Sell = document.querySelector('#online5Sell') as HTMLElement;
      const online5Amount = document.querySelector('#online1Amount') as HTMLElement;
      const start = this.fields[this.startField];
      goldPrice.innerText = `$${(start.gold * 1000).toLocaleString('hu-HU')}`;
      goldAmount.innerText = '0 db';
      minePrice.innerText = `$${(start.mine * 1000).toLocaleString('hu-HU')}`;
      mineAmount.innerText = '0 db';
      chocolatePrice.innerText = `$${(start.chocolate * 1000).toLocaleString('hu-HU')}`;
      chocolateAmount.innerText = '0 db';
      flatPrice.innerText = `$${(start.flatBuy * 1000).toLocaleString('hu-HU')}`;
      flatDebt.innerText = `$${(start.flatDebt * 1000).toLocaleString('hu-HU')}`;
      flatSell.innerText = `$${(start.flatBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
      flatRent.innerText = `$${(start.flatRent * 1000).toLocaleString('hu-HU')}`;
      pansionPrice.innerText = `$${(start.pansionBuy * 1000).toLocaleString('hu-HU')}`;
      pansionDebt.innerText = `$${(start.pansionDebt * 1000).toLocaleString('hu-HU')}`;
      pansionSell.innerText = `$${(start.pansionBuy * 1000 * 0.95).toLocaleString('hu-HU')}`;
      pansionIncome.innerText = `$${(start.pansionIncome * 1000).toLocaleString('hu-HU')}`;
      onlinePrice.innerText = `$${(start.onlineBuy * 1000).toLocaleString('hu-HU')}`;
      online1Income.innerText = `$${(start.onlineIncome1 * 1000).toLocaleString('hu-HU')}`;
      online1Sell.innerText = `$${(start.onlineSell1 * 1000).toLocaleString('hu-HU')}`;
      online1Amount.innerText = '0 db';
      online2Income.innerText = `$${(start.onlineIncome2 * 1000).toLocaleString('hu-HU')}`;
      online2Sell.innerText = `$${(start.onlineSell2 * 1000).toLocaleString('hu-HU')}`;
      online2Amount.innerText = '0 db';
      online3Income.innerText = `$${(start.onlineIncome3 * 1000).toLocaleString('hu-HU')}`;
      online3Sell.innerText = `$${(start.onlineSell3 * 1000).toLocaleString('hu-HU')}`;
      online3Amount.innerText = '0 db';
      online4Income.innerText = `$${(start.onlineIncome4 * 1000).toLocaleString('hu-HU')}`;
      online4Sell.innerText = `$${(start.onlineSell4 * 1000).toLocaleString('hu-HU')}`;
      online4Amount.innerText = '0 db';
      online5Income.innerText = `$${(start.onlineIncome5 * 1000).toLocaleString('hu-HU')}`;
      online5Sell.innerText = `$${(start.onlineSell5 * 1000).toLocaleString('hu-HU')}`;
      online5Amount.innerText = '0 db';
    }
  }
  onBack(): void {
    this.router.navigate(['']);
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('startField');
      window.sessionStorage.removeItem('maxOnline');
    }
  }

  goldInfo(): void {
    console.log('Gold Info');
  }

  goldBuy(): void {

  }

  goldSell(): void {

  }

  mineInfo(): void {
    console.log('Mine Info');
  }

  mineBuy(): void {

  }

  mineSell(): void {

  }

  chocolateInfo(): void {
    console.log('Chocolate Info');
  }

  chocolateBuy(): void {

  }

  chocolateSell(): void {

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

  }

  level1Info(): void {
    console.log('Level 1 Info');
  }

  online1Sell(): void {

  }

  level2Info(): void {
    console.log('Level 2 Info');
  }

  online2Sell(): void {

  }

  level3Info(): void {
    console.log('Level 3 Info');
  }

  online3Sell(): void {

  }

  level4Info(): void {
    console.log('Level 4 Info');
  }

  online4Sell(): void {

  }

  level5Info(): void {
    console.log('Level 5 Info');
  }

  online5Sell(): void {

  }
}
