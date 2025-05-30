import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load route components
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const SinglePost = lazy(() => import("./components/SinglePost"));
const Post = lazy(() => import("./components/Post"));
const Project = lazy(() => import("./components/Project"));

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="/post" element={<Post />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
