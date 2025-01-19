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

  const link = document.createElement("a");
  link.href = story.link;
  link.innerText = story.title;
  link.setAttribute("class", "title");

  const sitelink = document.createElement("a");
  sitelink.href = story.siteLink;
  sitelink.innerText = `(${story.siteTitle})`;
  sitelink.setAttribute("class", "site");

  div.append(link);
  div.append(sitelink);
  if (isSocket) {
    storyDiv.insertBefore(div, storyDiv.firstChild);
  } else {
    storyDiv.append(div);
  }
}

stories();
