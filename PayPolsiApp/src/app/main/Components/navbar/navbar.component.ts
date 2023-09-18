import { Component } from '@angular/core';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { SVGIcon, bellIcon, calendarIcon, envelopeLinkIcon, inboxIcon, menuIcon, starOutlineIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public selected = "Inbox";
  public menuSvg: SVGIcon = menuIcon;

  public items: Array<DrawerItem> = [
    { text: "Inbox", svgIcon: inboxIcon, selected: true },
    { separator: true },
    { text: "Notifications", svgIcon: bellIcon },
    // { text: "Calendar", svgIcon: calendarIcon },
    // { separator: true },
    // { text: "Attachments", svgIcon: envelopeLinkIcon },
    // { text: "Favourites", svgIcon: starOutlineIcon },
  ];

  public onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.text;
  }
}
