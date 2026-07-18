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
    this.fields = this.reader.readingFields();
    if (typeof document !== 'undefined') {
      const goldPrice = document.querySelector('#goldPrice') as HTMLElement;
      const goldAmount = document.querySelector('#goldAmount') as HTMLElement;
      const minePrice = document.querySelector('#minePrice') as HTMLElement;
      const mineAmount = document.querySelector('#mineAmount') as HTMLElement;
      const chocolatePrice = document.querySelector('#chocolatePrice') as HTMLElement;
      const chocolateAmount = document.querySelector('#chocolateAmount') as HTMLElement;
      const flatPrice = document.querySelector('#flatPrice') as HTMLElement;
      const pansionPrice = document.querySelector('#pansionPrice') as HTMLElement;
      const onlinePrice = document.querySelector('#onlinePrice') as HTMLElement;
      const start = this.fields[this.startField];
      goldPrice.innerText = `$${(start.gold * 1000).toLocaleString('hu-HU')}`;
      goldAmount.innerText = '0 db';
      minePrice.innerText = `$${(start.mine * 1000).toLocaleString('hu-HU')}`;
      mineAmount.innerText = '0 db';
      chocolatePrice.innerText = `$${(start.chocolate * 1000).toLocaleString('hu-HU')}`;
      chocolateAmount.innerText = '0 db';
      flatPrice.innerText = `$${(start.flatBuy * 1000).toLocaleString('hu-HU')}`;
      pansionPrice.innerText = `$${(start.pansionBuy * 1000).toLocaleString('hu-HU')}`;
      onlinePrice.innerText = `$${(start.onlineBuy * 1000).toLocaleString('hu-HU')}`;
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

  mineInfo(): void {
    console.log('Mine Info');
  }

  chocolateInfo(): void {
    console.log('Chocolate Info');
  }

  flatInfo(): void {
    console.log('Flat Info');
  }

  pansionInfo(): void {
    console.log('Pansion Info');
  }

  onlineInfo(): void {
    console.log('Online Info');
  }

  level1Info(): void {
    console.log('Level 1 Info');
  }

  level2Info(): void {
    console.log('Level 2 Info');
  }

  level3Info(): void {
    console.log('Level 3 Info');
  }

  level4Info(): void {
    console.log('Level 4 Info');
  }

  level5Info(): void {
    console.log('Level 5 Info');
  }
}
