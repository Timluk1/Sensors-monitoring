import { LoaderCircle } from "lucide-react";

import { cn } from "@/shared/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <LoaderCircle
            role="status"
            aria-label="Loading"
            className={cn("size-10 animate-spin", className)}
            {...props}
        />
    );
}

export { Spinner };
