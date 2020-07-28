import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MinecraftMapComponent } from './pages/minecraft/minecraft-map/minecraft-map.component';
import { MinecraftStatsOverallComponent } from './pages/minecraft/minecraft-stats/minecraft-stats-overall/minecraft-stats-overall.component';
import { MinecraftStatsComponent } from './pages/minecraft/minecraft-stats/minecraft-stats.component';
import { MinecraftComponent } from './pages/minecraft/minecraft/minecraft.component';
import $ from 'jquery';

const routes: Routes = [
	{ 
		path: '', 
		component: HomeComponent 
	},
	{ 
		path: 'minecraft', 
		component: MinecraftComponent 
	},
	{ 
		path: 'minecraft/map', 
		component: MinecraftMapComponent 
	},
	{ 
		path: 'minecraft/stats', 
		component: MinecraftStatsComponent,
		children: [
			{
				path: 'overall', 
				component: MinecraftStatsOverallComponent,
			}
		]
	}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

// Dropdown multilevel nav-bar
$(document).on('click', '.dropdown-menu', function (e) {
	e.stopPropagation();
  });
  
  // make it as accordion for smaller screens
  if ($(window).width() < 992) {
	$('.dropdown-menu a').click(function(e){
	  e.preventDefault();
		if($(this).next('.submenu').length){
		  $(this).next('.submenu').toggle();
		}
		$('.dropdown').on('hide.bs.dropdown', function () {
	   $(this).find('.submenu').hide();
	})
	});
  }