import { ToggleGroup, ToggleGroupItem } from "@/shared/components/toggle-group";

interface IntervalOption<T extends string> {
    value: T;
    label: string;
}

interface IntervalToggleProps<T extends string> {
    value: T;
    options: IntervalOption<T>[];
    onValueChange: (value: T) => void;
    className?: string;
}

export function IntervalToggle<T extends string>({
    value,
    options,
    onValueChange,
    className = "hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex",
}: IntervalToggleProps<T>) {
    return (
        <ToggleGroup
            type="single"
            value={value}
            onValueChange={(newValue) => {
                if (newValue) onValueChange(newValue as T);
            }}
            variant="outline"
            className={className}
        >
            {options.map((option) => (
                <ToggleGroupItem key={option.value} value={option.value}>
                    {option.label}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}
