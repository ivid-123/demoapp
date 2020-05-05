
export class UtilFunctions {

  static convertSecond(time) {
    const hms = time;
    const a = hms.split(':');

    const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    return seconds;
  }


  static secondsToHms(data) {
    const hour = Math.floor(data / 3600);
    const min = Math.floor(data % 3600 / 60);
    const sec = Math.floor(data % 3600 % 60);
    return this.padNumber(hour) + ':' + this.padNumber(min) + ':' + this.padNumber(sec);
  }

  static padNumber(num: number) {
    const dig = (num < 10) ? ('0' + num) : num;
    return dig;
  }

  static dateTimeToIsoString(dateTime: Date) {
    const hours = dateTime.getHours();
    const mins = dateTime.getMinutes();
    const sec = dateTime.getSeconds();
    const msec = dateTime.toISOString().split('.')[1];
    const strToReplace = dateTime.toISOString().substring(dateTime.toISOString().indexOf('T') + 1, dateTime.toISOString().length);
    const reqTimeString = this.padNumber(hours) + ':' + this.padNumber(mins) + ':' + this.padNumber(sec) + '.' + msec;
    const reqDateString = dateTime.toISOString().replace(strToReplace, reqTimeString);
    return reqDateString;
  }

  static addSecondsintoDate(time) {
    const reqDateString = new Date('2019-09-04');
    reqDateString.setSeconds(time.split(':')[2]);
    reqDateString.setHours(time.split(':')[0]);
    reqDateString.setMinutes(time.split(':')[1]);
    return reqDateString;
  }
}
