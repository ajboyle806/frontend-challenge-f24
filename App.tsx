import Main from "./components/Main"
import Reciept from "./components/Receipt"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<>
						<div style={{width: "100vw", backgroundColor: "#fafcff"}}>
							<Main />
						</div>
					</>}>
					</Route>
					<Route path="/receipt" element={<>
						<div style={{width: "100vw", backgroundColor: "#fafcff"}}>
							<Reciept />
						</div>
					</>}>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
