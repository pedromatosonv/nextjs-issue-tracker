"use client";

import { ErrorMessage } from "@/app/components/ErrorMessage";
import { Spinner } from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { z } from "zod";

type IssueForm = z.infer<typeof issueSchema>;

export default function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState<string[]>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit((data: IssueForm) => {
    if (issue) {
      return handleUpdateIssue(data);
    }

    return handleCreateIssue(data);
  });

  async function handleCreateIssue(data: IssueForm) {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error: any) {
      setValidationErrors(
        error.response.data.map((error: any) => error.message)
      );
    }
  }

  async function handleUpdateIssue(data: IssueForm) {
    try {
      await axios.patch("/api/issues/" + issue?.id, data);
      router.push("/issues/" + issue?.id);
      router.refresh();
    } catch (error: any) {
      setValidationErrors(
        error.response.data.map((error: any) => error.message)
      );
    }
  }

  return (
    <div className="max-w-xl space-y-3">
      {validationErrors && (
        <Callout.Root color="red">
          <Callout.Icon>
            <AiOutlineInfoCircle />
          </Callout.Icon>
          <Callout.Text className="space-y-3">
            <p className="font-semibold">An unexpected error has occured</p>
            <ul className="list-disc pl-5">
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2 flex flex-col">
          <TextField.Input
            placeholder="Title"
            defaultValue={issue?.title}
            {...register("title")}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        <div className="space-y-2 flex flex-col">
          <TextArea
            placeholder="Description"
            defaultValue={issue?.description}
            {...register("description")}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting}>
          {issue ? "Update issue" : "Create issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
