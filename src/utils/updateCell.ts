import {CellComponent} from "tabulator-tables";
import {SettingsData} from "../services/types.ts";

export const updateCell = async (cell: CellComponent, fieldForUpdate: any, name: string, data: any, settings: SettingsData, update: any) => {
    if (!navigator.onLine) {
        alert('Отсутствует интернет-соединение');
        cell.restoreOldValue();
    } else if (data) {
        if (settings?.confirm) {
            if (confirm(`Вы действительно хотите изменить значение поля ${name}?`)) {
                try {
                    const response = await update({
                        ID: cell.getData().ID,
                        ...fieldForUpdate,
                    });
                    //@ts-ignore
                    if (response.data.RESULT.STATUS !== 'success') {
                        //@ts-ignore
                        alert(response.data.RESULT.MESSAGE)
                    }
                } catch (e) {
                    alert(e)
                }
            } else {
                cell.restoreOldValue();
            }
        } else {
            update({
                ID: cell.getData().ID,
                ...fieldForUpdate,
            })
        }
    }
}