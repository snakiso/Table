declare module 'react-tabulator' {
    import {Options} from 'tabulator-tables';

    interface ReactTabulatorProps {
        data: any[] | string;
        columns: any[];
        options?: Options;
        otherProps?: any;
    }

    const ReactTabulator: React.FC<ReactTabulatorProps>;

    export default ReactTabulator;
}