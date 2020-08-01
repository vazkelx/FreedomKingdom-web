import { Component, OnInit } from '@angular/core';
import data from '../../../../../assets/data.json';

@Component({
  selector: 'app-minecraft-stats-overall',
  templateUrl: './minecraft-stats-overall.component.html',
  styleUrls: ['./minecraft-stats-overall.component.scss']
})
export class MinecraftStatsOverallComponent implements OnInit {
  playerData: any;

  constructor() { 
    this.playerData = data;
    console.log(data)
    
  }

  ngOnInit(): void {
  }

}
