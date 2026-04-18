import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import VinylCollection from "./pages/VinylCollection";

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
        lazy: async () => ({
          Component: (await import("./pages/Minesweeper")).default,
        }),
      },
      {
        path: "Sudoku",
        lazy: async () => ({
          Component: (await import("./pages/Sudoku")).default,
        }),
      },
      { path: "VinylCollection", element: <VinylCollection /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  );
}

export default App;
