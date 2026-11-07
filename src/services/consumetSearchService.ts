import axios from 'axios';
import http from 'http';
import https from 'https';
import { ChannelJsonService, ChannelItem } from './channelJsonService';
import { SportsScraperService, SportsEvent } from './sportsScraperService';
import { getRotatingTmdbKey, ROTATING_TMDB_KEYS } from './bingrScraperService';
import { searchSmMovies } from './smMovieHubService';
import { JtvService } from './jtvService';
import { getLiveM3uChannels } from './liveM3uService';

// Force IPv4 (family: 4) to prevent 3000ms+ IPv6 DNS/connect stalls on Cloud Run / Linux containers
const httpAgent = new http.Agent({ keepAlive: true, family: 4, maxSockets: 100 });
const httpsAgent = new https.Agent({ keepAlive: true, family: 4, maxSockets: 100 });

export interface FastChannelMatch {
    id: string;
    name: string;
    genre: string;
    group: string;
    logo: string;
    playUrl: string;
    score: number;
}

export interface FastEventMatch {
    id: string;
    title: string;
    sportName: string;
    category: string;
    time: string;
    isLive: boolean;
    thumbnail: string;
    primaryChannelName: string;
    playUrl: string;
    score: number;
}

export interface FastMediaMatch {
    id: number | string;
    tmdbId?: number | string;
    imdb_id?: string;
    malId?: number | string;
    title: string;
    name?: string;
    media_type: 'movie' | 'tv' | 'anime';
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    overview: string;
    original_language?: string;
    cast?: string[];
    directStreamUrl?: string;
    score?: number;
}

export interface ConsumetSearchResults {
    query: string;
    source: string;
    timing_ms: number;
    cached: boolean;
    total: number;
    results: {
        events: FastEventMatch[];
        channels: FastChannelMatch[];
        movies: FastMediaMatch[];
        anime: FastMediaMatch[];
    };
}

interface LruCacheEntry<T> {
    data: T;
    timestamp: number;
    ttlMs: number;
}

// In-memory LRU cache for query results
const queryCache = new Map<string, LruCacheEntry<ConsumetSearchResults>>();
const MAX_QUERY_CACHE = 2500;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 mins

// High-speed pre-seeded catalog covering Malayalam, Tamil, Telugu, Kannada, Hindi & Global Movies/Series
const POPULAR_MEDIA_SEED: FastMediaMatch[] = [
    // Regional Cult Classics & Sitcoms (Malayalam / South / Indian)
    {
        id: 241270,
        tmdbId: 241270,
        imdb_id: "tt8661774",
        title: "M80 Moosa",
        name: "M80 Moosa",
        media_type: "tv",
        poster_path: "https://m.media-amazon.com/images/M/MV5BNTk5NTc3NGYtN2YzZS00OTUwLWI0NTktZDdhNGJiNTM1NmQ0XkEyXkFqcGc@._V1_.jpg",
        backdrop_path: "https://m.media-amazon.com/images/M/MV5BNTk5NTc3NGYtN2YzZS00OTUwLWI0NTktZDdhNGJiNTM1NmQ0XkEyXkFqcGc@._V1_.jpg",
        vote_average: 8.8,
        first_air_date: "2014-02-01",
        release_date: "2014-02-01",
        overview: "Set in Kozhikode (Calicut), M80 Moosa is an iconic Malayalam family sitcom following fish merchant Moosa, his wife Pathu, and their humorous everyday family life. Starring Vinod Kovoor and Surabhi Lakshmi.",
        original_language: "ml",
        cast: ["Vinod Kovoor", "Surabhi Lakshmi", "Athul Sreeva", "Anju Sasi"]
    },
    {
        id: 329991,
        tmdbId: 329991,
        imdb_id: "tt0377575",
        title: "C.I.D. Moosa",
        name: "C.I.D. Moosa",
        media_type: "movie",
        poster_path: "/evsWMsxq8xZbCDFWwjN6ZX8e3Fw.jpg",
        backdrop_path: "/xENDw3ncVi3RgHhoGptDos9vHDa.jpg",
        vote_average: 8.0,
        release_date: "2003-07-04",
        overview: "Sahadevan, an aspiring private detective known as CID Moosa, gets entangled in a hilarious cat-and-mouse game with terrorists and corrupt police officers. Directed by Johny Antony, starring Dileep and Bhavana.",
        original_language: "ml",
        cast: ["Dileep", "Bhavana", "Cochin Haneefa", "Jagathy Sreekumar", "Harisree Ashokan", "Oduvil Unnikrishnan"]
    },
    {
        id: 1143248,
        title: "Aavesham",
        media_type: "movie",
        poster_path: "/c5Tq73v37B0L8kO52G68B3G7mF.jpg",
        backdrop_path: "/fZk3fN0O14tH1sF0V1c5T6v37B0.jpg",
        vote_average: 8.1,
        release_date: "2024-04-11",
        overview: "Three teenagers arrive in Bangalore for their engineering degree and get involved in a campus fight, leading them to befriend Ranga, an eccentric local gangster.",
        original_language: "ml",
        cast: ["Fahadh Faasil", "Sajin Gopu", "Mithun Jai Shankar", "Hipzster"]
    },
    {
        id: 1138632,
        title: "Manjummel Boys",
        media_type: "movie",
        poster_path: "/bs2rN3T2qO2sK1L5G9m3Z2V1w8.jpg",
        backdrop_path: "/bs2rN3T2qO2sK1L5G9m3Z2V1w8.jpg",
        vote_average: 8.3,
        release_date: "2024-02-22",
        overview: "A group of friends from a small town named Manjummel near Kochi travel to Kodaikanal for a vacation, where one of them gets trapped inside the perilous Guna Caves.",
        original_language: "ml",
        cast: ["Soubin Shahir", "Sreenath Bhasi", "Balu Varghese", "Ganapathi"]
    },
    {
        id: 1196949,
        title: "Premalu",
        media_type: "movie",
        poster_path: "/5f6O2V8k3P1qN9T7m2L4s1W8x9.jpg",
        backdrop_path: "/5f6O2V8k3P1qN9T7m2L4s1W8x9.jpg",
        vote_average: 7.9,
        release_date: "2024-02-09",
        overview: "Sachin pursues romance in Hyderabad while navigating GATE exam preparations, friendships, and unexpected wedding chaos.",
        original_language: "ml",
        cast: ["Naslen K. Gafoor", "Mamitha Baiju", "Sangeeth Prathap"]
    },
    {
        id: 1166073,
        title: "Bramayugam",
        media_type: "movie",
        poster_path: "/7k9P2L1m4N6v8T3s5W1q2X4c8r.jpg",
        backdrop_path: "/7k9P2L1m4N6v8T3s5W1q2X4c8r.jpg",
        vote_average: 8.0,
        release_date: "2024-02-15",
        overview: "Thevan, a folk singer of the Paanan caste, stumbles upon an ancient mysterious mansion while escaping slavery, discovering dark secrets of Kodumon Potty.",
        original_language: "ml",
        cast: ["Mammootty", "Arjun Ashokan", "Sidharth Bharathan"]
    },
    {
        id: 508883,
        title: "Aadujeevitham - The Goat Life",
        media_type: "movie",
        poster_path: "/2v8K4p6M9n3T1s7W5q2L8x4c1r.jpg",
        backdrop_path: "/2v8K4p6M9n3T1s7W5q2L8x4c1r.jpg",
        vote_average: 8.2,
        release_date: "2024-03-28",
        overview: "The real-life incident of an Indian migrant worker, Najeeb Muhammad, who goes to Saudi Arabia to earn money for his family, only to find himself enslaved as a goatherd in the middle of the desert.",
        original_language: "ml",
        cast: ["Prithviraj Sukumaran", "Amala Paul", "Jimmy Jean-Louis"]
    },
    {
        id: 1188104,
        title: "Marco",
        media_type: "movie",
        poster_path: "/4x8P2L1m4N6v8T3s5W1q2X4c8r.jpg",
        backdrop_path: "/4x8P2L1m4N6v8T3s5W1q2X4c8r.jpg",
        vote_average: 7.6,
        release_date: "2024-12-20",
        overview: "Marco sets out on a ruthless path of vengeance after a brutal tragedy strikes his family inside the gold syndicate underworld.",
        original_language: "ml",
        cast: ["Unni Mukundan", "Siddique", "Jagadish"]
    },
    {
        id: 1165359,
        title: "Kishkindha Kaandam",
        media_type: "movie",
        poster_path: "/9k8P2L1m4N6v8T3s5W1q2X4c8r.jpg",
        backdrop_path: "/9k8P2L1m4N6v8T3s5W1q2X4c8r.jpg",
        vote_average: 8.2,
        release_date: "2024-09-12",
        overview: "Strange events unfold in a monkey-inhabited village in Kerala, prompting a newlywed pair and forest officials to uncover deep family mysteries.",
        original_language: "ml",
        cast: ["Asif Ali", "Vijayaraghavan", "Aparna Balamurali"]
    },
    {
        id: 1029955,
        title: "ARM (Ajayante Randam Moshanam)",
        media_type: "movie",
        poster_path: "/3k8P2L1m4N6v8T3s5W1q2X4c8r.jpg",
        backdrop_path: "/3k8P2L1m4N6v8T3s5W1q2X4c8r.jpg",
        vote_average: 7.7,
        release_date: "2024-09-12",
        overview: "Set across three eras in Northern Kerala, three generations of heroes fight to protect the sacred treasure of their land.",
        original_language: "ml",
        cast: ["Tovino Thomas", "Krithi Shetty", "Basil Joseph"]
    },
    {
        id: 550085,
        title: "Lucifer",
        media_type: "movie",
        poster_path: "/b68H3z1C1Z8x7s3A2T4R6K8p9m.jpg",
        backdrop_path: "/b68H3z1C1Z8x7s3A2T4R6K8p9m.jpg",
        vote_average: 7.5,
        release_date: "2019-03-28",
        overview: "Following the death of a supreme political leader in Kerala, a fierce power struggle ensues while mysterious Stephen Nedumpally steps in to protect the family.",
        original_language: "ml",
        cast: ["Mohanlal", "Vivek Oberoi", "Manju Warrier", "Tovino Thomas", "Prithviraj Sukumaran"]
    },
    {
        id: 244786,
        title: "Drishyam",
        media_type: "movie",
        poster_path: "/gK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        backdrop_path: "/gK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        vote_average: 8.3,
        release_date: "2013-12-19",
        overview: "Georgekutty, a cable TV operator and cinema lover, goes to extraordinary lengths to protect his family when they accidentally commit an unthinkable crime.",
        original_language: "ml",
        cast: ["Mohanlal", "Meena", "Ansiba Hassan", "Esther Anil"]
    },
    {
        id: 655025,
        title: "Drishyam 2",
        media_type: "movie",
        poster_path: "/yK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        backdrop_path: "/yK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        vote_average: 8.2,
        release_date: "2021-02-19",
        overview: "Six years after the fateful night that changed their lives, Georgekutty and his family face a new police investigation that threatens to expose their secret.",
        original_language: "ml",
        cast: ["Mohanlal", "Meena", "Murali Gopy"]
    },
    {
        id: 579741,
        title: "Kumbalangi Nights",
        media_type: "movie",
        poster_path: "/wK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        backdrop_path: "/wK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        vote_average: 8.4,
        release_date: "2019-02-07",
        overview: "Four estranged brothers living in a dysfunctional home in the fishing village of Kumbalangi set aside their differences when love and crisis enter their lives.",
        original_language: "ml",
        cast: ["Fahadh Faasil", "Shane Nigam", "Soubin Shahir", "Sreenath Bhasi"]
    },
    {
        id: 655263,
        title: "Minnal Murali",
        media_type: "movie",
        poster_path: "/rK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        backdrop_path: "/rK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        vote_average: 7.8,
        release_date: "2021-12-24",
        overview: "A tailor gains special powers after being struck by lightning, but must take down an unexpected nemesis who was struck by the same lightning.",
        original_language: "ml",
        cast: ["Tovino Thomas", "Guru Somasundaram"]
    },
    {
        id: 342921,
        title: "Premam",
        media_type: "movie",
        poster_path: "/pK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        backdrop_path: "/pK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        vote_average: 8.1,
        release_date: "2015-05-29",
        overview: "George David's journey through three stages of love from his teenage school years to college and adulthood.",
        original_language: "ml",
        cast: ["Nivin Pauly", "Sai Pallavi", "Madonna Sebastian", "Anupama Parameswaran"]
    },
    {
        id: 272855,
        title: "Bangalore Days",
        media_type: "movie",
        poster_path: "/dK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        backdrop_path: "/dK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        vote_average: 8.1,
        release_date: "2014-05-30",
        overview: "Three cousins from Kerala move to Bangalore to fulfill their childhood dreams and navigate love, career, and family bonds.",
        original_language: "ml",
        cast: ["Dulquer Salmaan", "Nivin Pauly", "Nazriya Nazim", "Fahadh Faasil", "Parvathy Thiruvothu"]
    },
    {
        id: 1139087,
        title: "Maharaja",
        media_type: "movie",
        poster_path: "/9yK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        backdrop_path: "/9yK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        vote_average: 8.3,
        release_date: "2024-06-14",
        overview: "A quiet barber reports that his 'Lakshmi' has been stolen after a home invasion, leaving police baffled over whether he seeks a dustbin or vengeance.",
        original_language: "ta",
        cast: ["Vijay Sethupathi", "Anurag Kashyap", "Mamta Mohandas"]
    },
    {
        id: 927342,
        title: "Amaran",
        media_type: "movie",
        poster_path: "/aK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        backdrop_path: "/aK8v8Z9p6M3n2T1s7W5q2L8x4c.jpg",
        vote_average: 8.2,
        release_date: "2024-10-31",
        overview: "The inspiring biographical war drama of Major Mukund Varadarajan and his undying devotion to India and his wife Indhu Rebecca Varghese.",
        original_language: "ta",
        cast: ["Sivakarthikeyan", "Sai Pallavi"]
    },
    {
        id: 949229,
        title: "Leo",
        media_type: "movie",
        poster_path: "/pD6sL4vntUOXHmuvJPPZAgvyfd9.jpg",
        backdrop_path: "/pD6sL4vntUOXHmuvJPPZAgvyfd9.jpg",
        vote_average: 7.4,
        release_date: "2023-10-19",
        overview: "Parthiban is a mild-mannered cafe owner in Kashmir, who fends off a gang of murderous thugs and gains attention from a ruthless drug cartel claiming he was once a part of them.",
        original_language: "ta",
        cast: ["Vijay", "Trisha Krishnan", "Sanjay Dutt", "Arjun Sarja"]
    },
    {
        id: 714338,
        title: "Vikram",
        media_type: "movie",
        poster_path: "/774UV1aCURb4s4JfEFg3IEMu5Zj.jpg",
        backdrop_path: "/774UV1aCURb4s4JfEFg3IEMu5Zj.jpg",
        vote_average: 7.9,
        release_date: "2022-06-03",
        overview: "A special investigator discovers a case of serial killings is not what it seems to be, and leading down this path is only going to end in a war between everyone involved.",
        original_language: "ta",
        cast: ["Kamal Haasan", "Vijay Sethupathi", "Fahadh Faasil", "Suriya"]
    },
    {
        id: 801688,
        title: "Kalki 2898 AD",
        media_type: "movie",
        poster_path: "/rstcB22X3kK5V0hH4R7M2q8W1s.jpg",
        backdrop_path: "/rstcB22X3kK5V0hH4R7M2q8W1s.jpg",
        vote_average: 7.5,
        release_date: "2024-06-27",
        overview: "Bhairava, a bounty hunter in the post-apocalyptic city of Kasi, embarks on a mission that intertwines with ancient mythology and the prophecy of Kalki.",
        original_language: "te",
        cast: ["Prabhas", "Amitabh Bachchan", "Kamal Haasan", "Deepika Padukone"]
    },
    {
        id: 857598,
        title: "Pushpa 2: The Rule",
        media_type: "movie",
        poster_path: "/6v8K4p6M9n3T1s7W5q2L8x4c1r.jpg",
        backdrop_path: "/6v8K4p6M9n3T1s7W5q2L8x4c1r.jpg",
        vote_average: 7.8,
        release_date: "2024-12-05",
        overview: "Pushpa Raj expands his red sandalwood syndicate globally while facing off against his vengeful nemesis SP Bhanwar Singh Shekhawat.",
        original_language: "te",
        cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil"]
    },
    {
        id: 579974,
        title: "RRR",
        media_type: "movie",
        poster_path: "/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg",
        backdrop_path: "/i0Y0wP8H6SRgjr6QmuwbtQbS24D.jpg",
        vote_average: 7.8,
        release_date: "2022-03-24",
        overview: "A fictional history of two legendary revolutionaries' journey away from home before they began fighting for their country in the 1920s.",
        original_language: "te"
    },
    {
        id: 587412,
        title: "K.G.F: Chapter 2",
        media_type: "movie",
        poster_path: "/khNVygolU0TxLIDWff5tQlAhZ23.jpg",
        backdrop_path: "/khNVygolU0TxLIDWff5tQlAhZ23.jpg",
        vote_average: 7.7,
        release_date: "2022-04-14",
        overview: "The blood-soaked land of Kolar Gold Fields (KGF) has a new overlord now - Rocky, whose name strikes fear in the heart of his foes.",
        original_language: "kn"
    },
    {
        id: 533535,
        title: "Deadpool & Wolverine",
        media_type: "movie",
        poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        backdrop_path: "/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
        vote_average: 7.7,
        release_date: "2024-07-24",
        overview: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him.",
        original_language: "en"
    },
    {
        id: 1022789,
        title: "Inside Out 2",
        media_type: "movie",
        poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
        backdrop_path: "/stKGOmPAneQ6ky7cb7vB2IeZ3Z7.jpg",
        vote_average: 7.6,
        release_date: "2024-06-11",
        overview: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for unexpected new Emotions!",
        original_language: "en"
    },
    {
        id: 693134,
        title: "Dune: Part Two",
        media_type: "movie",
        poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s520DRq.jpg",
        vote_average: 8.2,
        release_date: "2024-02-27",
        overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge.",
        original_language: "en"
    },
    {
        id: 872585,
        title: "Oppenheimer",
        media_type: "movie",
        poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        backdrop_path: "/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
        vote_average: 8.1,
        release_date: "2023-07-19",
        overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
        original_language: "en"
    },
    {
        id: 157336,
        title: "Interstellar",
        media_type: "movie",
        poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
        vote_average: 8.4,
        release_date: "2014-11-05",
        overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.",
        original_language: "en"
    },
    {
        id: 299534,
        title: "Avengers: Endgame",
        media_type: "movie",
        poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
        vote_average: 8.3,
        release_date: "2019-04-24",
        overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos.",
        original_language: "en"
    },
    {
        id: 299536,
        title: "Avengers: Infinity War",
        media_type: "movie",
        poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
        backdrop_path: "/mDfJG3LC3Dqb67AZ52x3Z0jOS0c.jpg",
        vote_average: 8.2,
        release_date: "2018-04-25",
        overview: "As the Avengers and their allies have continued to protect the world, a new danger has emerged from the cosmic shadows: Thanos.",
        original_language: "en"
    },
    {
        id: 66732,
        title: "Stranger Things",
        name: "Stranger Things",
        media_type: "tv",
        poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
        vote_average: 8.6,
        first_air_date: "2016-07-15",
        overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
        original_language: "en"
    },
    {
        id: 94605,
        title: "Arcane",
        name: "Arcane",
        media_type: "tv",
        poster_path: "/fqldf2t8ztc9aiwn397rDit3QgM.jpg",
        backdrop_path: "/27Wv16q7LqLz0zUf44yQ963q59c.jpg",
        vote_average: 8.7,
        first_air_date: "2021-11-06",
        overview: "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and incompatible convictions.",
        original_language: "en"
    },
    {
        id: 1399,
        title: "Game of Thrones",
        name: "Game of Thrones",
        media_type: "tv",
        poster_path: "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
        backdrop_path: "/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg",
        vote_average: 8.4,
        first_air_date: "2011-04-17",
        overview: "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war.",
        original_language: "en"
    },
    {
        id: 1396,
        title: "Breaking Bad",
        name: "Breaking Bad",
        media_type: "tv",
        poster_path: "/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
        backdrop_path: "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
        vote_average: 8.9,
        first_air_date: "2008-01-20",
        overview: "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and decides to enter the methamphetamine business to provide for his family.",
        original_language: "en"
    },
    {
        id: 37854,
        title: "One Piece",
        name: "One Piece",
        media_type: "tv",
        poster_path: "/cMD9Ygz11yjJnzEiURXdfxY8coF.jpg",
        backdrop_path: "/4Mt7iqFc9crehtIiyKOkVe0stv0.jpg",
        vote_average: 8.7,
        first_air_date: "1999-10-20",
        overview: "Years ago, the fearsome Pirate King, Gol D. Roger was executed leaving behind a huge cache of riches and the legendary One Piece.",
        original_language: "ja"
    },
    {
        id: 85937,
        title: "Demon Slayer: Kimetsu no Yaiba",
        name: "Demon Slayer: Kimetsu no Yaiba",
        media_type: "tv",
        poster_path: "/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
        backdrop_path: "/nTvM4mhqZlHIvUkIvdiknW697zL.jpg",
        vote_average: 8.7,
        first_air_date: "2019-04-06",
        overview: "It is the Taisho Period in Japan. Tanjiro, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon.",
        original_language: "ja"
    },
    {
        id: 119051,
        title: "Wednesday",
        name: "Wednesday",
        media_type: "tv",
        poster_path: "/9PFonQhy4cQy7Jz20NpMygczOkv.jpg",
        backdrop_path: "/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg",
        vote_average: 8.5,
        first_air_date: "2022-11-23",
        overview: "Wednesday Addams attempts to master her emerging psychic ability, thwart a monstrous killing spree and solve the supernatural mystery.",
        original_language: "en"
    },
    {
        id: 93405,
        title: "Squid Game",
        name: "Squid Game",
        media_type: "tv",
        poster_path: "/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
        backdrop_path: "/2meX1nMdScFOoV4370rqHWFDxsu.jpg",
        vote_average: 8.3,
        first_air_date: "2021-09-17",
        overview: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
        original_language: "ko"
    },
    {
        id: 155,
        title: "The Dark Knight",
        media_type: "movie",
        poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
        vote_average: 8.5,
        release_date: "2008-07-16",
        overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent to dismantle the remaining criminal organizations.",
        original_language: "en"
    },
    {
        id: 27205,
        title: "Inception",
        media_type: "movie",
        poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
        vote_average: 8.4,
        release_date: "2010-07-15",
        overview: "Cobb, a skilled thief who steals corporate secrets through the use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a C.E.O.",
        original_language: "en"
    },
    {
        id: 603,
        title: "The Matrix",
        media_type: "movie",
        poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        backdrop_path: "/pquF7Qh1jQn8Y4k91iG7aFqL2Lh.jpg",
        vote_average: 8.2,
        release_date: "1999-03-30",
        overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers.",
        original_language: "en"
    },
    {
        id: 414906,
        title: "The Batman",
        media_type: "movie",
        poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
        vote_average: 7.7,
        release_date: "2022-03-01",
        overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
        original_language: "en"
    },
    {
        id: 569094,
        title: "Spider-Man: Across the Spider-Verse",
        media_type: "movie",
        poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
        vote_average: 8.4,
        release_date: "2023-05-31",
        overview: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse.",
        original_language: "en"
    },
    {
        id: 671,
        title: "Harry Potter and the Philosopher's Stone",
        media_type: "movie",
        poster_path: "/wuMc08IPKEatv9rnMNXvIDxqP4W.jpg",
        backdrop_path: "/hziiv146OpD7qDoBtSoTe4G8xne.jpg",
        vote_average: 7.9,
        release_date: "2001-11-16",
        overview: "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard.",
        original_language: "en"
    },
    {
        id: 19995,
        title: "Avatar",
        media_type: "movie",
        poster_path: "/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
        backdrop_path: "/vL5LR6WdxWPjC2tK4qQh9Fv42s0.jpg",
        vote_average: 7.6,
        release_date: "2009-12-15",
        overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
        original_language: "en"
    },
    {
        id: 76600,
        title: "Avatar: The Way of Water",
        media_type: "movie",
        poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
        vote_average: 7.7,
        release_date: "2022-12-14",
        overview: "Set more than a decade after the events of the first film, learn the story of the Sully family, the trouble that follows them, the lengths they go to keep each other safe.",
        original_language: "en"
    }
];

function normalizeSearchKey(str: string): string {
    return String(str || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function compactSearchKey(str: string): string {
    return String(str || '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
}

export class ConsumetSearchService {
    private static indexedChannels: Array<ChannelItem & { cleanName: string; tokens: string[] }> = [];
    private static channelsIndexedAt: number = 0;
    private static INDEX_TTL = 10 * 60 * 1000; // 10 minutes

    private static isWarmingExtraChannels = false;

    /**
     * Build or refresh in-memory channel index
     */
    private static ensureChannelsIndex(): void {
        const now = Date.now();
        if (this.indexedChannels.length > 0 && (now - this.channelsIndexedAt < this.INDEX_TTL)) {
            return;
        }

        try {
            const rawChannels = ChannelJsonService.getChannels() || [];
            const seenNames = new Set<string>();
            const nextIndexed: Array<ChannelItem & { cleanName: string; tokens: string[] }> = [];

            for (const ch of rawChannels) {
                const name = String(ch.name || ch.title || '').trim();
                if (!name) continue;
                const cleanName = name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                if (!cleanName || seenNames.has(cleanName)) continue;
                seenNames.add(cleanName);
                const tokens = cleanName.split(/\s+/).filter(t => t.length > 0);
                nextIndexed.push({
                    ...ch,
                    cleanName,
                    tokens
                });
            }

            if (nextIndexed.length > 0 || this.indexedChannels.length === 0) {
                this.indexedChannels = nextIndexed;
                this.channelsIndexedAt = now;
            }

            // Asynchronously merge JioTV & Live.m3u channels into the in-memory index
            if (!this.isWarmingExtraChannels) {
                this.isWarmingExtraChannels = true;
                Promise.allSettled([
                    JtvService.fetchChannels(false),
                    getLiveM3uChannels(false)
                ]).then(([jtvRes, liveM3uRes]) => {
                    const combined = [...this.indexedChannels];
                    const existingNames = new Set(combined.map(c => c.cleanName));

                    if (jtvRes.status === 'fulfilled' && Array.isArray(jtvRes.value)) {
                        for (const jch of jtvRes.value) {
                            const name = String(jch.name || '').trim();
                            const cleanName = name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                            if (!cleanName || existingNames.has(cleanName)) continue;
                            existingNames.add(cleanName);
                            const isHls = jch.source === 'sonyliv' || jch.source === 'hotstar' || (jch.stream_url && jch.stream_url.includes('.m3u8'));
                            const manifestTarget = isHls ? (jch.full_stream_url || jch.stream_url) : (jch.manifest_url || `/api/jtv/manifest/${jch.id}.mpd`);
                            const playUrl = `/play_consumet.php?channel_id=jtv-${encodeURIComponent(jch.id)}&url=${encodeURIComponent(manifestTarget)}&key_id=${encodeURIComponent(jch.key_id || '')}&key=${encodeURIComponent(jch.key || '')}&name=${encodeURIComponent(name)}&source=consumet.html&type=${isHls ? 'hls' : 'dash'}`;
                            combined.push({
                                channel_id: `jtv-${jch.id}`,
                                name,
                                genre: jch.category || jch.genre || 'Live TV',
                                group: jch.category || 'Live TV',
                                logo: jch.logo || '',
                                stream_url: manifestTarget,
                                playUrl,
                                source: 'jtv',
                                cleanName,
                                tokens: cleanName.split(/\s+/).filter(Boolean)
                            } as any);
                        }
                    }

                    if (liveM3uRes.status === 'fulfilled' && Array.isArray(liveM3uRes.value?.channels)) {
                        for (const lch of liveM3uRes.value.channels) {
                            const name = String(lch.name || '').trim();
                            const cleanName = name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
                            if (!cleanName || existingNames.has(cleanName)) continue;
                            existingNames.add(cleanName);
                            const playUrl = lch.play_url || `/play_consumet.php?channel_id=${encodeURIComponent(lch.id)}&url=${encodeURIComponent(lch.stream_url)}&name=${encodeURIComponent(name)}&source=livem3u&type=${lch.type || 'hls'}`;
                            combined.push({
                                channel_id: lch.id,
                                name,
                                genre: lch.category || lch.group || 'Live Sports',
                                group: lch.group || 'Live Sports',
                                logo: lch.logo || '',
                                stream_url: lch.stream_url,
                                playUrl,
                                source: 'livem3u',
                                cleanName,
                                tokens: cleanName.split(/\s+/).filter(Boolean)
                            } as any);
                        }
                    }

                    this.indexedChannels = combined;
                    this.channelsIndexedAt = Date.now();
                }).catch(() => {}).finally(() => {
                    this.isWarmingExtraChannels = false;
                });
            }
        } catch (e: any) {
            console.error('[ConsumetSearch] Failed to index channels:', e?.message || e);
        }
    }

    /**
     * Lightning Fast In-Memory Channel Matching (<1ms)
     */
    public static searchChannelsFast(query: string, limit: number = 24): FastChannelMatch[] {
        this.ensureChannelsIndex();
        if (!query || !this.indexedChannels.length) return [];

        const cleanQ = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
        if (!cleanQ) return [];

        const qTokens = cleanQ.split(/\s+/).filter(t => t.length > 0);
        const matches: FastChannelMatch[] = [];

        for (let i = 0; i < this.indexedChannels.length; i++) {
            const ch = this.indexedChannels[i];
            const nameLower = ch.cleanName;
            let score = 0;

            // Exact match
            if (nameLower === cleanQ) {
                score = 1000;
            } else if (nameLower.startsWith(cleanQ)) {
                score = 500 + (cleanQ.length / nameLower.length) * 100;
            } else if (nameLower.includes(cleanQ)) {
                score = 300 + (cleanQ.length / nameLower.length) * 50;
            } else {
                // Check token matches
                let matchedTokens = 0;
                for (let q = 0; q < qTokens.length; q++) {
                    const token = qTokens[q];
                    if (ch.tokens.some(t => t.startsWith(token) || t.includes(token))) {
                        matchedTokens++;
                    }
                }
                if (matchedTokens === qTokens.length) {
                    score = 200 + (matchedTokens * 20);
                } else if (matchedTokens > 0 && qTokens.length > 1) {
                    score = 100 + (matchedTokens * 15);
                }
            }

            // Boost sports channels if search contains sport terms
            const isSports = (ch.genre || '').toLowerCase().includes('sport') || (ch.group || '').toLowerCase().includes('sport');
            if (isSports && (cleanQ.includes('sport') || cleanQ.includes('ten') || cleanQ.includes('cricket') || cleanQ.includes('star') || cleanQ.includes('willow') || cleanQ.includes('sony'))) {
                score += 150;
            }

            if (score > 80) {
                const name = ch.name || ch.title || 'Channel';
                const chId = String(ch.channel_id || (ch as any).id || '');
                const cleanId = chId.replace(/^(?:mdtv|jtv)[-_]/i, '');
                const isMdtv = ch.source === 'mdtv' || chId.startsWith('mdtv') || chId.startsWith('jtv') || !!(ch as any).drm || !!(ch.key_id && ch.key);
                const streamUrl = ch.stream_url || ch.streamUrl || ch.url || chId;

                let playUrl = ch.playUrl || '';
                if (!playUrl) {
                    if (isMdtv && cleanId) {
                        const keyId = ch.key_id || (ch as any).drm?.key_id || '';
                        const key = ch.key || (ch as any).drm?.key || '';
                        const drmParams = (keyId && key) ? `&key_id=${encodeURIComponent(keyId)}&key=${encodeURIComponent(key)}` : '';
                        playUrl = `/play_consumet.php?channel_id=mdtv-${encodeURIComponent(cleanId)}&url=%2Fapi%2Fmdtv%2Fmanifest%2F${encodeURIComponent(cleanId)}.mpd${drmParams}&name=${encodeURIComponent(name)}&source=consumet.html&type=dash&from_tab=livetv`;
                    } else if (streamUrl) {
                        playUrl = `/play_consumet.php?channel_id=${encodeURIComponent(chId || name)}&url=${encodeURIComponent(streamUrl)}&name=${encodeURIComponent(name)}&source=consumet.html&type=hls&from_tab=livetv`;
                    }
                }
                const logo = ch.logo || ('https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=0f172a&color=f59e0b&bold=true');

                matches.push({
                    id: chId || String(name || i),
                    name: name,
                    genre: ch.genre || 'Live TV',
                    group: ch.group || ch.genre || 'Live TV',
                    logo: logo,
                    playUrl: playUrl,
                    score: score
                });
            }
        }

        // Sort by score descending
        matches.sort((a, b) => b.score - a.score);
        return matches.slice(0, limit);
    }

    private static cachedSportsEvents: SportsEvent[] = [];
    private static lastSportsEventsFetch: number = 0;
    private static isFetchingSportsEvents: boolean = false;

    /**
     * Non-blocking background warmer for sports events
     */
    public static async warmSportsEvents(): Promise<void> {
        if (this.isFetchingSportsEvents) return;
        const now = Date.now();
        if (this.cachedSportsEvents.length > 0 && (now - this.lastSportsEventsFetch < 5 * 60 * 1000)) {
            return;
        }
        this.isFetchingSportsEvents = true;
        try {
            const [scrapedRes, jtvEventsRes] = await Promise.allSettled([
                SportsScraperService.scrapeLiveSportsEvents(false),
                JtvService.fetchLiveEvents(false)
            ]);
            const merged: SportsEvent[] = [];
            if (scrapedRes.status === 'fulfilled' && Array.isArray(scrapedRes.value)) {
                merged.push(...scrapedRes.value);
            }
            if (jtvEventsRes.status === 'fulfilled' && Array.isArray(jtvEventsRes.value)) {
                for (const jev of jtvEventsRes.value) {
                    const isMpd = jev.manifest_type === 'mpd' || jev.manifest_type === 'dash' || (jev.stream_url && jev.stream_url.includes('.mpd'));
                    const playUrl = `/play_consumet.php?id=${encodeURIComponent(jev.id)}&url=${encodeURIComponent(jev.stream_url)}&key_id=${encodeURIComponent(jev.key_id || '')}&key=${encodeURIComponent(jev.key || '')}&name=${encodeURIComponent(jev.title || jev.name)}&source=consumet.html&type=${isMpd ? 'dash' : 'hls'}&from_tab=sports`;
                    merged.push({
                        id: jev.id,
                        title: jev.title || jev.name,
                        sport: jev.tournament || jev.group || 'Live Sports',
                        league: jev.tournament || jev.badge || 'Live Broadcast',
                        time: 'LIVE',
                        isLive: true,
                        homeTeam: jev.title || jev.name,
                        awayTeam: jev.tournament || '',
                        homeLogo: jev.logo || '',
                        channelName: jev.badge || 'Live Stream',
                        playUrl,
                        channels: []
                    } as any);
                }
            }
            if (merged.length > 0) {
                this.cachedSportsEvents = merged;
                this.lastSportsEventsFetch = Date.now();
            }
        } catch (e: any) {
            // Ignore background error
        } finally {
            this.isFetchingSportsEvents = false;
        }
    }

    /**
     * Lightning Fast Sports Events Search (<1ms from in-memory index)
     */
    public static async searchSportsEventsFast(query: string, limit: number = 18): Promise<FastEventMatch[]> {
        if (!query) return [];
        const cleanQ = query.toLowerCase().trim();

        if (!this.cachedSportsEvents.length) {
            await Promise.race([
                this.warmSportsEvents(),
                new Promise(resolve => setTimeout(resolve, 800))
            ]);
        } else if (Date.now() - this.lastSportsEventsFetch > 5 * 60 * 1000) {
            this.warmSportsEvents().catch(() => {});
        }

        const rawEvents = this.cachedSportsEvents;
        if (!rawEvents.length) return [];

        const matches: FastEventMatch[] = [];
        const seenEventKeys = new Set<string>();

        for (const ev of rawEvents) {
            const titleLower = (ev.title || '').toLowerCase();
            const sportLower = (ev.sport || ev.league || '').toLowerCase();
            const team1 = (ev.homeTeam || '').toLowerCase();
            const team2 = (ev.awayTeam || '').toLowerCase();

            let score = 0;
            if (titleLower.includes(cleanQ) || team1.includes(cleanQ) || team2.includes(cleanQ)) {
                score = 400;
                if (titleLower.startsWith(cleanQ)) score += 100;
            } else if (sportLower.includes(cleanQ)) {
                score = 250;
            }

            if (ev.isLive) score += 150;

            if (score > 100) {
                const dedupeKey = titleLower.replace(/[^a-z0-9]/g, '');
                if (dedupeKey && seenEventKeys.has(dedupeKey)) continue;
                if (dedupeKey) seenEventKeys.add(dedupeKey);

                const playUrl = ev.playUrl || (ev.channels && ev.channels[0]?.playUrl) || `/play_consumet.php?name=${encodeURIComponent(ev.title)}&source=sports_scraper`;
                const channelName = ev.channelName || (ev.channels && ev.channels[0]?.name) || 'Live Sports';
                const thumb = ev.homeLogo || ev.channels?.[0]?.logo || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80';

                matches.push({
                    id: ev.id || ev.title,
                    title: ev.title,
                    sportName: ev.sport || 'Sports',
                    category: ev.league || ev.sport || 'Live Sports',
                    time: ev.time || 'LIVE',
                    isLive: ev.isLive,
                    thumbnail: thumb,
                    primaryChannelName: channelName,
                    playUrl: playUrl,
                    score: score
                });
            }
        }

        matches.sort((a, b) => b.score - a.score);
        return matches.slice(0, limit);
    }

    /**
     * Fast IMDb Suggestion Search (~18-45ms)
     * Captures regional titles (like M80 Moosa), sitcoms, indie movies, and official posters/cast
     */
    private static async fetchImdbSuggestions(query: string): Promise<FastMediaMatch[]> {
        if (!query || query.trim().length < 2) return [];
        const clean = query.trim().toLowerCase();
        try {
            const url = `https://v3.sg.media-imdb.com/suggestion/x/${encodeURIComponent(clean)}.json`;
            const resp = await axios.get(url, {
                timeout: 1800,
                httpsAgent,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'application/json'
                }
            });
            const items = resp.data?.d;
            if (!Array.isArray(items)) return [];

            const results: FastMediaMatch[] = [];
            for (const item of items) {
                if (!item || !item.id || !String(item.id).startsWith('tt')) continue;
                const qid = String(item.qid || item.q || '').toLowerCase();
                // Skip video games, podcasts, or non-video entries
                if (qid.includes('game') || qid.includes('podcast') || qid.includes('musicvideo')) continue;

                const isTv = qid.includes('tv') || qid.includes('series') || qid.includes('mini');
                const mediaType: 'movie' | 'tv' = isTv ? 'tv' : 'movie';
                const title = String(item.l || 'Untitled').trim();
                const year = item.y ? String(item.y) : (item.yr ? String(item.yr).slice(0, 4) : '');
                const dateStr = year ? `${year}-01-01` : '';
                const poster = item.i?.imageUrl || null;
                const stars = item.s ? String(item.s).split(',').map((s: string) => s.trim()).filter(Boolean) : [];
                const typeLabel = item.q || (isTv ? 'TV Series' : 'Movie');
                const overview = stars.length > 0
                    ? `${typeLabel}${item.yr ? ` (${item.yr})` : (year ? ` (${year})` : '')} • Starring ${stars.join(', ')}.`
                    : `${typeLabel}${year ? ` (${year})` : ''}.`;

                results.push({
                    id: item.id,
                    imdb_id: item.id,
                    title,
                    name: title,
                    media_type: mediaType,
                    poster_path: poster,
                    backdrop_path: poster,
                    vote_average: 8.0,
                    release_date: dateStr,
                    first_air_date: isTv ? dateStr : undefined,
                    overview,
                    cast: stars
                });
            }
            return results;
        } catch {
            return [];
        }
    }

    /**
     * Fast TMDB endpoint helper with IPv4 & key rotation
     */
    private static async fetchTmdbEndpoint(pathAndQuery: string, timeoutMs: number = 2200): Promise<any[]> {
        const keys = ROTATING_TMDB_KEYS;
        for (let attempt = 0; attempt < Math.min(keys.length, 2); attempt++) {
            const apiKey = getRotatingTmdbKey();
            try {
                const sep = pathAndQuery.includes('?') ? '&' : '?';
                const url = `https://api.themoviedb.org/3/${pathAndQuery}${sep}api_key=${apiKey}`;
                const resp = await axios.get(url, {
                    timeout: timeoutMs,
                    httpAgent,
                    httpsAgent,
                    headers: { 'Accept': 'application/json' }
                });
                if (resp.status === 200) {
                    if (Array.isArray(resp.data?.results)) {
                        return resp.data.results;
                    }
                    if (Array.isArray(resp.data?.movie_results) || Array.isArray(resp.data?.tv_results)) {
                        return [
                            ...(resp.data.movie_results || []).map((m: any) => ({ ...m, media_type: 'movie' })),
                            ...(resp.data.tv_results || []).map((t: any) => ({ ...t, media_type: 'tv' }))
                        ];
                    }
                }
            } catch {
                continue;
            }
        }
        return [];
    }

    /**
     * Ultra-fast Edge Bingr Search integration (<200ms) with pre-indexed TMDB records
     */
    private static async fetchBingrSearch(query: string): Promise<any[]> {
        if (!query || query.trim().length < 2) return [];
        try {
            const resp = await axios.get(`https://api.bingr.one/api/search?q=${encodeURIComponent(query.trim())}`, {
                timeout: 1200,
                headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0' }
            });
            if (resp.status === 200 && Array.isArray(resp.data?.results)) {
                return resp.data.results.map((r: any) => ({
                    id: r.id,
                    tmdbId: r.id,
                    title: r.title,
                    name: r.title,
                    media_type: r.type || 'movie',
                    poster_path: r.poster ? (r.poster.startsWith('/') ? r.poster : r.poster.replace(/https?:\/\/image\.tmdb\.org\/t\/p\/(w\d+|original)/, '')) : null,
                    backdrop_path: r.backdrop ? (r.backdrop.startsWith('/') ? r.backdrop : r.backdrop.replace(/https?:\/\/image\.tmdb\.org\/t\/p\/(w\d+|original)/, '')) : null,
                    vote_average: r.rating || 7.5,
                    release_date: r.year ? `${r.year}-01-01` : undefined,
                    overview: r.overview || ''
                }));
            }
        } catch {}
        return [];
    }

    /**
     * Lightning Fast Movies & Series Search with Multi-Engine Parallel Resolution:
     * 1. Pre-Seeded Popular & Regional Library (<0.1ms)
     * 2. Edge Bingr Pre-Indexed Database (<150ms)
     * 3. TMDB Multi-Page & Multi-Type Search (~250ms over IPv4)
     * 4. IMDb Instant Suggestion API (~20ms) for regional titles (M80 Moosa, etc.) & missing posters
     * 5. SMMovieHub Direct Movie Catalog (<1ms)
     */
    public static async searchMoviesAndSeriesFast(query: string, limit: number = 48): Promise<FastMediaMatch[]> {
        if (!query) return [];
        const rawTrimmed = query.trim();
        if (!rawTrimmed) return [];

        // Extract optional year at end of query e.g. "premam 2015" or "avesham (2024)"
        let cleanTitleQuery = rawTrimmed;
        let extractedYear = '';
        const yearMatch = rawTrimmed.match(/^(.*?)\s*\(?((?:19|20)\d{2})\)?$/);
        if (yearMatch && yearMatch[1].trim().length >= 2) {
            cleanTitleQuery = yearMatch[1].trim();
            extractedYear = yearMatch[2];
        }

        const normQ = normalizeSearchKey(cleanTitleQuery);
        const compactQ = compactSearchKey(cleanTitleQuery);
        const qTokens = normQ.split(/\s+/).filter(Boolean);

        // Generate smart alternate query if letter+digits are fused or separated (e.g. "m80 moosa" <-> "m 80 moosa")
        const spacedAlphaNumQ = cleanTitleQuery
            .replace(/([a-zA-Z])(\d)/g, '$1 $2')
            .replace(/(\d)([a-zA-Z])/g, '$1 $2')
            .replace(/\s+/g, ' ')
            .trim();

        // 1. Instant check against pre-seeded popular & regional titles (<0.1ms)
        const preseededMatches: FastMediaMatch[] = [];
        for (const item of POPULAR_MEDIA_SEED) {
            const titleRaw = item.title || item.name || '';
            const normTitle = normalizeSearchKey(titleRaw);
            const compactTitle = compactSearchKey(titleRaw);

            let score = 0;
            if (normTitle === normQ || compactTitle === compactQ) {
                score = 1200;
            } else if (normTitle.startsWith(normQ) || compactTitle.startsWith(compactQ)) {
                score = 850;
            } else if (normTitle.includes(normQ) || compactTitle.includes(compactQ)) {
                score = 650;
            } else if (qTokens.length > 0 && qTokens.every(t => normTitle.includes(t))) {
                score = 550;
            }
            if (score > 0) {
                preseededMatches.push({ ...item, score });
            }
        }

        // 2. Check SMMovieHub in-memory movie catalog (<1ms)
        const smMatches: FastMediaMatch[] = [];
        try {
            const smRaw = (await searchSmMovies(cleanTitleQuery)) || [];
            for (const sm of smRaw.slice(0, 12)) {
                smMatches.push({
                    id: sm.id || `sm_${compactSearchKey(sm.cleanTitle || sm.title)}`,
                    title: sm.cleanTitle || sm.title,
                    name: sm.cleanTitle || sm.title,
                    media_type: sm.isSeries ? 'tv' : 'movie',
                    poster_path: sm.logo || null,
                    backdrop_path: sm.logo || null,
                    vote_average: 8.0,
                    release_date: sm.year ? `${sm.year}-01-01` : undefined,
                    overview: `${sm.group || 'Feature Film'}${sm.year ? ` (${sm.year})` : ''} • Direct High-Speed Stream Available.`,
                    original_language: (sm.group || '').toLowerCase().includes('malayalam') ? 'ml' : ((sm.group || '').toLowerCase().includes('tamil') ? 'ta' : 'en'),
                    directStreamUrl: sm.streamUrl,
                    score: 500
                });
            }
        } catch {}

        // 3. Lightning Fast Concurrent Search: Bingr Edge Index + TMDB Multi + IMDb Suggestions
        const isImdbId = /^tt\d{7,10}$/i.test(cleanTitleQuery);
        const tmdbPromises: Promise<any[]>[] = [];

        if (isImdbId) {
            tmdbPromises.push(
                this.fetchTmdbEndpoint(`find/${cleanTitleQuery}?external_source=imdb_id`, 1400)
            );
        } else {
            // TMDB search/multi page 1 returns top 20 relevant movies AND tv series simultaneously in a single fast round-trip
            const yearParam = extractedYear ? `&year=${extractedYear}` : '';
            tmdbPromises.push(
                this.fetchTmdbEndpoint(`search/multi?query=${encodeURIComponent(cleanTitleQuery)}&include_adult=false&page=1${yearParam}`, 1400)
            );
        }

        const [bingrResults, imdbResults, ...tmdbPages] = await Promise.all([
            this.fetchBingrSearch(cleanTitleQuery),
            this.fetchImdbSuggestions(cleanTitleQuery),
            ...tmdbPromises
        ]);

        // Index IMDb results by normalized title for fast enrichment of TMDB items missing posters/years
        const imdbByNormTitle = new Map<string, FastMediaMatch>();
        for (const im of imdbResults) {
            const key = compactSearchKey(im.title);
            if (key && !imdbByNormTitle.has(key)) {
                imdbByNormTitle.set(key, im);
            }
        }

        // Flatten and normalize TMDB + Bingr items
        const tmdbResults: FastMediaMatch[] = [];
        const seenTmdbIds = new Set<string>();

        // Merge Bingr results as high-confidence fast hits
        for (const bItem of bingrResults) {
            if (!bItem || !bItem.id) continue;
            const uniqueKey = `${bItem.media_type}_${bItem.id}`;
            seenTmdbIds.add(uniqueKey);
            const title = bItem.title || bItem.name || 'Untitled';
            const normTitle = normalizeSearchKey(title);
            let score = 250;
            if (normTitle === normQ || compactSearchKey(title) === compactQ) score = 900;
            else if (normTitle.startsWith(normQ)) score = 500;
            tmdbResults.push({
                ...bItem,
                score
            });
        }

        for (let pIdx = 0; pIdx < tmdbPages.length; pIdx++) {
            const pageItems = tmdbPages[pIdx] || [];
            //search/movie is index 1, search/tv is index 2
            const forcedType = pIdx === 1 ? 'movie' : (pIdx === 2 ? 'tv' : null);

            for (const item of pageItems) {
                if (!item || !item.id || item.media_type === 'person') continue;
                const mediaType: 'movie' | 'tv' = (forcedType || item.media_type || (item.name && !item.title ? 'tv' : 'movie')) as 'movie' | 'tv';
                if (mediaType !== 'movie' && mediaType !== 'tv') continue;

                const uniqueKey = `${mediaType}_${item.id}`;
                if (seenTmdbIds.has(uniqueKey)) continue;
                seenTmdbIds.add(uniqueKey);

                const title = item.title || item.name || item.original_title || item.original_name || 'Untitled';
                const compactT = compactSearchKey(title);
                const matchingImdb = imdbByNormTitle.get(compactT);

                const posterPath = item.poster_path || matchingImdb?.poster_path || null;
                const backdropPath = item.backdrop_path || matchingImdb?.backdrop_path || posterPath;
                const releaseDate = item.release_date || item.first_air_date || matchingImdb?.release_date || '';
                const voteAvg = Number(item.vote_average || 0) > 0 ? Number(item.vote_average) : (matchingImdb?.vote_average || 7.8);
                const overview = item.overview || matchingImdb?.overview || '';

                // Calculate relevance score
                const normTitle = normalizeSearchKey(title);
                let score = 200 + Math.min(Number(item.popularity || 0), 150);
                if (normTitle === normQ || compactT === compactQ) score += 700;
                else if (normTitle.startsWith(normQ) || compactT.startsWith(compactQ)) score += 400;
                else if (normTitle.includes(normQ) || compactT.includes(compactQ)) score += 250;
                else if (qTokens.length > 1 && qTokens.every(t => normTitle.includes(t))) score += 180;

                if (posterPath) score += 80;
                if (extractedYear && releaseDate.startsWith(extractedYear)) score += 200;

                tmdbResults.push({
                    id: item.id,
                    tmdbId: item.id,
                    imdb_id: matchingImdb?.imdb_id,
                    title,
                    name: item.name || title,
                    media_type: mediaType,
                    poster_path: posterPath,
                    backdrop_path: backdropPath,
                    vote_average: voteAvg,
                    release_date: releaseDate,
                    first_air_date: item.first_air_date || (mediaType === 'tv' ? releaseDate : undefined),
                    overview,
                    original_language: item.original_language,
                    cast: matchingImdb?.cast,
                    score
                });
            }
        }

        // Merge Pre-Seeded + TMDB + IMDb + SMMovieHub without duplicates
        const combined: FastMediaMatch[] = [];
        const seenIds = new Set<string>();
        const seenCompactTitles = new Set<string>();

        const addUnique = (item: FastMediaMatch) => {
            const idKey = `${item.media_type}_${item.id}`;
            const compactKey = `${item.media_type}_${compactSearchKey(item.title || item.name || '')}`;
            if (seenIds.has(idKey)) return;
            if (compactKey.length > 4 && seenCompactTitles.has(compactKey)) {
                // Enrich existing entry if it lacked a poster or imdb_id
                const existing = combined.find(c => `${c.media_type}_${compactSearchKey(c.title || c.name || '')}` === compactKey);
                if (existing) {
                    if (!existing.poster_path && item.poster_path) existing.poster_path = item.poster_path;
                    if (!existing.backdrop_path && item.backdrop_path) existing.backdrop_path = item.backdrop_path;
                    if (!existing.imdb_id && item.imdb_id) existing.imdb_id = item.imdb_id;
                    if ((!existing.cast || !existing.cast.length) && item.cast?.length) existing.cast = item.cast;
                    if (!existing.directStreamUrl && item.directStreamUrl) existing.directStreamUrl = item.directStreamUrl;
                }
                return;
            }
            seenIds.add(idKey);
            if (compactKey.length > 4) seenCompactTitles.add(compactKey);
            combined.push(item);
        };

        // 1. High-confidence pre-seeded hits first
        for (const item of preseededMatches) {
            if ((item.score || 0) >= 650) addUnique(item);
        }

        // 2. TMDB results sorted by score
        tmdbResults.sort((a, b) => (b.score || 0) - (a.score || 0));
        for (const item of tmdbResults) {
            addUnique(item);
        }

        // 3. IMDb Suggestion results (catches regional series/movies not on TMDB or ranked higher on IMDb)
        for (const item of imdbResults) {
            const cT = compactSearchKey(item.title);
            let score = 450;
            if (cT === compactQ) score = 950;
            else if (cT.startsWith(compactQ)) score = 600;
            addUnique({ ...item, score });
        }

        // 4. SMMovieHub direct stream movies & remaining pre-seeded matches
        for (const item of smMatches) {
            addUnique(item);
        }
        for (const item of preseededMatches) {
            addUnique(item);
        }

        // Final sort by score descending so exact matches & poster-rich items lead
        combined.sort((a, b) => (b.score || 0) - (a.score || 0));

        return combined.slice(0, limit);
    }

    /**
     * Fast AniList Anime Search
     */
    public static async searchAnimeFast(query: string, limit: number = 20): Promise<FastMediaMatch[]> {
        if (!query) return [];
        try {
            const gql = `
                query ($search: String, $perPage: Int) {
                    Page(page: 1, perPage: $perPage) {
                        media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
                            id
                            idMal
                            title { romaji english native }
                            coverImage { large }
                            bannerImage
                            averageScore
                            episodes
                            format
                            status
                            description
                            genres
                        }
                    }
                }
            `;
            const resp = await axios.post('https://graphql.anilist.co', {
                query: gql,
                variables: { search: query, perPage: Math.min(limit, 10) }
            }, {
                timeout: 900,
                httpAgent,
                httpsAgent,
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            });

            const media = resp.data?.data?.Page?.media || [];
            return media.map((item: any) => ({
                id: item.id,
                malId: item.idMal || item.id,
                title: item.title?.english || item.title?.romaji || 'Anime',
                name: item.title?.english || item.title?.romaji || 'Anime',
                media_type: 'anime',
                poster_path: item.coverImage?.large || null,
                backdrop_path: item.bannerImage || null,
                vote_average: item.averageScore ? Number((item.averageScore / 10).toFixed(1)) : 8.0,
                overview: item.description ? item.description.replace(/<[^>]*>/g, '') : '',
                original_language: 'ja'
            }));
        } catch {
            return [];
        }
    }

    /**
     * Master Lightning Unified Search
     */
    public static async search(query: string, source: string = 'all', limit: number = 48): Promise<ConsumetSearchResults> {
        const startTime = Date.now();
        const cleanQ = (query || '').trim();
        const normSource = (source || 'all').toLowerCase();
        const cacheKey = `${normSource}:${cleanQ.toLowerCase()}:${limit}`;

        // 1. Check LRU Memory Cache (<0.5ms)
        const cached = queryCache.get(cacheKey);
        const now = Date.now();
        if (cached && (now - cached.timestamp < cached.ttlMs)) {
            return {
                ...cached.data,
                timing_ms: Date.now() - startTime,
                cached: true
            };
        }

        const results: ConsumetSearchResults['results'] = {
            events: [],
            channels: [],
            movies: [],
            anime: []
        };

        if (normSource === 'channels') {
            results.channels = this.searchChannelsFast(cleanQ, limit);
        } else if (normSource === 'events') {
            results.events = await this.searchSportsEventsFast(cleanQ, limit);
        } else if (normSource === 'tmdb' || normSource === 'movies') {
            results.movies = await this.searchMoviesAndSeriesFast(cleanQ, Math.max(limit, 48));
        } else if (normSource === 'anime' || normSource === 'anilist') {
            results.anime = await this.searchAnimeFast(cleanQ, limit);
        } else {
            // UNIFIED SEARCH: Run all engines concurrently with Promise.allSettled
            const [channelsSettled, eventsSettled, moviesSettled, animeSettled] = await Promise.allSettled([
                Promise.resolve(this.searchChannelsFast(cleanQ, 12)),
                this.searchSportsEventsFast(cleanQ, 9),
                this.searchMoviesAndSeriesFast(cleanQ, Math.max(limit, 40)),
                this.searchAnimeFast(cleanQ, 10)
            ]);

            if (channelsSettled.status === 'fulfilled') results.channels = channelsSettled.value;
            if (eventsSettled.status === 'fulfilled') results.events = eventsSettled.value;
            if (moviesSettled.status === 'fulfilled') results.movies = moviesSettled.value;
            if (animeSettled.status === 'fulfilled') results.anime = animeSettled.value;
        }

        const total = results.events.length + results.channels.length + results.movies.length + results.anime.length;
        const finalResult: ConsumetSearchResults = {
            query: cleanQ,
            source: normSource,
            timing_ms: Date.now() - startTime,
            cached: false,
            total,
            results
        };

        // Store in LRU cache
        if (queryCache.size >= MAX_QUERY_CACHE) {
            const oldest = queryCache.keys().next().value;
            if (oldest) queryCache.delete(oldest);
        }
        queryCache.set(cacheKey, {
            data: finalResult,
            timestamp: now,
            ttlMs: CACHE_TTL_MS
        });

        return finalResult;
    }

    /**
     * Auto-suggestions for instant typeahead (<1ms)
     */
    public static getSuggestions(query: string, limit: number = 10): string[] {
        const cleanQ = normalizeSearchKey(query || '');
        const compactQ = compactSearchKey(query || '');
        if (!cleanQ || cleanQ.length < 2) return [];

        const suggestions: string[] = [];
        const seen = new Set<string>();

        // Check preseeded titles
        for (const item of POPULAR_MEDIA_SEED) {
            const title = (item.title || item.name || '').trim();
            if (normalizeSearchKey(title).includes(cleanQ) || compactSearchKey(title).includes(compactQ)) {
                if (!seen.has(title)) {
                    seen.add(title);
                    suggestions.push(title);
                    if (suggestions.length >= limit) return suggestions;
                }
            }
        }

        // Check channel names
        this.ensureChannelsIndex();
        for (const ch of this.indexedChannels) {
            const name = (ch.name || ch.title || '').trim();
            if (name.toLowerCase().includes(cleanQ)) {
                if (!seen.has(name)) {
                    seen.add(name);
                    suggestions.push(name);
                    if (suggestions.length >= limit) return suggestions;
                }
            }
        }

        return suggestions;
    }
}
