function loggingWithTime(message) {
  const now = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  console.log(message + " | [time: " + now + "]");
}

export { loggingWithTime };
