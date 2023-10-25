import { Skeleton } from "@/app/components";
import { Card, Flex } from "@radix-ui/themes";

export default function Loading() {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="p-3" mt="5">
        <Skeleton count={3} />
      </Card>
    </div>
  );
}
