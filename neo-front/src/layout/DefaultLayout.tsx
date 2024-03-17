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
              <Link to="/"><h1>NEO</h1></Link>
            </li>
            <li>
              {/* <Link to="/signup"><h2>Sign Up</h2></Link> */}
            </li>
          </ul>
        </nav>

      <main>{children}</main>
    </>
  );
}
