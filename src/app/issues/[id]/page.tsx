import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiPencilAlt } from "react-icons/hi";

interface Props {
  params: { id: string };
}

export default async function IssuePage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Box className="max-w-xl">
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3" justify="between">
        <Flex gap="3" align="center">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Button>
          <HiPencilAlt />
          <Link href={`/issues/${params.id}/edit`}>Edit</Link>
        </Button>
      </Flex>
      <Card className="p-3" mt="5">
        {issue.description}
      </Card>
    </Box>
  );
}
