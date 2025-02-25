import { LogOut } from "lucide-react";

import { Button } from "./ui/button";

type SignOutButtonProps = {
  handleClickSignOut: () => Promise<void>;
};

export function SignOutButton({ handleClickSignOut }: SignOutButtonProps) {
  return (
    <Button onClick={handleClickSignOut}>
      <LogOut className="h-4 w-4" color="#FFF1F2" />
    </Button>
  );
}
