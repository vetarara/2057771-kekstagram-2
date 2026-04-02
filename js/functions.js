// function isMeetingWithinWorkday(startDay, endDay, startMeet, duration) {
//   function toMinutes(time) {
//     const [hours, minutes] = time.split(':').map(Number);
//     return hours * 60 + minutes;
//   }

//   const startDayMin = toMinutes(startDay);
//   const endDayMin = toMinutes(endDay);
//   const startMeetMin = toMinutes(startMeet);
//   const endMeetMin = startMeetMin + duration;

//   return startMeetMin >= startDayMin && endMeetMin <= endDayMin;
// }

// isMeetingWithinWorkday();
