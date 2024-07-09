import {Options} from "tabulator-tables";


export const options: Options = {
     layout: "fitData",
    // paginationSize: 10,
    // paginationSizeSelector: [5, 10, 25, 50],
    paginationCounter: "rows",
    pagination: true,
    movableColumns: true,
    locale: "ru-ru",
    langs: {
        "ru-ru": {
            "pagination": {
                "page_size": "Число строк",
                "page_title": "Показать страницу",
                "first": "Первая",
                "first_title": "Первая страница",
                "last": "Последняя",
                "last_title": "Последняя страница",
                "prev": "Предыдущая",
                "prev_title": "Предыдущая страница",
                "next": "Следующая",
                "next_title": "Следующая страница",
                "of": "из",
                "counter": {
                    "showing": "Показано",
                    "of": "из",
                    "rows": "строк",
                    "pages": "страниц",
                }
            },
        }
    },
    columns: [],
};