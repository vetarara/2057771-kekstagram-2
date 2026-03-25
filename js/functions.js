function isMeetingWithinWorkday(startDay, endDay, startMeet, duration) {
  function toMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const startDayMin = toMinutes(startDay);
  const endDayMin = toMinutes(endDay);
  const startMeetMin = toMinutes(startMeet);
  const endMeetMin = startMeetMin + duration;

  return startMeetMin >= startDayMin && endMeetMin <= endDayMin;
}

console.log(isMeetingWithinWorkday('08:00', '17:30', '14:00', 90));
console.log(isMeetingWithinWorkday('8:0', '10:0', '8:0', 120));
console.log(isMeetingWithinWorkday('08:00', '14:30', '14:00', 90));
console.log(isMeetingWithinWorkday('14:00', '17:30', '08:0', 90));
console.log(isMeetingWithinWorkday('8:00', '17:30', '08:00', 900));
