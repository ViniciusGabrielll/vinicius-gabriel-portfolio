import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Projects from "./containers/Projects";
import AboutMe from "./containers/AboutMe";
import Contact from "./containers/Contact";
import AssessmentAndQuote from "./containers/AssessmentAndQuote";
import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";

const MIN_TIME = 1000;

export default function App() {

    const [mounted, setMounted] = useState(true);
    const [hide, setHide] = useState(false);

    useEffect(() => {
        const startTime = Date.now();

        function finishLoading() {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, MIN_TIME - elapsed);

            setTimeout(() => {
                setHide(true);

                setTimeout(() => {
                    setMounted(false);
                }, 1000);
            }, remaining);
        }

        if (document.readyState === "complete") {
            finishLoading();
        } else {
            window.addEventListener("load", finishLoading);
        }

        return () => {
            window.removeEventListener("load", finishLoading);
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