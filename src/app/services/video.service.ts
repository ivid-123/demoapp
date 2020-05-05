import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private startEndtime = new BehaviorSubject({ startTime: '', endTime: '' });
  startEndTime = this.startEndtime.asObservable();
  private updateGMT = new BehaviorSubject('');
  currentTime = this.updateGMT.asObservable();

  constructor(private http: HttpClient) { }

  getGMT(req) {
    // return of('2020-01-10 10:44:03.989799');
    return this.http.get(req, { responseType: 'text' });
  }

  shareTimeStartend(range: { startTime: ''; endTime: '' }) {
    this.startEndtime.next(range);
  }

  checkCurrentTime(currTime: string) {
    this.updateGMT.next(currTime);
  }


  compareVideoTime(
    startTimeOne,
    startTimeTwo,
    startTimeThree,
    endTimeOne,
    endTimeTwo,
    endTimeThree
  ) {
    if (
      startTimeOne !== undefined &&
      startTimeTwo !== undefined &&
      startTimeThree !== undefined &&
      endTimeOne !== undefined &&
      endTimeTwo !== undefined &&
      endTimeThree !== undefined
    ) {
      const startTime = new Date(
        Math.min(
          startTimeOne.getTime(),
          startTimeTwo.getTime(),
          startTimeThree.getTime()
        )
      ).toString();
      const endTime = new Date(
        Math.max(
          endTimeOne.getTime(),
          endTimeTwo.getTime(),
          endTimeThree.getTime()
        )
      ).toString();
      this.startEndtime.next({ startTime, endTime });
    }
  }
}
