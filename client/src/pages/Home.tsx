import { SensorsList } from "@/modules/Sensors/components/SensorsList";

export const Home = () => {
    return (
        <div>
            <h2 className="text-4xl font-semibold text-center mb-6">Sensors List</h2>
            <SensorsList />
        </div>
    )
}
