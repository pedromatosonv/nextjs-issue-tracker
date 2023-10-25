import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export default async function IssuePage({
  params,
}: {
  params: { id: string };
}) {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <div>{issue.title}</div>
      <div>{issue.status}</div>
      <div>{issue.createdAt.toDateString()}</div>
    </div>
  );
}
