import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MinecraftStatsComponent } from './pages/minecraft/minecraft-stats/minecraft-stats.component';
import { MinecraftComponent } from './pages/minecraft/minecraft/minecraft.component';
import { MinecraftMapComponent } from './pages/minecraft/minecraft-map/minecraft-map.component';
import { MinecraftStatsOverallComponent } from './pages/minecraft/minecraft-stats/minecraft-stats-overall/minecraft-stats-overall.component';

@NgModule({
	declarations: [
		AppComponent,
		MinecraftStatsComponent,
		MinecraftComponent,
		MinecraftMapComponent,
		MinecraftStatsOverallComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
