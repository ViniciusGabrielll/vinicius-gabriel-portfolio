import { useState } from "react";
import styles from "./Coffe.module.css";

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
        <div className={styles.coffeeContainer}>
            <div className={`${styles.cupWrapper} ${animating ? styles.animating : ""}`}
                onClick={handleClick}
                onAnimationEnd={handleAnimationEnd} style={{
                    animationIterationCount: infinite ? "infinite" : 1
                }}>
                <div className={`${styles.cup} ${animating ? styles.animating : ""}`} style={{
                    animationIterationCount: infinite ? "infinite" : 1
                }}>
                    <div className={styles.inside}>
                        <div className={`${styles.coffee} ${animating ? styles.animating : ""}`} style={{
                            animationIterationCount: infinite ? "infinite" : 1
                        }}></div>
                    </div>


                    <div className={styles.handle}></div>
                </div>
            </div>

            <div className={styles.plate}></div>
        </div >
    )
}