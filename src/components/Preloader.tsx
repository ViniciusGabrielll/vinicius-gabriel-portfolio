import styles from "./Preloader.module.css";

import Coffee from "./Coffe";



interface Props {
    hide: boolean;
}

export default function Preloader({ hide }: Props) {
    return (
        <div className={`${styles.container} ${hide ? styles.hide : ""}`}>
            <Coffee infinite />
        </div>
    )
}