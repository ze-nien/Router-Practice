import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Sudoku from "./pages/Sudoku";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      { index: true, element: <Home /> },
      { path: "About", element: <About /> },
      {
        path: "Minesweeper",
        lazy: async () => {
          let Minesweeper = await import("./pages/Minesweeper");
          return { Component: Minesweeper.default };
        },
      },
      { path: "Sudoku", element: <Sudoku /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  );
}

export default App;
