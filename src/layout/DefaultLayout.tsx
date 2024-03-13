import { Link } from "react-router-dom";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout( {children} : DefaultLayoutProps ) {
  return (
    <>
        <nav className="flex justify-center items-center w-[100%] p-[1rem]">
          <ul className="flex gap-[2rem] max-w-[900px] w-[100%]">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>

      <main>{children}</main>
    </>
  );
}
