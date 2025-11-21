import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/shared/components/select";

interface SelectOption<T extends string> {
    value: T;
    label: string;
}

interface IntervalSelectProps<T extends string> {
    value: T;
    options: SelectOption<T>[];
    onValueChange: (value: T) => void;
    placeholder?: string;
    className?: string;
}

export function IntervalSelect<T extends string>({
    value,
    options,
    onValueChange,
    placeholder = "Select interval",
    className = "flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden",
}: IntervalSelectProps<T>) {
    return (
        <Select value={value} onValueChange={(newValue) => onValueChange(newValue as T)}>
            <SelectTrigger className={className} size="sm" aria-label="Select a value">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="rounded-lg">
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
