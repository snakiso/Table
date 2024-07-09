import {ColumnDefinition, ReactTabulator} from "react-tabulator";
import './table.scss'
import {CellComponent, Options} from 'tabulator-tables';
import {useGetDataQuery, useUpdateParticipantMutation} from "../../services/data-service.ts";
import {useEffect, useState} from "react";
import {CompanyData, ParticipantDataSaurus, ParticipantFields} from "../../services/types.ts";
import {Loader} from "../loader/Loader.tsx";
import {useSettings} from '../../hooks/useSettings.ts';
import {updateCell} from "../../utils/updateCell.ts";
import {switchFormatter} from "../formatters/switchFormatter.tsx";
import {options} from "./options.ts";
import {getBaseUrl} from "../../utils/getBaseUrl.ts";
import {emailFormatter} from "../formatters/emailFormatter.tsx";
import {websiteFormatter} from "../formatters/websiteFormatter.tsx";
import {telFormatter} from "../formatters/telFormatter.tsx";

export const TableParticipants = () => {
    const settings = useSettings()
    const {data, isLoading} = useGetDataQuery()
    const [update] = useUpdateParticipantMutation()
    const [message, setMessage] = useState('')
    const [dataForRender, setDataForRender] = useState<CompanyData[]>([])
    const [fields, setFields] = useState<ParticipantFields>({} as ParticipantFields)
    const [theSaurus, setTheSaurus] = useState<ParticipantDataSaurus>({} as ParticipantDataSaurus)

    useEffect(() => {
        console.log(data)
        if (data) {
            if (data.STATUS === 'success') {
                const theSaurusKeys = Object.keys(data.THESAURUS)
                const newData = Object.values(data.PARTICIPANTS).map(el => {
                    const newDataItems = {...el}
                    for (const key of theSaurusKeys) {
                        //@ts-ignore
                        newDataItems[key] = data.THESAURUS[key][el[key]];
                    }

                    return newDataItems
                })
                setDataForRender(newData ?? []);
                const sortedData = Object.entries(data.THESAURUS.FIELDS).sort((a, b) => a[1].SORT - b[1].SORT)
                const sortedFields = Object.fromEntries(sortedData) as ParticipantFields;
                setFields(sortedFields)
                setTheSaurus(data.THESAURUS)
            } else {
                setMessage(data.MESSAGE)
            }
        }
    }, [data]);


    const updateCellHandler = (cell: CellComponent, fieldForUpdate: any, name: string) => {
        if (settings) {
            updateCell(cell, fieldForUpdate, name, data, settings, update)
        }

    }

    const headerFilterFuncTickCross: ((headerValue: any, rowValue: any, rowdata: any, filterparams: any) => boolean) = (headerValue, rowValue) => {
        if (!headerValue) {
            // Если фильтр не установлен, отображаем все строки
            return true;
        }
        const booleanValue = rowValue === true ? "Да" : "Нет"

        return booleanValue === headerValue;
    }


    const headerFilterFuncDate: ((headerValue: any, rowValue: any, rowdata: any, filterparams: any) => boolean) = (headerValue, rowValue) => {
        if (!headerValue) {
            // Если фильтр не установлен, отображаем все строки
            return true;
        }

        const headerDate = convertDate(headerValue);
        const rowDate = rowValue.split(' ')[0];

        return headerDate === rowDate;
    };
    const convertDate = (date: string) => {
        return date.split('-').reverse().join('.')
    }

    function getKeyByValue(value: string) {
        if (data) {
            return Object.keys(data.THESAURUS.REGION).find((key) => data.THESAURUS.REGION[key] === value);
        }
    }

    const fieldsName = Object.keys(fields)

    //@ts-ignore
    const columns: ColumnDefinition[] = fieldsName?.map(name => ({
        field: name,
        title: fields[name].NAME,
        width: fields[name].defaultWidth,
        maxWidth: fields[name].maxWidth,
        minWidth: fields[name].minWidth ? fields[name].minWidth : 100,
        headerFilter: fields[name].HEADER_FILTER && fields[name].HEADER_FILTER_TYPE,
        headerFilterParams: {
            dateFormat: 'dd.MM.yyyy HH:mm:ss',
            values: (fields[name].HEADER_FILTER_TYPE === 'list' && fields[name].EDITABLE_TYPE !== 'tickCross' && (theSaurus[name] ? Object.values(theSaurus[name]) : [])) || ['Да', 'Нет']
        },
        headerFilterFunc: fields[name].TYPE === 'date' && headerFilterFuncDate || fields[name].EDITABLE_TYPE === 'tickCross' && headerFilterFuncTickCross,
        editor: fields[name].EDITABLE && (fields[name].EDITABLE_TYPE === 'tickCross' ? undefined : fields[name].EDITABLE_TYPE),
        editorParams: {
            values: fields[name].EDITABLE_TYPE === 'list' && (theSaurus[name] ? Object.values(theSaurus[name]) : []),
            mask: fields[name].TYPE === 'tel' && '+7 (999) 999-99-99',
            maskNumberChar: fields[name].TYPE === 'tel' && "9",
            maskAutoFill: fields[name].TYPE === 'tel' && true,
        },
        formatter: fields[name].EDITABLE_TYPE === 'tickCross' && switchFormatter ||
            fields[name].EDITABLE_TYPE === 'email' && emailFormatter ||
            fields[name].TYPE === 'email' && emailFormatter ||
            fields[name].TYPE === 'website' && websiteFormatter ||
            fields[name].TYPE === 'tel' && telFormatter,
        //  vertAlign: "middle",
        hozAlign:
            fields[name].EDITABLE_TYPE === 'tickCross' && "center",
        cellEdited:
            cell => {
                console.log(cell.getData())
                //@ts-ignore
                updateCellHandler(cell, {[name]: fields[name].EDITABLE_TYPE === 'list' ? getKeyByValue(cell.getValue(), name) : cell.getValue()}, fields[name].NAME)
            }
    }))


    const optionsForParticipantTable: Options = {
        ...options,
        paginationSize: settings?.defaultRowViewValue,
        paginationSizeSelector: settings?.rowViewsValues,
        //@ts-ignore
        columns: columns
    };

    // const optionsForParticipantTable: Options = {
    //     ...options,
    //     paginationSize: settings?.defaultRowViewValue,
    //     paginationSizeSelector: settings?.rowViewsValues,
    //     columns: [
    //         {title: 'Дата регистрации', field: 'MODIFIED', resizable: true, cssClass: 'tabulator-cell_no-edit',},
    //         {title: 'ID', field: 'ID', cssClass: 'tabulator-cell_no-edit'},
    //         {
    //             title: 'Фамилия', field: 'LAST_NAME', headerFilter: "input", cssClass: 'tabulator-cell_no-edit'
    //         },
    //         {
    //             title: 'Имя', field: 'FIRST_NAME', headerFilter: "input", cssClass: 'tabulator-cell_no-edit'
    //         },
    //         {
    //             title: 'Отчество', field: 'MIDDLE_NAME', headerFilter: "input", cssClass: 'tabulator-cell_no-edit'
    //         },
    //         {
    //             title: "Контактное лицо", headerFilter: "input", field: "CONTACT", cssClass: 'tabulator-cell_no-edit'
    //         },
    //         {
    //             title: "Должность", field: "JOB", headerFilter: "input", editor: 'input',
    //             cssClass: 'tabulator-cell_text-edit',
    //             cellEdited: cell => {
    //                 updateCellHandler(cell, {JOB: cell.getValue()}, 'Должность')
    //             }
    //         },
    //         {
    //             title: "Компания/Организация",
    //             field: "COMPANY",
    //             headerFilter: "input",
    //             cssClass: 'tabulator-cell_no-edit'
    //         },
    //         {
    //             title: "Компания/Организация для бэйджа",
    //             editor: 'input',
    //             cssClass: 'tabulator-cell_text-edit',
    //             field: "COMPANY_SHORT",
    //             headerFilter: "input",
    //             cellEdited: cell => {
    //                 updateCellHandler(cell, {COMPANY_SHORT: cell.getValue()}, 'Компания/Организация для бэйджа')
    //             }
    //         },
    //         {
    //             title: "Телефон",
    //             editor: 'input',
    //             cssClass: 'tabulator-cell_text-edit',
    //             editorParams: {
    //                 mask: '+7 (999) 999-99-99',
    //                 maskNumberChar: "9",
    //                 maskAutoFill: true,
    //             },
    //             field: "TEL",
    //             cellEdited: cell => {
    //                 updateCellHandler(cell, {TEL: cell.getValue()}, 'Телефон')
    //             }
    //         },
    //         {
    //             title: "Эл. почта", editor: 'input', field: "EMAIL", cssClass: 'tabulator-cell_text-edit',
    //             formatter: emailFormatter,
    //             cellEdited: cell => {
    //                 updateCellHandler(cell, {EMAIL: cell.getValue()}, 'Эл. почта')
    //             }
    //         },
    //         {
    //             title: "Регион",
    //             editor: 'list',
    //             headerFilter: 'input',
    //             editorParams: {values: data && Object.values(data.THESAURUS.REGION)},
    //             field: "REGION_ID",
    //             cellEdited: cell => {
    //                 updateCellHandler(cell, {REGION_ID: getKeyByValue(cell.getValue())}, 'Регион')
    //             }
    //         },
    //         {
    //             title: "Вид деятельности (гос. сектор, обще. Организ., СМИ, Коммерция)",
    //             field: "ACTIVITY",
    //             headerFilter: "list",
    //             cssClass: 'tabulator-cell_no-edit',
    //             vertAlign: 'middle',
    //             headerFilterParams: {
    //                 values: data && Object.values(data.THESAURUS.ACTIVITY),
    //             },
    //         },
    //         {
    //             title: "Формат участия (Участник, партнер, экспонент", field: "PARTICIPATION_TYPE",
    //             headerFilter: "list",
    //             cssClass: 'tabulator-cell_no-edit',
    //             vertAlign: 'middle',
    //             headerFilterParams: {
    //                 values: data && Object.values(data.THESAURUS.PARTICIPATION_TYPE),
    //             },
    //         },
    //         {
    //             title: "Экскурсия", field: "TOUR_NAME",
    //             headerFilter: "list",
    //             // headerFilterParams: {
    //             //     values: data && Object.values(data.THESAURUS.VISITING_PROGRAMME),
    //             // },
    //             editor: 'list',
    //             // editorParams: {
    //             //     values: data && Object.values(data.THESAURUS.VISITING_PROGRAMME),
    //             // },
    //             cellEdited: cell => {
    //                 //@ts-ignore
    //                 updateCellHandler(cell, {VISITING_PROGRAMME: Object.keys(data.THESAURUS.VISITING_PROGRAMME).find((key) => data.THESAURUS.VISITING_PROGRAMME[key] === cell.getValue())}, 'Экскурсия')
    //
    //             }
    //         },
    //         {
    //             title: "Подтверждение регистрации",
    //             field: "REGISTERED",
    //             formatter: switchFormatter,
    //             hozAlign: "center",
    //             sorter: 'boolean',
    //             cellEdited: cell => {
    //                 updateCellHandler(cell, {REGISTERED: cell.getValue()}, 'Подтверждение регистрации')
    //             }
    //         },
    //     ],
    // };

    if (isLoading) {
        return <Loader/>
    }
    if (message) {
        return <h1 className={'error-message'}>{message}</h1>
    }
    return <div className={'tableContainer'}>
        <p className="download">
            <a className="button button_download button_download-xls"
               href={`${getBaseUrl()}/admin/service/participants.get.xls.php`} target="_blank">
                скачать формате в xls
            </a>
        </p>
        <div><ReactTabulator data={dataForRender} options={optionsForParticipantTable}/></div>
    </div>
};



