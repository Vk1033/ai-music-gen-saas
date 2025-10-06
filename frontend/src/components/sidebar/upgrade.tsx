"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";

export default function Upgrade() {
  const upgrade = async () => {
    await authClient.checkout({
      products: [
        "94250cfa-b045-4ff4-8916-7f238fdc7e10",
        "c0ee31b4-a938-41f6-bb3e-c5dd405cec17",
        "2ce58b61-6d7e-4aef-83f1-b3cb37fc22ed",
      ],
    });
  };
  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-2 cursor-pointer text-orange-400"
      onClick={upgrade}
    >
      Upgrade
    </Button>
  );
}
