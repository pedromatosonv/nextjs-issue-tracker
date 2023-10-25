import { IssueStatusBadge } from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";

export default async function IssuePage({
  params,
}: {
  params: { id: string };
}) {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="4">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{issue.description}</Card>
    </div>
  );
}
