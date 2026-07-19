import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Projects from "./containers/Projects";
import AboutMe from "./containers/AboutMe";
import Contact from "./containers/Contact";
import AssessmentAndQuote from "./containers/AssessmentAndQuote";
import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";

export default function App() {

    const [mounted, setMounted] = useState(true);
    const [hide, setHide] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setHide(true);
        }, 1500);

        const timer2 = setTimeout(() => {
            setMounted(false);
        }, 2000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);
    return (
        <>

            {mounted && <Preloader hide={hide} />}
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
        </>
    );
}