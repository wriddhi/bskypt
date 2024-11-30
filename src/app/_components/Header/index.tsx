"use client";

import Image from "next/image";
import Link from "next/link";

import { Links, Socials } from "@/data";
import logo from "@/assets/magnode.svg";
import { cn } from "@/lib/utils";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

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
      <nav
        className={cn(
          "w-11/12 lg:w-full max-w-2xl mx-auto flex justify-evenly items-center",
          "bg-card text-card-foreground",
          "shadow-sm px-4 py-3 uppercase text-sm",
          "fixed top-4 inset-x-0 z-50 rounded-xl lg:rounded-full",
          "border-border border lg:border-2 border-solid"
        )}
      >
        <Link
          href="/"
          title="Home"
          className="font-sans font-black text-xl tracking-tighter mr-auto"
        >
          BSKYPT
        </Link>
        {Object.entries(Links).map(([key, value]) =>
          value.isExternal ? (
            <a
              key={key}
              href={value.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-muted-foreground hover:text-foreground transition-all",
                "active:text-foreground focus:text-foreground",
                "px-2 py-1 rounded-full hover:font-medium",
                "hidden lg:flex"
              )}
            >
              {value.title}
            </a>
          ) : (
            <Link
              className={cn(
                "text-muted-foreground hover:text-foreground transition-all",
                "active:text-foreground focus:text-foreground",
                "px-2 py-1 rounded-full hover:font-medium",
                "hidden lg:flex"
              )}
              key={key}
              href={value.href}
            >
              {value.title}
            </Link>
          )
        )}
        <a
          className={cn(
            "ring-ring ring-2 px-2 py-1 rounded-full font-medium duration-300",
            "hover:bg-foreground hover:text-background",
            "focus:bg-foreground focus:text-background",
            "active:bg-foreground active:text-background ml-2",
            "hidden lg:flex"
          )}
          href={Socials.GitHub}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <Dropdown className="flex lg:hidden translate-y-1.5 -translate-x-1">
          <DropdownTrigger className="flex lg:hidden">
            <Button
              variant="light"
              className="rounded-sm min-w-fit group p-1 h-fit text-xl"
            >
              <RxHamburgerMenu className="flex group-aria-expanded:hidden" />
              <RxCross1 className="hidden group-aria-expanded:flex" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Navigation Menu">
            {Object.entries(Links).map(([key, value]) =>
              value.isExternal ? (
                <DropdownItem
                  as="a"
                  href={value.href}
                  target="_blank"
                  key={key}
                >
                  {value.title}
                </DropdownItem>
              ) : (
                <DropdownItem
                  onClick={(e) => {
                    const link = e.currentTarget.getElementsByTagName("a")?.[0];
                    link.click();
                  }}
                  textValue={value.title}
                  key={key}
                >
                  <Link tabIndex={-1} href={value.href}>
                    {value.title}
                  </Link>
                </DropdownItem>
              )
            )}
          </DropdownMenu>
        </Dropdown>
      </nav>
    </header>
  );
}
