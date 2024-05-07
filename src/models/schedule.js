export class ScheduleEvent {
    constructor(id, 
      startTime, 
      endTime, 
      title, 
      lessonType, 
      owner, 
      repeat, 
      usersCount, 
      lessonState, 
      canSignUp, 
      deletedLesson, 
      autoAccept, 
      limitCountUser, 
      maxCount, 
      durationInMinutes,
      canEdit,
    ) {
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
        this.autoAccept = autoAccept;
        this.limitCountUser = limitCountUser;
        this.maxCount = maxCount;
        this.durationInMinutes = durationInMinutes;
        this.canEdit = canEdit;
    }
  }
  