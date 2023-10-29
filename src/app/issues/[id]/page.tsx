import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

interface Props {
  params: { id: string };
}

export default async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Box>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3" justify="between">
        <Flex gap="3" align="center">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        {session && (
          <Box className="space-x-2">
            <EditIssueButton issueId={params.id} />
            <DeleteIssueButton issueId={params.id} />
          </Box>
        )}
      </Flex>
      <Card className="p-3" mt="5">
        {issue.description}
      </Card>
    </Box>
  );
}
