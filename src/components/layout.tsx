import { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "src/auth/useAuth";

interface IProps {
  main: React.ReactNode;
}
const Layout: FunctionComponent<IProps> = ({ main }) => {
  const { logout, authenticated } = useAuth();

  return (
    <div className="mx-auto text-white bg-gray-900 max-w-screen-2xl">
      <nav className="bg-gray-800" style={{ height: "64px" }}>
        <div className="flex items-center justify-between h-16 px-6">
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
          {authenticated ? (
            <>
              <Link href="/houses/add">
                <a>Add House</a>
              </Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link href="/auth">
              <a>Login / Signup</a>
            </Link>
          )}
        </div>
      </nav>
      <main style={{ minHeight: "calc(100vh -64px" }}>{main}</main>
    </div>
  );
};

export default Layout;
