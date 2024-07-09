import {Formatter} from "tabulator-tables";
import {createRoot} from "react-dom/client";

export const telFormatter: Formatter = (cell) => {
    let container = document.createElement('span');
    const root = createRoot(container);
    let tel = cell.getValue()
    root.render(<a href={`tel:${tel.replace(/[^+0-9]+/g, '')}`}>{tel}</a>);
    return container;
};