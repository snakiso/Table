import {Formatter} from "tabulator-tables";
import {createRoot} from "react-dom/client";

export const emailFormatter: Formatter = (cell) => {
    let container = document.createElement('span');
    const root = createRoot(container);
    let link = cell.getValue()
    root.render(<a href={`mailto:${link}`}>{link}</a>);

    return container;
};