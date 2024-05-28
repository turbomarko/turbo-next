"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/form";

export default () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} className="my-6" shadow>
      Go back
    </Button>
  );
};
