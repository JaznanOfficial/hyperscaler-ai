"use client";

import { Eye, EyeClosed, Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    fetch("/api/s-admin/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setName(data.user.name);
          setEmail(data.user.email);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load profile");
        setLoading(false);
      });
  }, []);

  const toggleVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSaveProfile = async () => {
    if (!(name.trim() && email.trim())) {
      toast.error("Name and email are required");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/s-admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!(currentPassword && newPassword && confirmPassword)) {
      toast.error("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/s-admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update password");
      }

      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update password"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

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
          Manage your account information and login details.
        </p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-violet-100 to-fuchsia-100 text-purple-600">
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
              id="full-name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              value={name}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="bg-zinc-100"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              value={email}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-6">
          <Button
            className="px-6"
            disabled={saving}
            onClick={handleSaveProfile}
            variant="gradient"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-100 to-violet-100 text-purple-600">
            <Lock className="size-6" />
          </div>
          <div>
            <CardTitle style={{ fontFamily: "var(--font-outfit)" }}>
              Change Password
            </CardTitle>
            <CardDescription>
              Use a strong password with at least 8 characters with uppercase,
              lowercase, and a number.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                className="bg-zinc-100 pr-12"
                id="current-password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                type={passwordVisibility.current ? "text" : "password"}
                value={currentPassword}
              />
              <button
                aria-label={
                  passwordVisibility.current ? "Hide password" : "Show password"
                }
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => toggleVisibility("current")}
                type="button"
              >
                {passwordVisibility.current ? (
                  <EyeClosed aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                className="bg-zinc-100 pr-12"
                id="new-password"
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                type={passwordVisibility.new ? "text" : "password"}
                value={newPassword}
              />
              <button
                aria-label={
                  passwordVisibility.new ? "Hide password" : "Show password"
                }
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => toggleVisibility("new")}
                type="button"
              >
                {passwordVisibility.new ? (
                  <EyeClosed aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                className="bg-zinc-100 pr-12"
                id="confirm-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                type={passwordVisibility.confirm ? "text" : "password"}
                value={confirmPassword}
              />
              <button
                aria-label={
                  passwordVisibility.confirm ? "Hide password" : "Show password"
                }
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => toggleVisibility("confirm")}
                type="button"
              >
                {passwordVisibility.confirm ? (
                  <EyeClosed aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-6">
          <Button
            className="px-6"
            disabled={saving}
            onClick={handleChangePassword}
            variant="gradient"
          >
            {saving ? "Updating..." : "Update Password"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
