import { Alert, AlertTitle, AlertDescription } from "@/shared/components/alert"
import { AlertCircleIcon } from "lucide-react"

interface FetchErrorAlertProps {
    title: string;
    description: string;
}

export const FetchErrorAlert = ({ title, description }: FetchErrorAlertProps) => {
    return (
        <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                <p>{description}</p>
            </AlertDescription>
        </Alert>
    )
}
