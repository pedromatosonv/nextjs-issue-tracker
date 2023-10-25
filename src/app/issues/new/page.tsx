"use client";

import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IssueForm {
  title: string;
  description: string;
}

export default function NewIssuePage() {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState<string[]>();
  const { register, handleSubmit } = useForm<IssueForm>();

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

  console.log(validationErrors);

  return (
    <div className="max-w-xl space-y-3">
      {validationErrors && (
        <Callout.Root color="red">
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
        className="space-y-3"
        onSubmit={handleSubmit((data) => handleCreateIssue(data))}
      >
        <TextField.Input placeholder="Title" {...register("title")} />
        <TextArea placeholder="Description" {...register("description")} />
        <Button>Create issue</Button>
      </form>
    </div>
  );
}
