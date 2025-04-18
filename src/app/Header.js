import Link from "next/link";
import { cookies } from "next/headers";
import { CgProfile } from "react-icons/cg";

export default async function Header() {
  const cookieStore = await cookies();
  const name = cookieStore.get("name");
  const role = cookieStore.get("role");
  
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="App-Header">
      <h1 className="title">Praveen Nair</h1>
      <nav>
        <ul>
        <Link href="/"><li>Home</li></Link>
        {role?.value === "admin" && <Link href="/admin/">
        <li>Admin</li>
        </Link>}
        {name ? (
          <>
            <Link href="/courses/"><li>Courses</li></Link>
            <Link href="/auth/signout"><li>Logout</li></Link>
          </>
        ) : (
          <Link href="/auth/signin"><li>Login</li></Link>
        )}
        </ul>
      </nav>
    </div>
  );
}
