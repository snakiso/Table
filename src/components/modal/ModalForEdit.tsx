import {useEffect, useState} from "react";
import {useGetCompaniesQuery} from "../../services/data-service.ts";
import './modal.scss'

type ModalProps = {
    id: string

    close: () => void
}
export const ModalForEdit = ({id, close}: ModalProps) => {
    const {data} = useGetCompaniesQuery()

    const [fields, setFields] = useState<{ [key: string]: any }>({})
    const fieldsNames = Object.keys(fields)
    useEffect(() => {
        if (data) {
            const filteredFields = Object.entries(data.THESAURUS.FIELDS)
                .filter(([_, field]) => field.EDITABLE)
                .reduce((obj: { [key: string]: any }, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {});
            setFields(filteredFields)
            console.log(filteredFields)
        }
    }, [data]);


    return (
        <div className={'modal'}>
            <button onClick={close} className={'modal__button-close'}></button>
            <h2 className={'modal__title'}>Редактирование заявки № {id}</h2>
            {
                <form action="" style={{display: 'flex', flexDirection: 'column'}}>
                    {fieldsNames.map((el, i) => {
                        return (
                            <label className={'label'} key={i}>
                                {fields[el].NAME}
                                {fields[el].TYPE === 'boolean' && <input type="checkbox" name={el}/>}
                                {fields[el].TYPE === 'list' &&
                                    <select>
                                        {data && Object.entries(data.THESAURUS[el] as string[]).map(([key, value]) => {
                                            return (
                                                <option key={key} value={key}>{value}</option>
                                            )
                                        })}
                                    </select>}
                            </label>
                        )
                    })}
                    <button>Редактировать</button>
                </form>
            }
        </div>
    );
};

