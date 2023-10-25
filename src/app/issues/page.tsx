import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Issues() {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </div>
  );
}
