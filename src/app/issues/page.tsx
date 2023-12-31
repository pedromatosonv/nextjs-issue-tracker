import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueListingActionBar from "./IssueListingActionBar";
import { IssueStatusBadge, Link } from "@/app/components";

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className="mb-5">
        <IssueListingActionBar />
      </div>
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                  <div>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  </div>{" "}
                  <div className="md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                  <div className="md:hidden">
                    {issue.createdAt.toDateString()}
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  {<IssueStatusBadge status={issue.status} />}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
