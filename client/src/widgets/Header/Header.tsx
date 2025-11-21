import { Sun, Moon, Monitor } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/select";
import { Separator } from "@/shared/components/separator";
import { useTheme } from "@/shared/hooks/useTheme";

export const Header = () => {
    const { theme, setTheme } = useTheme();

    return (
        <header className="w-full mb-6">
            <div className="flex justify-between items-center py-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">Temperature Monitoring</h1>
                    <p className="text-sm text-muted-foreground">Monitoring sensors in real-time</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">Тема:</span>
                    <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Выберите тему" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="light">
                                    <span className="flex items-center gap-2">
                                        <Sun className="h-4 w-4" />
                                        Светлая
                                    </span>
                                </SelectItem>
                                <SelectItem value="dark">
                                    <span className="flex items-center gap-2">
                                        <Moon className="h-4 w-4" />
                                        Тёмная
                                    </span>
                                </SelectItem>
                                <SelectItem value="system">
                                    <span className="flex items-center gap-2">
                                        <Monitor className="h-4 w-4" />
                                        Системная
                                    </span>
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Separator />
        </header>
    )
}
