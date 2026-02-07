import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import BlurredUpImage from "./components/BlurredUpImage";

// Lazy load route components
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const SinglePost = lazy(() => import("./components/SinglePost"));
const Post = lazy(() => import("./components/Post"));
const Project = lazy(() => import("./components/Project"));

function AppContent() {
  const location = useLocation();
  const showHeroBackground = location.pathname === "/" || location.pathname === "/about";

  return (
    <>
      <NavBar />
      <div className="relative flex-1 flex flex-col min-h-0">
        {showHeroBackground && (
          <>
            <BlurredUpImage />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20 pointer-events-none" />
          </>
        )}
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/post/:slug" element={<SinglePost />} />
            <Route path="/post" element={<Post />} />
            <Route path="/project" element={<Project />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <AppContent />
      </div>
    </BrowserRouter>
  );
}

export default App;
