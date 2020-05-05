import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { VideoTemplateService } from 'src/app/services/video-template.service';
import { VIDEO_ONE, VIDEO_TWO, FORMAT_VTT, VIDEO_FORMAT, VIDEO_BASE_URL } from 'src/app/config/constants';
import { VideoService } from 'src/app/services/video.service';


@Component({
  selector: 'app-two-card-orientation',
  templateUrl: './two-card-orientation.component.html',
  styleUrls: ['./two-card-orientation.component.css']
})
export class TwoCardOrientationComponent
  implements OnInit, AfterViewInit, OnDestroy {
  loadedVttone = true;
  loadedVtttwo = true;
  startTimeOne: Date;
  startTimeTwo: Date;
  endTimeone: Date;
  endTimeTwo: Date;
  sliderStartTime: Date;
  sliderEndTime: Date;
  @ViewChild('videoOne') videoOne: ElementRef;
  @ViewChild('videoTwo') videoTwo: ElementRef;
  videoUrl = VIDEO_BASE_URL + VIDEO_ONE + VIDEO_FORMAT;
  videoVtt = VIDEO_BASE_URL + VIDEO_ONE + FORMAT_VTT;
  videoUrlTwo = VIDEO_BASE_URL + VIDEO_TWO + VIDEO_FORMAT;
  videoVttTwo = VIDEO_BASE_URL + VIDEO_TWO + FORMAT_VTT;
  constructor(
    private videotem: VideoTemplateService,
    private videoService: VideoService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.videotem.playpause.subscribe(playpause => {
      if (playpause) {
        this.playvideo();
      } else {
        this.pauseVideo();
      }
    });
  }


  playvideo() {
    if (this.startTimeOne.getTime() < this.startTimeTwo.getTime()) {
      this.videoOne.nativeElement.play();
    } else if (this.startTimeTwo.getTime() < this.startTimeOne.getTime()) {
      this.videoTwo.nativeElement.play();
    } else {
      this.videoOne.nativeElement.play();
      this.videoTwo.nativeElement.play();
    }
  }

  pauseVideo() {
    this.videoOne.nativeElement.pause();
    this.videoTwo.nativeElement.pause();
  }

  videoCueTrackone(e) {
    if (this.loadedVttone) {
      this.getVideoEndTimeOne(this.videoVtt);
      this.startTimeOne = new Date(e.target.track.activeCues[0].text);
      this.loadedVttone = false;
    }
    if (!this.videoOne.nativeElement.paused) {
      if (
        new Date(e.target.track.activeCues[0].text).getTime() >=
        this.startTimeTwo.getTime()
      ) {
        this.videoTwo.nativeElement.play();
      }
      if (
        !this.videoOne.nativeElement.paused &&
        !this.videoTwo.nativeElement.paused &&
        this.startTimeOne.getTime() > this.startTimeTwo.getTime()
      ) {
        this.updateGMTOne(new Date(e.target.track.activeCues[0].text));
      }
      if (
        !this.videoOne.nativeElement.paused &&
        !this.videoTwo.nativeElement.paused &&
        this.startTimeOne.getTime() === this.startTimeTwo.getTime()
      ) {
        this.updateGMTOne(new Date(e.target.track.activeCues[0].text));
      }
      if (
        !this.videoOne.nativeElement.paused &&
        this.videoTwo.nativeElement.paused
      ) {
        this.updateGMTOne(new Date(e.target.track.activeCues[0].text));
      }
    }
  }

  videoCueTracktwo(e) {
    if (this.loadedVtttwo) {
      this.getVideoEndTimeTwo(this.videoVttTwo);
      this.startTimeTwo = new Date(e.target.track.activeCues[0].text);
      this.loadedVtttwo = false;
    }
    if (!this.videoTwo.nativeElement.paused) {
      if (
        new Date(e.target.track.activeCues[0].text).getTime() >=
        this.startTimeOne.getTime()
      ) {
        this.videoOne.nativeElement.play();
      }
      if (
        !this.videoOne.nativeElement.paused &&
        !this.videoTwo.nativeElement.paused &&
        this.startTimeTwo.getTime() > this.startTimeOne.getTime()
      ) {
        this.updateGMTOne(new Date(e.target.track.activeCues[0].text));
      }
      if (
        !this.videoTwo.nativeElement.paused &&
        this.videoOne.nativeElement.paused
      ) {
        this.updateGMTOne(new Date(e.target.track.activeCues[0].text));
      }
    }
  }

  getVideoEndTimeOne(req) {
    this.videoService.getGMT(req).subscribe(
      res => {
        const items = res.split('\n');
        this.endTimeone = new Date(items[items.length - 3]);
        this.compareVideoTime();
      },
      error => {
        console.error(error);
      }
    );
  }

  getVideoEndTimeTwo(req) {
    this.videoService.getGMT(req).subscribe(
      res => {
        const items = res.split('\n');
        this.endTimeTwo = new Date(items[items.length - 2]);
        this.compareVideoTime();
      },
      error => {
        console.error(error);
      }
    );
  }

  ShareStarendTime(startTime, endTime) {
    this.videoService.shareTimeStartend({ startTime, endTime });
  }

  updateGMTOne(currentTime) {
    this.videoService.checkCurrentTime(currentTime);
  }

  compareVideoTime() {
    if (
      this.startTimeOne !== undefined &&
      this.startTimeTwo !== undefined &&
      this.endTimeone !== undefined && this.endTimeTwo !== undefined
    ) {
      this.sliderStartTime =
        this.startTimeOne.getTime() <= this.startTimeTwo.getTime()
          ? this.startTimeOne
          : this.startTimeTwo;
      this.sliderEndTime =
        this.endTimeone.getTime() >= this.endTimeTwo.getTime()
          ? this.endTimeone
          : this.endTimeTwo;
      this.ShareStarendTime(this.sliderStartTime, this.sliderEndTime);
    }
  }
  ngOnDestroy(): void { }
}
