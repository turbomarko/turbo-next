
import HeaderButton from "./HeaderButton";
import Hamburger from "./Hamburger";
import HeaderLink from "./HeaderLink";
import Menu from "./Menu";

export default () => {
  return (
    <div className="relative w-full h-16 z-30">
      <div className="w-full h-16 bg-card px-1 sm:px-5 flex z-10 justify-between items-center">
        <div className="flex items-center">
          <HeaderButton
            icon="logo"
            destination="/"
            isImg
          />
        </div>
        <div className="items-center mr-24 hidden lg:flex">
          <HeaderLink
            name="Home"
            destination="/"
          />
          <HeaderLink
            name="About"
            destination="/about"
          />
        </div>
        <div className="flex items-center h-full">
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
}
