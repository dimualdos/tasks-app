import { FunctionComponent } from "react";

export const DirectionItems: FunctionComponent = () => {
    return (
        <div>
            <h2>Выберите направление</h2>
            <select>
                <option value="">Все направления</option>
                <option value="Направление обучения">Направление обучения</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
            </select>
        </div>
    )
}