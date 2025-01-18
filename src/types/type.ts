export interface scrapData {
  title: string;
  link: string;
  siteTitle: string;
  siteLink: string;
  upvotes: string;
  time: string | number;
  postedAt: string;
}

export interface story {
  id: number;
  title: string;
  link: string;
  site: string;
  upvotes: number;
  postTime: number;
  postedAt: Date;
  createdAT: Date;
}
