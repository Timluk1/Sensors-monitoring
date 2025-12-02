import { useNavigate } from "react-router";
import { Button } from "@/shared/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/shared/components/card";
import { Container } from "@/shared/components/Container";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <div className="flex items-center justify-center min-h-[80vh]">
                <Card className="w-full max-w-lg text-center shadow-lg">
                    <CardContent className="space-y-4">
                            <div className="mx-auto">
                                <div className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    404
                                </div>
                            </div>
                            <CardTitle className="text-3xl font-bold">
                                Страница не найдена
                            </CardTitle>
                            <CardDescription className="text-lg">
                                К сожалению, запрашиваемая страница не существует или была перемещена
                            </CardDescription>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
                        <Button 
                            onClick={() => navigate(-1)} 
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            Вернуться назад
                        </Button>
                        <Button 
                            onClick={() => navigate("/")} 
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            На главную
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </Container>
    );
};
