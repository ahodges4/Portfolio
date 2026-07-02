import { Suspense, lazy } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";

// Code-split: the demo's bundle (mock data + its own CSS/components) only
// loads when a visitor actually navigates there, not on initial page load.
const LectureAiDemo = lazy(() => import("./demos/lecture-ai/App"));

export default function App() {
  return (
    <div>
      <nav className="navbar">
        <NavLink to="/" className="nav-logo">
          Adam Hodges
        </NavLink>

        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/projects/lecture-ai/demo/*"
          element={
            <Suspense fallback={<p className="demo-loading">Loading demo…</p>}>
              <LectureAiDemo />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}