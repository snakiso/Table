import './modal.scss'
import {useGetCompanyDataQuery} from "../../services/data-service.ts";
import {ModalLoader} from "../loader/ModalLoader.tsx";
import {getBaseUrl} from "../../utils/getBaseUrl.ts";

type ModalProps = {
    id: string
    close: () => void
}

export const Modal = ({id, close}: ModalProps) => {
    const {data, isLoading} = useGetCompanyDataQuery({id})
    console.log(data)

    return (
        <div className={'modal'}>
            <button onClick={close} className={'modal__button-close'}></button>
            <h2 className={'modal__title'}>Реквизиты компании</h2>
            {
                isLoading ? <ModalLoader/> :
                    <>
                        <a href={`${getBaseUrl()}/admin/service/company-requisites.get.php?type=xlsx&COMPANY_ID=${id}`}>
                            скачать в xslx
                        </a>
                        <table className={'modal__table'}>
                            <tbody className={'modal__table-body'}>
                            {data && data?.SUMMARY.map((el, i) => {
                                return (
                                    <tr key={i} className={'modal__table-row'}>
                                        <td className={'modal__table-data modal__table-data_name'}>{el.NAME}</td>
                                        <td className={'modal__table-data modal__table-data_value'}>{el.VALUE}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </>
            }
        </div>
    );
};

