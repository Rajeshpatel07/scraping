CREATE DATABASE IF NOT EXISTS scraping;
USE scraping;
CREATE TABLE IF NOT EXISTS story (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    link TEXT NOT NULL,
    siteTitle TEXT,
    siteLink TEXT,
    upvotes INT,
    postTime BIGINT,
    postedAt DATETIME,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
