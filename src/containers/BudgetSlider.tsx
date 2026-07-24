import { useMemo, useState } from "react";
import styles from "./BudgetSlider.module.css";

const MIN = 200;
const MAX = 1200;
const STEP = 1;

interface BudgetSliderProps {
    onChange: (budget: { min: number; max: number }) => void;
}

export default function BudgetSlider({ onChange }: BudgetSliderProps) {

    const [minValue, setMinValue] = useState(500);
    const [maxValue, setMaxValue] = useState(900);

    const [minInput, setMinInput] = useState("500");
    const [maxInput, setMaxInput] = useState("900");

    const handleMinSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);

        if (value < maxValue) {
            setMinValue(value);
            setMinInput(String(value));

            onChange({
                min: value,
                max: maxValue,
            });
        }
    };
    const handleMaxSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);

        if (value > minValue) {
            setMaxValue(value);
            setMaxInput(String(value));

            onChange({
                min: minValue,
                max: value,
            });
        }
    };

    const validateMin = () => {
        let value = Number(minInput);

        if (isNaN(value)) value = MIN;
        if (value < MIN) value = MIN;
        if (value >= maxValue) value = maxValue - STEP;

        setMinValue(value);
        setMinInput(String(value));

        onChange({
            min: value,
            max: maxValue,
        });
    };

    const validateMax = () => {
        let value = Number(maxInput);

        if (isNaN(value)) value = MAX;
        if (value > MAX) value = MAX;
        if (value <= minValue) value = minValue + STEP;

        setMaxValue(value);
        setMaxInput(String(value));

        onChange({
            min: minValue,
            max: value,
        });
    };

    const progress = useMemo(() => {
        const left = ((minValue - MIN) / (MAX - MIN)) * 100;
        const right = ((maxValue - MIN) / (MAX - MIN)) * 100;

        return {
            left: `${left}%`,
            width: `${right - left}%`,
        };
    }, [minValue, maxValue]);

    return (
        <div className={styles.container}>
            <div className={styles.sliderContainer}>
                <div className={styles.track}></div>

                <div
                    className={styles.progress}
                    style={progress}
                ></div>

                <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    step={STEP}
                    value={minValue}
                    onChange={handleMinSlider}
                    className={styles.slider}
                />

                <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    step={STEP}
                    value={maxValue}
                    onChange={handleMaxSlider}
                    className={styles.slider}
                />
            </div>

            <div className={styles.inputs}>
                <div className={styles.inputGroup}>
                    <label>Mínimo</label>

                    <div className={styles.inputWrapper}>
                        <span>R$</span>

                        <input
                            type="number"
                            value={minInput}
                            onChange={(e) => setMinInput(e.target.value)}
                            onBlur={validateMin}
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Máximo</label>

                    <div className={styles.inputWrapper}>
                        <span>R$</span>

                        <input
                            type="number"
                            value={maxInput}
                            onChange={(e) => setMaxInput(e.target.value)}
                            onBlur={validateMax}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}