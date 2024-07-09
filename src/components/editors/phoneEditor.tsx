import {Editor} from "tabulator-tables";
import {createRoot} from "react-dom/client";
import {PhoneInput} from "../phoneInput/PhoneInput.tsx";

export const phoneEditor: Editor = (cell) => {
    let container = document.createElement('span');
    const root = createRoot(container);
    root.render(<PhoneInput key={cell.getRow().getIndex()} cell={cell} currentPhone={cell.getValue()}/>);

    return container;
};
