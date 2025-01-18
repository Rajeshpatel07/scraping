import { story } from "src/types/type";

const storyDiv: HTMLElement | null = document.getElementById("stories");
const socket = new WebSocket("ws://localhost:5000");

async function stories() {
  try {
    const request = await fetch("/api/stories");
    const resposne = await request.json();
    resposne.stories.forEach((item: story) => showStories(item, false));
  } catch (err) {
    console.log(err);
  }
}
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.event === "newStories") {
    console.log(message);
    showStories(message, true);
  }
};

function showStories(story: story, isSocket: boolean) {
  const div = document.createElement("div");

  const link = document.createElement("a");
  link.href = story.link;
  link.innerText = story.title;
  link.setAttribute("id", "title");

  const sitelink = document.createElement("a");
  sitelink.href = story.site;
  sitelink.innerText = `(${story.site})`;
  sitelink.setAttribute("id", "site");

  div.append(link);
  div.append(sitelink);
  if (storyDiv) {
    if (isSocket) {
      storyDiv.insertBefore(div, storyDiv.firstChild);
    } else {
      storyDiv.append(div);
    }
  }
}

stories();
