import HeaderButton from "./HeaderButton";
import Hamburger from "./Hamburger";
import HeaderLink from "./HeaderLink";
import Menu from "./Menu";

export default () => {
  return (
    <div className="relative z-30 h-16 w-full">
      <div className="z-10 flex h-16 w-full items-center justify-between bg-card px-1 sm:px-5">
        <div className="flex items-center">
          <HeaderButton icon="logo" destination="/" isImg />
        </div>
        <div className="mr-24 hidden items-center lg:flex">
          <HeaderLink name="Home" destination="/" />
          <HeaderLink name="About" destination="/about" />
        </div>
        <div className="flex h-full items-center">
          <HeaderButton
            icon="UserCircleIcon"
            destination="/profile"
            authRequired
          />
          <Hamburger />
        </div>
      </div>
      <Menu />
    </div>
  );
};
