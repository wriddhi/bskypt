import logo from "@/assets/magnode.svg";
import Image from "next/image";

export function Header() {
  return (
    <header>
      <Image
        loading="eager"
        priority={true}
        draggable={false}
        className="w-full -translate-y-1.5 select-none"
        src={logo}
        alt="logo"
      />
    </header>
  );
}
