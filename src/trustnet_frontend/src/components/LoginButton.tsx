import { twMerge } from "tailwind-merge";
import { useInternetIdentity } from "ic-use-internet-identity";

export function LoginButton() {
  const { isLoggingIn, login, clear, identity } = useInternetIdentity();

  async function handleClick() {
    if (identity) {
      await clear();
    } else {
      login();
    }
  }

  let className =
    "flex items-center justify-center px-5 font-bold text-white bg-blue-500 rounded cursor-pointer h-9 md:h-16 hover:bg-blue-700 disabled:bg-blue-500/20 disabled:hover:bg-blue-500/20";
  className = twMerge(className, isLoggingIn ? "cursor-wait" : "cursor-pointer");

  const text = () => {
    if (identity) return "Logout";
    if (isLoggingIn) return "Logging in...";
    return "Login";
  };

  return (
    <button onClick={handleClick} className={className} disabled={isLoggingIn}>
      {text()}
    </button>
  );
}
