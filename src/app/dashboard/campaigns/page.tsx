"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for campaigns
const mockCampaigns = [
  {
    id: "1",
    slug: "epl-best-goal",
    name: "English Premier League: Best Goal 2025",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-11-05",
    totalVotes: 15420,
    candidates: 4,
    createdAt: "2023-12-01",
    createdBy: {
      name: "John Admin",
      avatar: "/avatars/john.jpg",
      initials: "JA",
    },
  },
  {
    id: "2",
    slug: "student-council-spring",
    name: "Student Council Spring Election",
    status: "completed",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    totalVotes: 3240,
    candidates: 8,
    createdAt: "2024-02-15",
    createdBy: {
      name: "Sarah Teacher",
      avatar: "/avatars/sarah.jpg",
      initials: "ST",
    },
  },
  {
    id: "3",
    slug: "community-board-vote",
    name: "Community Board Election",
    description: "Local community board member selection",
    status: "draft",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    totalVotes: 0,
    candidates: 6,
    createdAt: "2024-05-10",
    createdBy: {
      name: "Mike Manager",
      avatar: "/avatars/mike.jpg",
      initials: "MM",
    },
  },
  {
    id: "4",
    slug: "employee-of-month",
    name: "Employee of the Month",
    description: "Monthly employee recognition voting",
    status: "active",
    startDate: "2024-07-01",
    endDate: "2024-07-31",
    totalVotes: 567,
    candidates: 12,
    createdAt: "2024-06-25",
    createdBy: {
      name: "Lisa HR",
      avatar: "/avatars/lisa.jpg",
      initials: "LH",
    },
  },
  {
    id: "5",
    slug: "budget-allocation-2024",
    name: "Budget Allocation 2024",
    description: "Community budget allocation voting",
    status: "scheduled",
    startDate: "2024-08-15",
    endDate: "2024-09-15",
    totalVotes: 0,
    candidates: 0,
    createdAt: "2024-07-01",
    createdBy: {
      name: "Robert Finance",
      avatar: "/avatars/robert.jpg",
      initials: "RF",
    },
  },
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: { variant: "default" as const, label: "Active" },
    completed: { variant: "secondary" as const, label: "Completed" },
    draft: { variant: "outline" as const, label: "Draft" },
    scheduled: { variant: "secondary" as const, label: "Scheduled" },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const DashboardCampaignPage = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);

  const handleDeleteClick = (campaignId: string) => {
    setCampaignToDelete(campaignId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Handle delete logic here
    console.log("Deleting campaign:", campaignToDelete);
    setDeleteDialogOpen(false);
    setCampaignToDelete(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your voting campaigns and elections
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Campaigns
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCampaigns.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Campaigns
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCampaigns.filter((c) => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCampaigns
                .reduce((sum, c) => sum + c.totalVotes, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all campaigns
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCampaigns.filter((c) => c.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully finished
            </p>
          </CardContent>
        </Card>
      </div> */}

      {/* Campaigns Table */}
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead>Candidates</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-sm text-muted-foreground">
                        /{campaign.slug}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {campaign.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        {formatDate(campaign.startDate)} -{" "}
                        {formatDate(campaign.endDate)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.ceil(
                          (new Date(campaign.endDate).getTime() -
                            new Date(campaign.startDate).getTime()) /
                            (1000 * 3600 * 24)
                        )}{" "}
                        days
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {campaign.totalVotes.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{campaign.candidates}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={campaign.createdBy.avatar}
                          alt={campaign.createdBy.name}
                        />
                        <AvatarFallback>
                          {campaign.createdBy.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">{campaign.createdBy.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {formatDate(campaign.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            navigator.clipboard.writeText(campaign.slug)
                          }
                        >
                          Copy campaign slug
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/campaigns/${campaign.slug}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View campaign
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/campaigns/${campaign.slug}/edit`}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit campaign
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteClick(campaign.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete campaign
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              campaign and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DashboardCampaignPage;
