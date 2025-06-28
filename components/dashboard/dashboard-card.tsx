import Anchor from "../navigation/anchor";
import { Card } from "../ui/card";

const DashboardCard = ({
    title,
    description,
    count,
    link,
}: {
    title: string;
    description: string;
    count: number;
    link: string;
}) => {
    return (
        <Card className="p-3">
            <div className="p-3 grid gap-4">
                <h2 className="font-medium text-muted-foreground">{title}</h2>
                <p className="text-4xl font-bold">{count}</p>
            </div>
            <div className="flex justify-end mt-1">
                <Anchor
                    variant="ghost"
                    href={link}
                    className="text-muted-foreground"
                >
                    {description}
                </Anchor>
            </div>
        </Card>
    );
};


export default DashboardCard;
