import { SidebarData } from "@/types/layout";
import {
  IconCalendarEventFilled,
  IconChartScatter,
  IconLayoutDashboard,
  IconPackages,
  IconUsers,
} from "@tabler/icons-react";
import { Command } from "lucide-react";

export const sidebarData: SidebarData = {
  user: {
    name: "Voting CMS",
    email: "votingcms@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Voting CMS Admin",
      logo: Command,
      plan: "Vite + ShadcnUI",
    },
  ],
  navGroups: [
    {
      // title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: IconLayoutDashboard,
        },
        {
          title: "Campaigns",
          url: "/dashboard/campaigns",
          icon: IconCalendarEventFilled,
        },
        {
          title: "Branding",
          url: "/dashboard/branding",
          icon: IconPackages,
        },
        {
          title: "Reports",
          url: "/dashboard/reports",
          icon: IconChartScatter,
        },
        {
          title: "Users",
          url: "/dashboard/users",
          icon: IconUsers,
        },
      ],
    },
  ],
};
