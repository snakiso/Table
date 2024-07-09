import {ColumnDefinition, ReactTabulator} from "react-tabulator";
import {useEffect, useState} from "react";
import {CompaniesDataSaurus, CompaniesListForRender, CompanyFields} from "../../services/types.ts";
import {Loader} from "../loader/Loader.tsx";
import {useGetCompaniesQuery, useUpdateCompanyMutation,} from "../../services/data-service.ts";
import {useSettings} from "../../hooks/useSettings.ts";
import {updateCell} from "../../utils/updateCell.ts";
import {booleanFormatter} from "../formatters/booleanFormatter.tsx";
import {CellComponent, Options} from "tabulator-tables";
import {options} from "./options.ts";
import {emailFormatter} from "../formatters/emailFormatter.tsx";
import {logoFormatter} from "../formatters/logoFormatter.tsx";
import {Modal} from "../modal/Modal.tsx";
import {getBaseUrl} from "../../utils/getBaseUrl.ts";
import {websiteFormatter} from "../formatters/websiteFormatter.tsx";
import {telFormatter} from "../formatters/telFormatter.tsx";

export const TableCompanies = () => {
    const [dataForRender, setDataForRender] = useState<CompaniesListForRender[]>([])
    const [fields, setFields] = useState<CompanyFields>({} as CompanyFields)
    const [theSaurus, setTheSaurus] = useState<CompaniesDataSaurus>({} as CompaniesDataSaurus)
    const [message, setMessage] = useState('')
    const [modal, setModal] = useState({isOpen: false, id: ''})
    const closeModal = () => {
        setModal({isOpen: false, id: ''})
    }
    const settings = useSettings()

    const {data, isLoading} = useGetCompaniesQuery()
    const [update] = useUpdateCompanyMutation()

    useEffect(() => {
        console.log(data)
        if (data) {
            if (data.STATUS === 'success') {
                const theSaurusKeys = Object.keys(data.THESAURUS)
                const newData = Object.values(data.COMPANIES).map(el => {
                    const newDataItems = {
                        ...el,
                        STAND_ADD_PLASMA: !!el.STAND_ADD_PLASMA,
                        STAND_ADD_LTE: !!el.STAND_ADD_LTE,
                        COMPANY_CARD: el.COMPANY_CARD ? data.THESAURUS.FIELDS.COMPANY_CARD.LINK_TEXT : ''
                    }
                    for (const key of theSaurusKeys) {
                        //@ts-ignore
                        newDataItems[key] = data.THESAURUS[key][el[key]];
                    }

                    return newDataItems
                })

                setDataForRender(newData ?? []);
                const sortedData = Object.entries(data.THESAURUS.FIELDS).sort((a, b) => a[1].SORT - b[1].SORT)
                const sortedFields = Object.fromEntries(sortedData) as CompanyFields;
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

    const convertDate = (date: string) => {
        return date.split('-').reverse().join('.')
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

    function getKeyByValue(value: string, field: string) {
        if (data) {
            return Object.keys(data.THESAURUS[field]).find((key) => data.THESAURUS[field][key] === value);
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
        cssClass: !fields[name].EDITABLE && fields[name].TYPE !== 'popup' && 'tabulator-cell_no-edit',
        headerFilter: fields[name].HEADER_FILTER && fields[name].HEADER_FILTER_TYPE,
        headerFilterParams: {
            dateFormat: 'dd.MM.yyyy HH:mm:ss',
            values: (fields[name].TYPE === 'boolean' && ['Да', 'Нет']) || (fields[name].HEADER_FILTER_TYPE === 'list' && (theSaurus[name] ? Object.values(theSaurus[name]) : []))
        },
        headerFilterFunc: fields[name].TYPE === 'boolean'
            ? (headerValue, rowValue) => headerValue === 'Да'
                ? rowValue === true : rowValue === false : fields[name].TYPE === 'date' ? headerFilterFuncDate : false,
        editor: fields[name].EDITABLE && fields[name].EDITABLE_TYPE,

        formatter:
            fields[name].EDITABLE_TYPE === 'tickCross' && booleanFormatter ||
            fields[name].TYPE === 'link' && logoFormatter ||
            fields[name].TYPE === 'website' && websiteFormatter ||
            fields[name].TYPE === 'tel' && telFormatter ||
            fields[name].TYPE === 'email' && emailFormatter,
        vertAlign: "middle",
        editorParams: {values: fields[name].EDITABLE_TYPE === 'list' && data && Object.values(theSaurus[name])},
        //@ts-ignore
        cellClick: (e, cell) => {
            name === "COMPANY_CARD" && cell.getValue() && setModal({
                isOpen: true, id: (cell.getRow().getData().ID)
            })
        },
        cellEdited: cell => {
            const cel = document.querySelector('.tabulator-editable')
            cel?.classList.add('test')
            //@ts-ignore
            updateCellHandler(cell, {[name]: fields[name].EDITABLE_TYPE === 'list' ? getKeyByValue(cell.getValue(), name) : cell.getValue()}, fields[name].NAME)
        }
    }))


    const optionsForCompanyTable: Options = {
        ...options,
        paginationSize: settings?.defaultRowViewValue,
        paginationSizeSelector: settings?.rowViewsValues,
        //@ts-ignore
        columns: columns
    };

    if (isLoading) {
        return <Loader/>
    }
    if (message) {
        return <h1 className={'error-message'}>{message}</h1>
    }
    return (
        <div className={'tableContainer'}>
            <p className="download">
                <a className="button button_download button_download-xls"
                   href={`${getBaseUrl()}/admin/service/companies.get.xls.php`} target="_blank">
                    скачать формате в xls
                </a>
            </p>
            <div><ReactTabulator data={dataForRender} options={optionsForCompanyTable}/></div>
            {
                modal.isOpen && <Modal id={modal.id} close={closeModal}/>
            }
            {/*<ModalForEdit id={'1'} close={() => {}}/>*/}
        </div>
    )
};

