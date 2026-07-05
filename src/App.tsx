import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Projects from "./containers/projects";
import AboutMe from "./containers/aboutMe";
import Contact from "./containers/contact";
import AssessmentAndQuote from "./containers/AssessmentAndQuote";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Projects />} />
                    <Route path="/about" element={<AboutMe />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/assessment-quote" element={<AssessmentAndQuote />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}