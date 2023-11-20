
function convertStartDateWithoutTimezone(date: Date): string {
  return date.toLocaleDateString();
}

// Example usage
const leave = {
  start: new Date(),
};

const startDateWithoutTimezone = convertStartDateWithoutTimezone(leave.start);
console.log(startDateWithoutTimezone);
