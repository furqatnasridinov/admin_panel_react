export class BookingData {
  constructor(
    id,
    gymId,
    gymName,
    startTime,
    endTime,
    lessonType,
    lessonId,
    repeat,
    usersCounts,
    title,
    userName,
    pictureUrl,
  ) {
    this.id = id;
    this.gymId = gymId;
    this.gymName = gymName;
    this.startTime = startTime;
    this.endTime = endTime;
    this.lessonType = lessonType;
    this.lessonId = lessonId;
    this.repeat = repeat;
    this.usersCounts = usersCounts;
    this.title = title;
    this.userName = userName;
    this.pictureUrl = pictureUrl;
  }
}
