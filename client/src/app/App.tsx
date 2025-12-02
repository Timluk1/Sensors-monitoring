import { Routes, Route } from "react-router";
import { Container } from "@/shared/components/Container";
import { Header } from "@/widgets/Header/Header";
import { Home } from "@/pages/Home";
import { History } from "@/pages/History";
import { NotFound } from "@/pages/NotFound";

function App() {
    return (
        <Container>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/history/:id" element={<History />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Container>
    );
}

export default App;
