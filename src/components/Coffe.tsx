import { useState } from "react";
import styles from "./Coffe.module.css";

import mark from "../../public/mark.svg";

type CoffeeProps = {
    infinite?: boolean;
};

export default function Coffee({ infinite = false }: CoffeeProps) {

    const [animating, setAnimating] = useState(infinite);

    function handleClick() {
        setAnimating(true);
    }

    function handleAnimationEnd() {
        if (infinite == false) {
            setAnimating(false);
        }
    }

    return (
        <img onClick={handleClick} onAnimationEnd={handleAnimationEnd} src={mark} className={`${styles.mark} ${animating ? styles.animate : ""}`} style={{
            animationIterationCount: infinite ? "infinite" : 1
        }}>
        </img >
    )
}