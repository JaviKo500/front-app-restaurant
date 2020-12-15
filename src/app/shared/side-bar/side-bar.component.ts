import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/side-bar/sidebar.service';
import { SideBarModel } from '../../models/side-bar/sidebar.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  menuItems: SideBarModel [] = [];
  constructor( private sidebarService: SidebarService) {
    this.menuItems = this.sidebarService.menu;
  }

  ngOnInit(): void {
  }

}
