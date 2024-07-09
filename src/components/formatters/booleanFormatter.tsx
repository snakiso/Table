import {Formatter} from "tabulator-tables";

export const booleanFormatter: Formatter = (cell) => {
    if (cell.getValue() === 'Нет' || cell.getValue() === false) {
        return 'Нет'
    } else {
        return 'Да'
    }
};