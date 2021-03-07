import { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
// import { useAuth } from "src/auth/useAuth";

interface IProps {
  main: React.ReactNode;
}
const Layout: FunctionComponent<IProps> = ({ main }) => {
  return (
    <div className="bg-gray-900 max-w-screen-2xl mx-auto text-white">
      <nav className="bg-gray-800" style={{ height: "64px" }}>
        <div className="px-6 flex items-center justify-between h-16">
          <Link href="/">
            <a>
              {" "}
              <img
                src="/home-color.svg"
                alt="home house"
                className="inline w-6"
              />{" "}
            </a>
          </Link>
        </div>
      </nav>
      {main}
    </div>
  );
};

export default Layout;
