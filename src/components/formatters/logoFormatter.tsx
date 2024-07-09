import {Formatter} from "tabulator-tables";
import {createRoot} from "react-dom/client";
import {getBaseUrl} from "../../utils/getBaseUrl.ts";

export const logoFormatter: Formatter = (cell) => {
    let container = document.createElement('span');
    const root = createRoot(container);
    let link = cell.getValue()
    if (link) {
        root.render(<a target={"_blank"} href={`${getBaseUrl()}${link}`}>скачать файл</a>);
    }
    return container;
};