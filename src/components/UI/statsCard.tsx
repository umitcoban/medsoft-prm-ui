import { Card, Statistic } from "antd";

interface Props{
    cardTitle: string;
    statsTitle: string;
    value: any;
    prefix?: string;
    suffix?: string;
}

const StatsCard: React.FC<Props> = ({cardTitle, statsTitle, value, prefix, suffix}) => {
    return(
        <Card title={cardTitle}>
            <Statistic title={statsTitle}  value={value} prefix={prefix} suffix={suffix} />
        </Card>
    );
}

export default StatsCard;