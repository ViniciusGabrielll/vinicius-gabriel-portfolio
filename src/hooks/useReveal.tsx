import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        setVisible(true);
                    });

                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.15,
            }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);
    
    return { ref, visible };
}