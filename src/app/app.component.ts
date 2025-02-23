import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from "./side-nav/side-nav.component";
import { ToolBarComponent } from "./tool-bar/tool-bar.component";
import { CommonModule } from '@angular/common';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [
	RouterOutlet, 
	SideNavComponent, 
	ToolBarComponent, 
	CommonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
	title = 'pro-files';
	public getScreenWidth: number = 0;
  	public getScreenHeight: number = 0;
	sidebarExpanded: boolean = true;
	isSidebarClosed: boolean = true;

	constructor(private appService: AppService){
		this.appService.getIsSidebarOpened.subscribe(s => this.isSidebarClosed = !s);
	}

	ngOnInit(): void {
		this.getScreenWidth = window.innerWidth;
    	this.getScreenHeight = window.innerHeight;
	}

	@HostListener('window:resize', ['$event'])
	onWindowResize() {
		this.getScreenWidth = window.innerWidth;
		this.getScreenHeight = window.innerHeight;
		this.sidebarExpanded = this.getScreenWidth >= 768 && !this.isSidebarClosed;
	}
}
