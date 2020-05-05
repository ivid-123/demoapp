import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoTemplateService {
  private checkplaypause = new BehaviorSubject(false);
  playpause = this.checkplaypause.asObservable();
  constructor() { }

  checkplayPausecon(pausePlay: boolean) {
    this.checkplaypause.next(pausePlay);
  }

}
