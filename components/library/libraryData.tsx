import { Blog } from "@/models/blog";

const libraryData: Blog[] = [
  {
    id: 4,
    title: "HolyQuran JS Library",
    paragraph:
      "The HolyQuran JavaScript Library provides easy access to comprehensive Quranic data for JavaScript applications. It enables developers to seamlessly incorporate Surah details, including name, type, English name, number of verses, words, and letters, into their projects.",
    image: "https://github.com/khaouitiabdelhakim/HolyQuran-JS/raw/main/HolyQuranJS.png",
    author: {
      name: "KHAOUITI Apps",
      image: "https://lh3.googleusercontent.com/od_rIcYoQie2Q1ZMAkncI9u7a6exuXHIKqEW6EoibaVz_5wuutk4uaJ6qrKmCus89aKX",
      designation: "Javascript",
    },
    tags: ["Holy Quran"],
    publishDate: "2024",
    link:"https://www.npmjs.com/package/holy-quran"
  },
  {
    id: 3,
    title: "HolyQuran Android Kotlin Library",
    paragraph:
      "The Holy Quran Android Library empowers developers to incorporate comprehensive Quranic data seamlessly into Android applications. It furnishes essential surah details, such as name, type, English name, number, verses, words, and letters.",
    image: "https://github.com/khaouitiabdelhakim/HolyQuran/raw/master/HolyQuran.png",
    author: {
      name: "KHAOUITI Apps",
      image: "https://lh3.googleusercontent.com/od_rIcYoQie2Q1ZMAkncI9u7a6exuXHIKqEW6EoibaVz_5wuutk4uaJ6qrKmCus89aKX",
      designation: "Kotlin & Java",
    },
    tags: ["Holy Quran"],
    publishDate: "2024",
    link:"https://github.com/khaouitiabdelhakim/HolyQuran"
  },
  {
    id: 1,
    title: "LyricsAI - A Song Lyrics Retrieval Library",
    paragraph:
      "LyricsAI is a powerful and easy-to-use library for Android developers that allows you to retrieve song lyrics from various online sources. This library leverages web scraping techniques to find and deliver lyrics for a given song title or artist, making it a valuable tool for music-related Android applications.",
    image: "https://github.com/khaouitiabdelhakim/LyricsAI/raw/master/LyricsAI.png",
    author: {
      name: "KHAOUITI Apps",
      image: "https://lh3.googleusercontent.com/od_rIcYoQie2Q1ZMAkncI9u7a6exuXHIKqEW6EoibaVz_5wuutk4uaJ6qrKmCus89aKX",
      designation: "Kotlin & Java Library",
    },
    tags: ["Lyrics"],
    publishDate: "2024",
    link:"https://github.com/khaouitiabdelhakim/LyricsAI"
  },

  {
    id: 2,
    title: "AI-Lyrics",
    paragraph:
      "ai-lyrics is a JavaScript library that allows you to easily fetch song lyrics from various sources on the web. It utilizes Puppeteer, a headless browser automation tool, to scrape lyrics from search results and provides methods to retrieve lyrics by song title or by both song title and artist.",
    image: "https://github.com/khaouitiabdelhakim/AILyrics-JS/raw/main/LyricsAI.png",
    author: {
      name: "KHAOUITI Apps",
      image: "https://lh3.googleusercontent.com/od_rIcYoQie2Q1ZMAkncI9u7a6exuXHIKqEW6EoibaVz_5wuutk4uaJ6qrKmCus89aKX",
      designation: "Javascript & Typescript",
    },
    tags: ["Lyrics"],
    publishDate: "2024",
    link:"https://github.com/khaouitiabdelhakim/AILyrics-JS"
  },


  



  
];
export default libraryData;
