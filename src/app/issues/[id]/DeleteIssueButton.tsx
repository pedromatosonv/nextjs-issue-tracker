"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
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
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <HiOutlineTrash />
          Delete
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
        <AlertDialog.Description size="3">
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={handleDeleteIssue}>
              Delete issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
