import { useState } from "react";
import styles from "./Coffe.module.css";

export default function Coffee() {

    const [animating, setAnimating] = useState(false);

    function handleClick() {
        setAnimating(true);
    }
    return (
        <div className={styles.coffeeContainer}>
            <div className={`${styles.cupWrapper} ${animating ? styles.animating : ""}`}
                onClick={handleClick}
                onAnimationEnd={() => setAnimating(false)}>
                <div className={`${styles.cup} ${animating ? styles.animating : ""}`}>
                    <span className={styles.steam}></span>
                    <span className={styles.steam}></span>
                    <span className={styles.steam}></span>
                    <div className={styles.inside}>
                        <div className={`${styles.coffee} ${animating ? styles.animating : ""}`}></div>
                    </div>


                    <div className={styles.handle}></div>
                </div>
            </div>

            <div className={styles.plate}></div>
        </div>
    )
}