import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos-graph-page',
  templateUrl: './videos-graph-page.component.html',
  styleUrls: ['./videos-graph-page.component.css']
})
export class VideosGraphPageComponent implements OnInit {
  layout = '1';
  constructor() { }

  ngOnInit(): void {
    this.defineTemplate();
  }

  defineTemplate() {
    this.layout = sessionStorage.getItem('videoscnt');
  }

}
