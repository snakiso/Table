import {useEffect} from "react";
import browserUpdate from 'browser-update';
import {Router} from "./router/router.tsx";

export function App() {
    useEffect(() => {
        browserUpdate({
            required: {e: -10, f: -10, o: -10, s: -6, c: -10},
            insecure: true,
            unsupported: true,
            reminder: 0,
            style: 'bottom',
            shift_page_down: false,
            l: 'ru',
            text: 'Возможна некорректная работа приложения. Обновите браузер, если есть возможность или установите другой'
        });
    }, []);
   
    return <Router/>
}
