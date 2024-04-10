import { Card, Timeline, TimelineItemProps, TimelineProps } from "antd";

interface Props {
    cardTitle?: string;
    department?: string;
    items: TimelineItemProps[];
    mode: TimelineProps["mode"];
}

const TimelineCard: React.FC<Props> = ({ cardTitle, items,department ,mode }) => {
    return (
        <Card title={cardTitle}>
            <h1 className="text-primary-header-color font-semibold text-xl text-center mb-6">{department}</h1>
            <Timeline items={items} mode={mode} pending="Operations in progress"/>
        </Card>
    )
}

export default TimelineCard;