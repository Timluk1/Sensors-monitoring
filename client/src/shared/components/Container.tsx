interface ContainerProps {
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="max-w-[1000px] mx-auto py-4">
            {children}
        </div>
    )
}