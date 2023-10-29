"use client";

import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";
import axios from "axios";
import { Skeleton } from "@/app/components";

export default function AssigneeSelect() {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
  });

  if (error) {
    return;
  }

  if (isLoading) {
    return <Skeleton width="5rem" />;
  }

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
