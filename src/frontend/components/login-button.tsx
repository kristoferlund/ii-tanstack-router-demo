import { useInternetIdentity } from "ic-use-internet-identity";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import icLogo from "../assets/ic.svg";

export default function LoginButton() {
  const { isIdle, login, error, isInitializing, isLoggingIn } = useInternetIdentity();

  const disabled = isInitializing || isLoggingIn;
  const text = isLoggingIn ? "Signing in ..." : "Continue with Internet Identity";

  return <Button disabled={disabled} onClick={login}>
    {(isIdle || error) && <img src={icLogo} className="w-5 h-5" />}
    {isLoggingIn && <LoaderCircle className="animate-spin" />}
    {text}
  </Button>
}
