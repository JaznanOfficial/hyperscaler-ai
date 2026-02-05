import { Lock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  return (
    <div className="space-y-6 p-4">
      <div className="max-w-xl">
        <h1
          className="font-semibold text-3xl leading-10"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <span className="inline-block bg-linear-to-r from-violet-800 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            Profile
          </span>
        </h1>
        <p className="text-base text-slate-600 leading-3">
          Manage your account information and login details.{" "}
        </p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="inline-flex size-12 items-center justify-center rounded-full bg-linear-to-br from-violet-100 to-fuchsia-100 text-purple-600">
            <User className="size-6" />
          </div>
          <div>
            <CardTitle style={{ fontFamily: "var(--font-outfit)" }}>
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              className="bg-zinc-100"
              defaultValue="Jon Doe"
              id="full-name"
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="bg-zinc-100"
              defaultValue="client@example.com"
              id="email"
              placeholder="you@example.com"
              type="email"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-6">
          <Button className="px-6" variant="gradient">
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="inline-flex size-12 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-100 to-violet-100 text-purple-600">
            <Lock className="size-6" />
          </div>
          <div>
            <CardTitle style={{ fontFamily: "var(--font-outfit)" }}>
              Change Password
            </CardTitle>
            <CardDescription>
              Use a strong password with at least 8 characters
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              className="bg-zinc-100"
              id="current-password"
              placeholder="Enter current password"
              type="password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              className="bg-zinc-100"
              id="new-password"
              placeholder="Enter new password"
              type="password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              className="bg-zinc-100"
              id="confirm-password"
              placeholder="Confirm new password"
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-6">
          <Button className="px-6" variant="gradient">
            Update Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
