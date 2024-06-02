export class Stat {
    constructor({
      visitByType, 
      allVisits, 
      firstVisited,
      enrolledButNotVisited,
      visitingNow,
      regularVisitors,
      summaryVisitors,
      adminSpeedReaction,
      adminRejectedVisits,
      countBid,
    }) {
        this.visitByType = visitByType;
        this.allVisits = allVisits;
        this.firstVisited = firstVisited;
        this.enrolledButNotVisited = enrolledButNotVisited;
        this.visitingNow = visitingNow;
        this.regularVisitors = regularVisitors;
        this.summaryVisitors = summaryVisitors;
        this.adminSpeedReaction = adminSpeedReaction;
        this.adminRejectedVisits = adminRejectedVisits;
        this.countBid = countBid;
    }
  }
  