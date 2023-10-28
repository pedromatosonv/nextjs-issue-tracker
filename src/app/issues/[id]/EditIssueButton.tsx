import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { HiPencilAlt } from "react-icons/hi";

export default function EditIssueButton({ issueId }: { issueId: string }) {
  return (
    <Button>
      <HiPencilAlt />
      <Link href={`/issues/${issueId}/edit`}>Edit</Link>
    </Button>
  );
}
