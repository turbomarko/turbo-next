"use client";

import { useAppSelector } from "@/redux/hooks";

import MenuButton from "./MenuButton";
import { routes } from "./config";

export default () => {
  const { isMenuOpen } = useAppSelector((state) => state.ui);

  if (!isMenuOpen) return null;

  return (
    <div className="relative z-50 w-screen bg-card">
      <div className="flex flex-col items-center w-full py-8">
        {routes.map((route) => (
          <MenuButton
            key={route.name}
            name={route.name}
            destination={route.path}
            authRequired={route.authRequired}
          />
        ))}
      </div>
    </div>
  );
};
