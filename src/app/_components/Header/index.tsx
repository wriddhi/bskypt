import logo from "@/assets/magnode.svg";
import Image from "next/image";

export function Header() {
  return (
    <header>
      <Image
        draggable={false}
        className="w-full -translate-y-1.5 select-none"
        src={logo}
        alt="logo"
      />
    </header>
  );
}
