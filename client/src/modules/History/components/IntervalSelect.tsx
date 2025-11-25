import { Select, SelectItem, SelectContent } from "@/shared/components/select";

interface SelectOption<T extends string> {
    value: T;
    label: string;
}

interface IntervalSelectProps<T extends string> {
    value: T;
    options: SelectOption<T>[];
    onValueChange: (value: T) => void;
}

export function IntervalSelect<T extends string>({
    value,
    options,
    onValueChange,
}: IntervalSelectProps<T>) {
    return (
        <Select
            value={value}
            onValueChange={(newValue) => onValueChange(newValue as T)}
        >
            <SelectContent className="rounded-xl">
                {options.map((option) => (
                    <SelectItem
                        key={option.value}
                        value={option.value}
                        className="rounded-lg"
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
