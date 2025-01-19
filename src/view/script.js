const storyDiv = document.getElementById("stories");
const socket = new WebSocket("ws://localhost:5000");

async function stories() {
  try {
    const request = await fetch("/api/stories");
    const resposne = await request.json();
    resposne.stories.forEach((item) => showStories(item, false));
  } catch (err) {
    console.log(err);
  }
}
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log(message);
  if (message.event === "newStories") {
    //console.log(message);
    document.getElementById("count").innerText = message.count;
    message.stories.forEach((item) => showStories(item, true));
  }
};

function showStories(story, isSocket) {
  const div = document.createElement("div");
  const mainTitles = document.createElement("div");
  const storyDetails = document.createElement("div");

  div.setAttribute("class", "wrapper");
  mainTitles.setAttribute("class", "main");
  storyDetails.setAttribute("class", "details");

  const link = document.createElement("a");
  link.href = story.link;
  link.innerText = story.title;
  link.setAttribute("class", "title");
  mainTitles.append(link);

  const sitelink = document.createElement("a");
  sitelink.href = story.siteLink;
  sitelink.innerText = `(${story.siteTitle})`;
  sitelink.setAttribute("class", "site");
  mainTitles.append(sitelink);

  const upvotes = document.createElement("span");
  upvotes.innerText = `${story.upvotes} upvotes`;
  storyDetails.append(upvotes);

  const time = document.createElement("span");
  time.innerText = timeAgo(story.postTime || story.time);
  storyDetails.append(time);

  div.append(mainTitles);
  div.append(storyDetails);
  if (isSocket) {
    storyDiv.insertBefore(div, storyDiv.firstChild);
  } else {
    storyDiv.append(div);
  }
}

function timeAgo(time) {
  const now = Math.floor(Date.now() / 1000);
  const difference = now - time;
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(difference / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

stories();
