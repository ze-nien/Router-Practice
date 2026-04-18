import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  const normalStyle =
    "transition-all duration-300 hover:[text-shadow:0_0_20px_rgba(255,255,255,1)]";
  const activeStyle = "font-bold pointer-events-none cursor-default";

  const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About" },
    { to: "/minesweeper", label: "Minesweeper" },
    { to: "/sudoku", label: "Sudoku" },

    { to: "/vinylCollection", label: "VinylCollection" },
  ];

  return (
    <div>
      <nav className="p-4 mb-4 bg-red-800 text-white">
        <ul className="flex gap-4">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? activeStyle : normalStyle
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className=" flex flex-col items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
