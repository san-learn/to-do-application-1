import { LogOut } from "lucide-react";

import { Button } from "./ui/button";

export function SignOutButton({
  handleClickSignOut,
}: {
  handleClickSignOut: () => Promise<void>;
}) {
  return (
    <Button onClick={handleClickSignOut}>
      <LogOut className="h-4 w-4" color="#FFF1F2" />
    </Button>
  );
}
