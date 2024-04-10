import { Card, Table, TableProps } from "antd";

interface Props {
    cardTitle: string;
    dataSource: TableProps["dataSource"];
    columns: TableProps["columns"];
}

const CardTable: React.FC<Props> = ({cardTitle, columns, dataSource}) => {
    return (
        <Card title={cardTitle}>
            <Table dataSource={dataSource} columns={columns} style={{overflow: "auto"}} tableLayout="auto"/>
        </Card>
    )
}

export default CardTable;