import AuthModal from "./AuthModal";
import { Logo } from "./Logo";
export const Navbar = () => {
  return (
    <header className="flex py-5 items-center justify-between">
      <Logo />
      <AuthModal />
    </header>
  );
};
