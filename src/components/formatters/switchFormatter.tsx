import {Formatter} from "tabulator-tables";
import {createRoot} from "react-dom/client";
import ReactSwitch from "react-switch";

export const switchFormatter: Formatter = (cell) => {
    let container = document.createElement('span');
    const root = createRoot(container);
    let checked = !cell.getValue() ? false : true;
    root.render(<ReactSwitch checked={checked}  height={20} offColor={'#ff2b6b'} onChange={() => cell.setValue(!checked)}/>);

    return container;
};