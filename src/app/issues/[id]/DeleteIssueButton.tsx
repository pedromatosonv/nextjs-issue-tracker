"use client";

import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

export default function DeleteIssueButton({ issueId }: { issueId: string }) {
  const router = useRouter();

  async function handleDeleteIssue() {
    await axios.delete(`/api/issues/${issueId}`);
    router.push("/issues");
    router.refresh();
  }

  return (
    <Button color="red" onClick={handleDeleteIssue}>
      <HiOutlineTrash />
      Delete
    </Button>
  );
}
