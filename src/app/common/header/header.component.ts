import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DASHBOARD_MENU_INDEX, SEARCH_NEW_FLIGHT_TEST_LABEL, MANAGE_VIDEOS_LABEL, MANAGE_PARAMETERS_LABEL, EXPORT_LABEL,
  SEARCH_NEW_FLIGHT_TEST_LABEL_INDEX, MANAGE_VIDEOS_LABEL_INDEX, MANAGE_PARAMETERS_LABEL_INDEX,
  EXPORT_LABEL_INDEX, DEFAULT_COLOR
} from 'src/app/config/constants';
import { MenuItems } from 'src/app/models/menuItems.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  menuTextDisplay: boolean;
  menuItems: MenuItems[];

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private route: ActivatedRoute, private router: Router) {
    // Assigning the values to 'MenuItems' object array.
    this.menuItems = [
      new MenuItems(SEARCH_NEW_FLIGHT_TEST_LABEL, SEARCH_NEW_FLIGHT_TEST_LABEL_INDEX, false, DEFAULT_COLOR),
      new MenuItems(MANAGE_VIDEOS_LABEL, MANAGE_VIDEOS_LABEL_INDEX, true, ''),
      new MenuItems(MANAGE_PARAMETERS_LABEL, MANAGE_PARAMETERS_LABEL_INDEX, true, ''),
      new MenuItems(EXPORT_LABEL, EXPORT_LABEL_INDEX, true, '')
    ];
    this.menuTextDisplay = false;
  }

  ngAfterViewInit(): void {
    // Controlling the display of 'Menu' text with respect to opening and closing of Menu.
    this.trigger.menuOpened.subscribe(() => {
      this.menuTextDisplay = !this.menuTextDisplay;
    });

    this.trigger.menuClosed.subscribe(() => {
      this.menuTextDisplay = !this.menuTextDisplay;
    });
  }


  openOptionMenu(option: number) {
    // Checking the condition to load 'dashboard'.
    if (option === DASHBOARD_MENU_INDEX) {
      this.router.navigate(['dashboard']);
    }
  }


  focusItem(event: any) {
    // Iterating over all the childNodes of selected Node to check and apply required color.
    event.target.offsetParent.childNodes[0].childNodes[0].childNodes.forEach(element => {
      if (element.childNodes.length > 0 && (event.target.innerText === element.childNodes[0].innerText)) {
        // Setting selected tab to white color.
        element.childNodes[0].style.color = '#FFFFFF';
      } else if (element.childNodes.length > 0) {
        // Setting other tabs to original color.
        element.childNodes[0].style.color = '#6D7073';
      }
    });
  }
}
