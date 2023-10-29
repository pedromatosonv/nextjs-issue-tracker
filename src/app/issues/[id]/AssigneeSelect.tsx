"use client";

import { Select } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import axios from "axios";

export default function AssigneeSelect() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="orange">Pedro Matoso</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
