import { Card, Statistic } from "antd";
import { FC } from "react";

interface Props {
    cardTitle: string;
    statsTitle: string;
    value: any;
    prefix?: string;
    suffix?: string;
}

const StatsCard: FC<Props> = ({ cardTitle, statsTitle, value, prefix, suffix }) => {
    return (
        <Card title={cardTitle} className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <Statistic title={statsTitle} value={value} prefix={prefix} suffix={suffix} />
        </Card>
    );
}

export default StatsCard;
