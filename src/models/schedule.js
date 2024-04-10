export class ScheduleEvent {
    constructor(id, startTime, endTime, title, lessonType, owner, repeat, usersCount, lessonState, canSignUp, deletedLesson) {
      this.id = id;
      this.startTime = startTime;
      this.endTime = endTime;
      this.title = title;
      this.lessonType = lessonType;
      this.owner = owner;
      this.repeat = repeat;
      this.usersCount = usersCount;
      this.lessonState = lessonState;
      this.canSignUp = canSignUp;
      this.deletedLesson = deletedLesson;
    }
  }
  