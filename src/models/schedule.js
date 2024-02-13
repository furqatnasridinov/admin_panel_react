export class ScheduleEvent {
    constructor(id, startTime, endTime, title, lessonType, owner, repeat) {
      this.id = id;
      this.startTime = startTime;
      this.endTime = endTime;
      this.title = title;
      this.lessonType = lessonType;
      this.owner = owner;
      this.repeat = repeat;
    }
  }
  