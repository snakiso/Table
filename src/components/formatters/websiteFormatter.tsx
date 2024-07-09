import {Formatter} from "tabulator-tables";
import {createRoot} from "react-dom/client";

export const websiteFormatter: Formatter = (cell) => {
    let container = document.createElement('span');
    const root = createRoot(container);
    let link = cell.getValue()
    if (link) {
        const linkWithProtocol = !/^https?:\/\//i.test(link) ? `http://${link}` : link
        const linkWithoutProtocol = link.replace(/^(https?:\/\/)?(www\.)?/i, "");
        root.render(<a target={"_blank"} href={linkWithProtocol}>{linkWithoutProtocol}</a>);
    }
    return container;
};