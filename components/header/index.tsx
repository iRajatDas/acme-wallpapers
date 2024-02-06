"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
} from "@nextui-org/react";

import { IconSearch } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <div className="border-b-[0.5px] border-neutral-700">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        // shouldHideOnScroll

        classNames={{
          wrapper: "mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl",
        }}
      >
        <NavbarContent className="shrink-0 !grow-0 sm:!grow">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="">
            {/* <AcmeLogo /> */}

            <p className="font-bold text-inherit">ACME</p>
            <span id="tagline">
              <p className="text-xs text-default-500 pl-3 font-medium hidden sm:block">
                Free HD Wallpapers
              </p>
            </span>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
          as="div"
          className="items-center flex-1"
          justify="center"
        >
          <Input
            className=""
            classNames={{
              base: "max-w-full sm:max-w-full h-10 w-full",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: cn(
                "h-full font-normal text-default-500 bg-red-300 dark:bg-default-500/20 hover:bg-default-400/30 dark:hover:bg-default-500/30 focus:bg-default-400/30 dark:focus:bg-default-500/30",
                "group-data-[focus=true]:!bg-default-500/30"
              ),
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<IconSearch size={18} />}
            type="search"
          />
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
