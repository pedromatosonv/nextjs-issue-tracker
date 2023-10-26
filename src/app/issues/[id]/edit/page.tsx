import { Box, Heading } from "@radix-ui/themes";
import IssueForm from "../../components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

export default async function EditIssuePage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Box className="space-y-4">
      <Heading>Edit issue</Heading>
      <IssueForm issue={issue} />
    </Box>
  );
}

export const metadata: Metadata = {
  title: "Edit issue",
};
