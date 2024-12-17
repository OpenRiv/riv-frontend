import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { ChevronUp } from "lucide-react";
import { ReactNode } from "react";

export default function Filter({ icon, text = "", content }: FilterProps) {
  return (
    <NavigationMenu className="relative z-10">
      <NavigationMenuList className="flex space-x-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-medium group text-gray-07 flex items-center space-x-1 px-[0.5rem] py-[0.3rem] rounded-full bg-[#1E1F22] hover:text-gray-09">
            <span className="mx-[0.25rem]">{icon}</span>
            <span>{text}</span>
            <ChevronUp className="size-[1.25rem] transition-transform duration-200 group-hover:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="group-hover:scale-y-0 transition-transform duration-300 ease-in-out absolute left-0 top-full mt-[0.8rem]">
            {content}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface FilterProps {
  icon?: ReactNode | null;
  text?: string;
  content?: ReactNode | null;
}
