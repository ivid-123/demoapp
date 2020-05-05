import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoTemplateService } from '../services/video-template.service';
import { VideoService } from '../services/video.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  videoOneData: any;
  constructor(
    private router: Router,
    private videotem: VideoTemplateService,
    private videoService: VideoService
  ) { }

  ngOnInit(): void { }
  ngAfterViewInit() {
    this.videoService.shareTimeStartend({ startTime: '', endTime: '' });
    this.videoService.checkCurrentTime('');
    this.videotem.checkplayPausecon(false);
  }


  onevideos() {
    sessionStorage.setItem('videoscnt', '1');
    this.router.navigate(['/videos']);
  }


  twovideos() {
    sessionStorage.setItem('videoscnt', '2');
    this.router.navigate(['/videos']);
  }


  threevideos() {
    sessionStorage.setItem('videoscnt', '3');
    this.router.navigate(['/videos']);
  }
}
