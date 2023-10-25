"use client";

import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState<string[]>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  async function handleCreateIssue(data: IssueForm) {
    try {
      const res = await axios.post("/api/issues", data);
      router.push("/issues");
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
          <Callout.Text>
            <p className="mb-3 font-semibold">
              An unexpected error has occured:
            </p>
            <ul className="list-disc pl-5">
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-5"
        onSubmit={handleSubmit((data) => handleCreateIssue(data))}
      >
        <div className="space-y-2 flex flex-col">
          <TextField.Input placeholder="Title" {...register("title")} />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        <div className="space-y-2 flex flex-col">
          <TextArea placeholder="Description" {...register("description")} />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting}>
          Create issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
