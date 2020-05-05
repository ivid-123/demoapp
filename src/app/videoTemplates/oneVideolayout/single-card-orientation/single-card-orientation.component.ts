import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { VideoTemplateService } from 'src/app/services/video-template.service';
import { VideoService } from 'src/app/services/video.service';
import { VIDEO_ONE, FORMAT_VTT, VIDEO_FORMAT, VIDEO_BASE_URL } from 'src/app/config/constants';

@Component({
  selector: 'app-single-card-orientation',
  templateUrl: './single-card-orientation.component.html',
  styleUrls: ['./single-card-orientation.component.css']
})
export class SingleCardOrientationComponent
  implements OnInit, AfterViewInit, OnDestroy {
  playpause: boolean;
  loadedVtt = true;
  videoUrl = VIDEO_BASE_URL + VIDEO_ONE + VIDEO_FORMAT;
  videoVtt = VIDEO_BASE_URL + VIDEO_ONE + FORMAT_VTT;
  @ViewChild('videoOne') videoOne: ElementRef;

  constructor(
    private videotem: VideoTemplateService,
    private videoService: VideoService
  ) { }
  ngOnInit() { }

  ngAfterViewInit() {
    // Calling service for checking video play or pause
    this.videotem.playpause.subscribe(playpause => {
      if (playpause) {
        this.playvideo();
      } else {
        this.pauseVideo();
      }
    });
  }

  playvideo() {
    this.videoOne.nativeElement.play();
  }

  pauseVideo() {
    this.videoOne.nativeElement.pause();
  }

  videoCueTrack(e) {
    if (this.loadedVtt) {
      this.getVideoEndTime(
        this.videoVtt,
        new Date(e.target.track.activeCues[0].text)
      );
      this.loadedVtt = false;
    } else {
      this.updateGMTTime(new Date(e.target.track.activeCues[0].text));
    }
  }

  getVideoEndTime(req, startTime) {
    this.videoService.getGMT(req).subscribe(
      res => {
        const items = res.split('\n');
        console.log('items:', items);
        // method calling
        this.ShareStarendTime(startTime, new Date(items[items.length - 2]));
      },
      error => {
        console.error(error);
      }
    );
  }

  ShareStarendTime(startTime, endTime) {
    this.videoService.shareTimeStartend({ startTime, endTime });
  }

  updateGMTTime(currentTime) {
    this.videoService.checkCurrentTime(currentTime);
  }

  ngOnDestroy(): void {
    // console.log('test');
  }
}
