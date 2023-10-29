"use client";

import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { Skeleton } from "@/app/components";
import { toast, Toaster } from "react-hot-toast";

export default function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, error, isLoading } = useUsers();

  if (error) {
    return;
  }

  if (isLoading) {
    return <Skeleton width="5rem" />;
  }

  async function handleAssignIssue(userId: string) {
    try {
      await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userId === "Unassigned" ? null : userId,
      });
      toast("Assigned user changed successfully");
    } catch (error) {
      toast("Changes could not be saved.");
    }
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={handleAssignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="Unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Toaster />
    </>
  );
}

function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });
}
