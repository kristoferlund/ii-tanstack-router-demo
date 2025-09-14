import { Link } from "@tanstack/react-router";
import GithubLink from "./github-link";
import { useInternetIdentity } from "ic-use-internet-identity";
import { Button } from "./ui/button";

export default function MenuBar() {
  const { clear, identity } = useInternetIdentity();

  if (!identity) return null;

  return <div className="flex gap-5 text-white items-center">
    <Link to="/" className="hover:text-white/70">
      /index
    </Link>
    <Link to="/about" className="hover:text-white/70">
      /about
    </Link>
    <Button onClick={clear} variant={"outline"} size={"sm"}>Logout</Button>
    <GithubLink />
  </div>

}
