import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { VideoTemplateService } from '../services/video-template.service';
import { VideoService } from '../services/video.service';
import { UtilFunctions } from '../utils/utilities';
import { GMT_ZONE } from '../config/constants';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, AfterViewInit {
  gmtStartTime: string;
  gmtEndTime: string;
  @Input() currentTime: Date;
  startTime: Date;
  endTime: Date;
  playpause = true;

  @ViewChild('slider') slider: ElementRef;
  @ViewChild('sliderPosition') sliderPosition: ElementRef;
  constructor(private cdRef: ChangeDetectorRef, private videotem: VideoTemplateService, private videoService: VideoService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startEndTime();
    this.slider.nativeElement.oninput = () => {
      this.setCursorTextPosition();

      this.cdRef.detectChanges();
    };
    this.sliderPosition.nativeElement.style.visibility = 'hidden';
  }


  setCursorTextPosition() {
    if (this.slider !== undefined) {
      const offset = this.slider.nativeElement.offsetWidth / (this.slider.nativeElement.max - this.slider.nativeElement.min);
      const px = ((this.slider.nativeElement.value - this.slider.nativeElement.min) * offset);

      this.sliderPosition.nativeElement.style.left = Math.floor(px) + 'px';
      this.sliderPosition.nativeElement.style.top = '-' + this.slider.nativeElement.offsetHeight + 'px';

      this.sliderPosition.nativeElement.innerHTML = UtilFunctions.secondsToHms(this.slider.nativeElement.value);
    }
  }


  initiateSlider() {
    if (this.slider !== undefined) {
      const startTimeSeconds = UtilFunctions.convertSecond(new Date(this.startTime).toLocaleTimeString(GMT_ZONE));
      const endTimeSeconds = UtilFunctions.convertSecond(new Date(this.endTime).toLocaleTimeString(GMT_ZONE));
      this.gmtStartTime = UtilFunctions.secondsToHms(startTimeSeconds);
      this.gmtEndTime = UtilFunctions.secondsToHms(endTimeSeconds);
      this.slider.nativeElement.min = startTimeSeconds;
      this.slider.nativeElement.max = endTimeSeconds;
      this.sliderPosition.nativeElement.style.visibility = 'visible';
      this.cdRef.detectChanges();
    }
  }

  playVideos(e) {
    this.playpause = false;
    this.videotem.checkplayPausecon(true);
    this.upDateTimeLine();
  }

  pauseVideos(e) {
    this.playpause = true;
    this.videotem.checkplayPausecon(false);
  }

  startEndTime() {
    this.videoService.startEndTime.subscribe((timerange) => {
      if (timerange.startTime !== '' && timerange.endTime !== '') {
        this.startTime = new Date(timerange.startTime);
        this.endTime = new Date(timerange.endTime);
        this.initiateSlider();
        this.setCursorTextPosition();
      }
    });
  }

  upDateTimeLine() {
    this.videoService.currentTime.subscribe((currentTime) => {
      if (currentTime !== '') {
        this.currentTime = new Date(currentTime);
        if (this.slider && this.startTime && this.endTime && this.currentTime) {
          this.slider.nativeElement.value = UtilFunctions.convertSecond(new Date(this.currentTime).toLocaleTimeString(GMT_ZONE));
          // this.currentTime;
          this.initiateSlider();
          this.setCursorTextPosition();
          this.cdRef.detectChanges();
        }
      }
    });
  }
}
