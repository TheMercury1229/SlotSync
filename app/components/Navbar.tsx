import AuthModal from "./AuthModal";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
export const Navbar = () => {
  return (
    <header className="flex py-5 items-center justify-between">
      <Logo />
      <div className="flex items-center gap-x-2">
        <ThemeToggle />
        <AuthModal />
      </div>
    </header>
  );
};
