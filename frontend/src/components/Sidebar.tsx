import { useLocation, Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

interface Props {
  pages: string[];
  user: string;
}

function Sidebar({ pages, user }: Props) {
  const location = useLocation();

  return (
    <div
      className="bg-primary text-light d-flex flex-column vh-100 p-3"
      style={{ width: "250px", height: "100vh", position: "fixed" }}
    >
      {/* Welcome Header */}
      <div className="text-light h2 mb-3">Welcome, {user}</div>
      <hr />

      {/* Navigation Links */}
      <ul className="nav flex-column">
        {pages.map((page) => {
          const pagePath = page.replace(/[ /-]/g, "");
          const isActive = location.pathname.includes(pagePath);

          return (
            <li className="nav-item mb-2" key={pagePath}>
              <Link
                to={pagePath} // Use `Link` for client-side navigation
                className={`nav-link text-white fs-6 ${
                  isActive ? "active bg-secondary" : ""
                }`}
              >
                {page}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <div className="mt-auto">
        <hr />
        <div className="d-flex justify-content-center pb-3">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
