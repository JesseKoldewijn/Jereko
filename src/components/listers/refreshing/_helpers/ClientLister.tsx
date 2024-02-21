"use client";

import { useQuery } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { type RefreshingListProps } from "../Root";
import { ClientListItems } from "./ClientItems";

export type RefreshingListerProps<T> = RefreshingListProps<T> & {
  initialData: T | undefined;
};

const interval = 300000; // 5 minutes

const ClientListerRefreshing = <T,>({
  listerItemName,
  initialData,
  actionFunction,
  queryKey,
  ssr,
  emptyListMessage,
  lastFetchAt,
  listerItemArrayPointer,
  className,
}: RefreshingListerProps<T>) => {
  const [lastFetchedAt, setLastFetchedAt] = useState<Date | undefined>(
    lastFetchAt,
  );

  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () => actionFunction(),
    initialData: ssr ? initialData : undefined,
    refetchInterval: interval,
  });

  const ListerItem = ClientListItems[listerItemName];

  if (!ListerItem) {
    throw new Error(
      `No lister item found for "${listerItemName}". Please add it to the ClientListItems object.`,
    );
  }

  useEffect(() => {
    const newDate = new Date();
    const isTooRecent = lastFetchedAt
      ? newDate.getTime() - lastFetchedAt?.getTime() < interval
      : true;

    if (isTooRecent) return;

    if (data) {
      setLastFetchedAt(new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data && !isPending && !initialData) {
    return <div>{emptyListMessage}</div>;
  }

  if (isPending && !ssr) {
    return <div>Loading...</div>;
  }

  if (error) {
    throw error;
  }

  const DataMapper = memo(
    ({ x }: { x: typeof data }) => {
      const mapped =
        x && listerItemArrayPointer
          ? (x[listerItemArrayPointer as keyof T] as unknown as any[])
          : (x as unknown as any[]);
      const initialDataMapped =
        initialData && listerItemArrayPointer
          ? (initialData[listerItemArrayPointer as keyof T] as unknown as any[])
          : (initialData as unknown as any[]);

      const initialIsSameAsMapped =
        JSON.stringify(initialDataMapped) === JSON.stringify(mapped);

      const dataMapped = initialIsSameAsMapped ? initialDataMapped : mapped;

      return dataMapped.flatMap((item, index) => {
        if (!item) return null;

        const args = ListerItem.itemArgs;
        const argsObject = args.reduce((acc, arg) => {
          acc[arg] = item;
          return acc;
        }, {} as any);

        return <ListerItem.component {...argsObject} key={index} />;
      });
    },
    (prev, next) => {
      const stringPrev = JSON.stringify(prev);
      const stringNext = JSON.stringify(next);
      return stringPrev === stringNext;
    },
  );
  DataMapper.displayName = "DataMapper";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        className,
      )}
    >
      <DataMapper x={data} />
      <div className="flex flex-col items-center">
        <span className="flex w-full max-w-[300px] text-balance text-sm font-light">
          {`Last updated: ${Intl.DateTimeFormat("en-US", {
            dateStyle: "short",
            timeStyle: "medium",
          }).format(lastFetchedAt)}`}
        </span>
      </div>
    </div>
  );
};

export default ClientListerRefreshing;
