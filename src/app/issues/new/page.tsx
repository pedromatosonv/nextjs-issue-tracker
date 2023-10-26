import { Box, Heading } from "@radix-ui/themes";
import IssueForm from "../components/IssueForm";
import { Metadata } from "next";

export default async function NewIssuePage() {
  return (
    <Box className="space-y-4">
      <Heading>Create issue</Heading>
      <IssueForm />
    </Box>
  );
}

export const metadata: Metadata = {
  title: "Create issue",
};

export const dynamic = "force-dynamic";
