import { Skeleton } from "@/app/components";

export default function Loading() {
  return (
    <div className="max-w-xl space-y-3">
      <Skeleton />
      <Skeleton height="20rem" />
    </div>
  );
}
