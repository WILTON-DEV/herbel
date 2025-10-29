"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, BellIcon, UserIcon } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AdminHeaderProps = {
  onMenuClick?: () => void;
};

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b  px-4 md:px-6">
      <div className="flex items-center flex-1 max-w-xl gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => onMenuClick?.()}
          aria-label="Open sidebar"
        >
          {/* simple hamburger */}
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current mt-1.5" />
          <span className="block h-0.5 w-5 bg-current mt-1.5" />
        </Button>
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products, orders, customers..."
            className="pl-10 w-full"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <UserIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
