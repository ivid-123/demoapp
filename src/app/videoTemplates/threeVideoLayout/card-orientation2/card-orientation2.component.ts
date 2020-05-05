import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { VideoTemplateService } from 'src/app/services/video-template.service';
import { VideoService } from 'src/app/services/video.service';
import { VIDEO_ONE, VIDEO_THREE, VIDEO_TWO, FORMAT_VTT, VIDEO_FORMAT, VIDEO_BASE_URL } from 'src/app/config/constants';


@Component({
  selector: 'app-card-orientation2',
  templateUrl: './card-orientation2.component.html',
  styleUrls: ['./card-orientation2.component.css']
})
export class CardOrientation2Component implements OnInit, AfterViewInit {
  startTimeOne: Date;
  startTimeTwo: Date;
  startTimeThree: Date;
  endTimeone: Date;
  endTimeTwo: Date;
  endTimeThree: Date;
  loadedVttone = true;
  loadedVtttwo = true;
  loadedVttthree = true;
  @ViewChild('videoOne') videoOne: ElementRef;
  @ViewChild('videoTwo') videoTwo: ElementRef;
  @ViewChild('videoThree') videoThree: ElementRef;
  videoUrl = VIDEO_BASE_URL + VIDEO_ONE + VIDEO_FORMAT;
  videoVtt = VIDEO_BASE_URL + VIDEO_ONE + FORMAT_VTT;
  videoUrlTwo = VIDEO_BASE_URL + VIDEO_TWO + VIDEO_FORMAT;
  videoVttTwo = VIDEO_BASE_URL + VIDEO_TWO + FORMAT_VTT;
  videoUrlThree = VIDEO_BASE_URL + VIDEO_THREE + VIDEO_FORMAT;
  videoVttThree = VIDEO_BASE_URL + VIDEO_THREE + FORMAT_VTT;

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
    if (
      this.startTimeOne.getTime() <
      (this.startTimeTwo.getTime() || this.startTimeThree.getTime())
    ) {
      this.videoOne.nativeElement.play();
    } else if (
      this.startTimeTwo.getTime() <
      (this.startTimeOne.getTime() || this.startTimeThree.getTime())
    ) {
      this.videoTwo.nativeElement.play();
    } else if (
      this.startTimeThree.getTime() <
      (this.startTimeOne.getTime() || this.startTimeTwo.getTime())
    ) {
      this.videoThree.nativeElement.play();
    } else {
      this.videoOne.nativeElement.play();
      this.videoTwo.nativeElement.play();
      this.videoThree.nativeElement.play();
    }
  }


  pauseVideo() {
    this.videoOne.nativeElement.pause();
    this.videoTwo.nativeElement.pause();
    this.videoThree.nativeElement.pause();
  }

  videoCueTrackoneCardTwo(e) {
    if (this.loadedVttone) {
      this.getVideoEndTimeOneCardTwo(this.videoVttThree);
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
        new Date(e.target.track.activeCues[0].text).getTime() >=
        this.startTimeThree.getTime()
      ) {
        this.videoThree.nativeElement.play();
      }
      if (
        !this.videoOne.nativeElement.paused &&
        !this.videoTwo.nativeElement.paused &&
        !this.videoThree.nativeElement.paused &&
        (this.startTimeOne.getTime() === this.startTimeTwo.getTime() ||
          this.startTimeOne.getTime() === this.startTimeThree.getTime())
      ) {
        this.updateGMTOneCardTwo(new Date(e.target.track.activeCues[0].text));
      }
      if (
        !this.videoOne.nativeElement.paused &&
        this.videoTwo.nativeElement.paused &&
        this.videoThree.nativeElement.paused
      ) {
        this.updateGMTOneCardTwo(new Date(e.target.track.activeCues[0].text));
      }
    }
  }


  videoCueTracktwoCardTwo(e) {
    if (this.loadedVtttwo) {
      this.getVideoEndTimeTwoCardTwo(this.videoVtt);
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
        new Date(e.target.track.activeCues[0].text).getTime() >=
        this.startTimeThree.getTime()
      ) {
        this.videoThree.nativeElement.play();
      }
      if (
        !this.videoTwo.nativeElement.paused &&
        !this.videoThree.nativeElement.paused &&
        this.startTimeTwo.getTime() > this.startTimeThree.getTime()
      ) {
        this.updateGMTOneCardTwo(new Date(e.target.track.activeCues[0].text));
      }
      if (
        !this.videoTwo.nativeElement.paused &&
        this.videoOne.nativeElement.paused &&
        this.videoThree.nativeElement.paused
      ) {
        this.updateGMTOneCardTwo(new Date(e.target.track.activeCues[0].text));
      }
    }
  }


  videoCueTrackthreeCardTwo(e) {
    if (this.loadedVttthree) {
      this.getVideoEndTimeThreeCardTwo(this.videoVttTwo);
      this.startTimeThree = new Date(e.target.track.activeCues[0].text);
      this.loadedVttthree = false;
    }
    if (!this.videoThree.nativeElement.paused) {
      if (
        new Date(e.target.track.activeCues[0].text).getTime() >=
        this.startTimeOne.getTime()
      ) {
        this.videoOne.nativeElement.play();
      }
      if (
        new Date(e.target.track.activeCues[0].text).getTime() >=
        this.startTimeTwo.getTime()
      ) {
        this.videoTwo.nativeElement.play();
      }
      if (
        !this.videoTwo.nativeElement.paused &&
        !this.videoThree.nativeElement.paused &&
        this.startTimeThree.getTime() > this.startTimeTwo.getTime()
      ) {
        this.updateGMTOneCardTwo(new Date(e.target.track.activeCues[0].text));
      }
      if (
        !this.videoThree.nativeElement.paused &&
        this.videoOne.nativeElement.paused && this.videoTwo.nativeElement.paused
      ) {
        this.updateGMTOneCardTwo(new Date(e.target.track.activeCues[0].text));
      }
    }
  }

  getVideoEndTimeOneCardTwo(req) {
    this.videoService.getGMT(req).subscribe(
      res => {
        const items = res.split('\n');
        this.endTimeone = new Date(items[items.length - 2]);
        this.videoService.compareVideoTime(
          this.startTimeOne,
          this.startTimeTwo,
          this.startTimeThree,
          this.endTimeone,
          this.endTimeTwo,
          this.endTimeThree
        );
      },
      error => {
        console.error(error);
      }
    );
  }


  getVideoEndTimeTwoCardTwo(req) {
    this.videoService.getGMT(req).subscribe(
      res => {
        const items = res.split('\n');
        this.endTimeTwo = new Date(items[items.length - 2]);
        this.videoService.compareVideoTime(
          this.startTimeOne,
          this.startTimeTwo,
          this.startTimeThree,
          this.endTimeone,
          this.endTimeTwo,
          this.endTimeThree
        );
      },
      error => {
        console.error(error);
      }
    );
  }


  getVideoEndTimeThreeCardTwo(req) {
    this.videoService.getGMT(req).subscribe(
      res => {
        const items = res.split('\n');
        this.endTimeThree = new Date(items[items.length - 2]);
        this.videoService.compareVideoTime(
          this.startTimeOne,
          this.startTimeTwo,
          this.startTimeThree,
          this.endTimeone,
          this.endTimeTwo,
          this.endTimeThree
        );
      },
      error => {
        console.error(error);
      }
    );
  }


  updateGMTOneCardTwo(currentTime) {
    this.videoService.checkCurrentTime(currentTime);
  }
}
