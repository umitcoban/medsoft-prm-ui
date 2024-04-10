import { Calendar, Card } from "antd";


interface Props {
    cardTitle: string;
}

const CardCalendar: React.FC<Props> = ({cardTitle}) => {
    return (
        <Card title={cardTitle}>
            <Calendar />
        </Card>
    )
}

export default CardCalendar;