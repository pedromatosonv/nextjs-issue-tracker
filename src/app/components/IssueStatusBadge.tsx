import { Status } from "@prisma/client";
import { Badge, badgePropDefs } from "@radix-ui/themes";

type BadgeColor = (typeof badgePropDefs.color.values)[number];

const statusMap: Record<Status, { label: string; color: BadgeColor }> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

export function IssueStatusBadge({ status }: { status: Status }) {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
}
