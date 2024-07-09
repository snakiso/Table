import {KeyboardEvent, useEffect, useState} from "react";
import InputMask from 'react-input-mask'
import {CellComponent} from "tabulator-tables";


type PhoneInputProps = {
    currentPhone: string
    cell: CellComponent

}

export const PhoneInput = ({currentPhone, cell}: PhoneInputProps) => {
    const [phone, setPhone] = useState(currentPhone)

    useEffect(() => {
        setPhone(currentPhone);
    }, [currentPhone]);

    const updateCell = () => {
        if (!cell || !cell.getRow()) {
            return;
        }
        const regex = /^(\+\d{1,2})\s(\d{3})(\d{3})(\d{2})(\d{2})$/;
        const replacedNumber = phone.replace(regex, '$1 ($2) $3-$4-$5');
        cell.setValue(replacedNumber)
        const row = cell.getRow();
        if (row) {
            const table = row.getTable();
            table.deselectRow(row);
        }
    }

    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateCell()
        }
    }

    const handleBlur = () => {
        // Откладываем изменения до следующего цикла событий
        setTimeout(() => {
            updateCell();
        }, 0);
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault()
        const regexForDop = / \(([^)]+)\)$/
        const regex = /[\(\)\s-]/g
        const pastedPhone = event.clipboardData.getData('text').replace(regexForDop, '')
        const phoneNumbers = pastedPhone.replace(regex, '')
        const phoneTenNumbers = phoneNumbers.slice(-10)

        console.log(phoneTenNumbers)

        if (pastedPhone.length >= 11) {
            const formattedPhone = `+7 ${phoneTenNumbers}`

            setPhone(formattedPhone)
        } else {
            setPhone(pastedPhone)
        }
    }
    return (
        <InputMask
            mask={phone.length === 2 ? '+7 (999) 999-99-99' : '+7 (999) 999-99-99'}
            maskChar=" "
            onKeyDown={keyDownHandler}
            onChange={e => {
                setPhone(e.target.value);
            }}
            onBlur={handleBlur}
            onPaste={handlePaste}
            type={'tel'}
            value={phone}
        />
    );
};

