
## Overview
This project Scrap data from hacker news website and push live updates in real-time with websockets and RESTAPI's

## Features
- Scrap hacker news website and collect latest stories. 
- The scraped data is stored in Database.
- Periodically scrape and send latest stories to connected clients via websocket (every 5 mins).

## Prerequisites
Before setting up the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18.x or later)
- Mysql
- Docker (optional)

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rajeshpatel07/scraping
   cd scraping
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup `env` varialbes**
    ```bash
    cp .env.sample .env
    ```
    - Edit `.env` file according to instructions.

4. **Build the project**
    ```bash
    npm run build
    ``` 

5. **Run Database migration**
    ```bash
    npm run migrate
    ```

5. **Start the Server**
    ```bash
    npm start
    ```

- **The server will be started on given port**


## Installation with Docker

**NOTE: It is not recommended because the container can't use browser from inside container**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rajeshpatel07/scraping
   cd scraping
   ```

2. **Setup `env` varialbes**
    ```bash
    cp .env.sample .env
    ```

    - Edit `.env` file according to instructions.

3. **Start Container**
    ```bash
    docker compose up
    ```

- The server will be ready and running.

## API Documentation

- #### Get simple(UI) page.

```http
    GET /
```

- #### Get Stories

```http
    GET /api/stories
```
- #### websocket
 ```http
    ws://localhost:5000
 ```
 **NOTE:** This Websocket doesn't require any payload. It will return new data periodically.

 - The below is an example payload returned from the server from websocket.

 **Examples Data:**

 ```json
{
  event: "newStories",
  count: 0,
  stories: [
    {
      title: "Apple removed all ByteDance apps from the App Store",
      link: "https://support.apple.com/en-us/121596",
      siteTitle: "support.apple.com",
      siteLink: "https://news.ycombinator.com/from?site=support.apple.com",
      upvotes: 53,
      postTime: 1737266221,
      postedAt: "2025-01-19T00:27:01.000Z",
    },
  ],
};
 ```
- The stories array are the new stories scraped from hacker news

### Testing Tools:
- Use `Postman` for testing. 
- use `curl` for http testing from terminal.