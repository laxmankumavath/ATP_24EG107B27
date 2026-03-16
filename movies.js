// ASSIGNMENT 4: Movie Streaming Platform

const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];

// 1. filter() only "Sci-Fi" movies
const sciFi = movies.filter(m => m.genre === "Sci-Fi");

// 2. map() return "Title (rating)"
const formatted = movies.map(m => `${m.title} (${m.rating})`);

// 3. reduce() average movie rating
const average =movies.reduce((sum, m) => sum + m.rating, 0) / movies.length;

// 4. find() movie "Joker"
const joker = movies.find(m => m.title === "Joker");

// 5. findIndex() of "Avengers"
const avengersIndex = movies.findIndex(m => m.title === "Avengers");