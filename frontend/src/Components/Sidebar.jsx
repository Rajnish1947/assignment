import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="fixed top-0 left-0 h-screen w-56 bg-black text-white p-4 md:w-64 md:p-6">
    <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
    <nav>
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className="block p-2 rounded text-white hover:bg-blue-700"
            style={{ textDecoration: "none" }}
          >
            General <br />Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className="block p-2 rounded text-white hover:bg-blue-600 border-sky-100"
            style={{ textDecoration: "none" }}
          >
            <i className="fa-solid fa-tv"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/transaction"
            className="block p-2 rounded text-white hover:bg-blue-600"
            style={{ textDecoration: "none" }}
          >
            <i className="fa-solid fa-bars"></i> Transaction
          </Link>
        </li>
        <li>
          <Link
            to="/donation"
            className="block p-2 rounded text-white hover:bg-blue-600"
            style={{ textDecoration: "none" }}
          >
            <i className="fa-solid fa-arrow-right"></i> Start Here
          </Link>
        </li>
        <li>
          <Link
            to="/FAQ"
            className="block p-2 rounded text-white hover:bg-blue-600"
            style={{ textDecoration: "none" }}
          >
            <i className="fa-solid fa-question"></i> FAQ
          </Link>
        </li>
        <li>
          <Link
            to="/learning page"
            className="block p-2 rounded text-white hover:bg-blue-600"
            style={{ textDecoration: "none" }}
          >
            <i className="fa-solid fa-book-open"></i> Learning Modules
          </Link>
        </li>
        <li>
          <Link
            to="/Reward"
            className="block p-2 rounded text-white hover:bg-blue-600"
            style={{ textDecoration: "none" }}
          >
            <i className="fa-solid fa-star"></i> Rewards
          </Link>
        </li>
        <li>
          <Link
            to="/Feed"
            className="block p-2 rounded text-white hover:bg-blue-600"
            style={{ textDecoration: "none" }}
          >
            <i className="fa-solid fa-comment"></i> Feedback
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;

