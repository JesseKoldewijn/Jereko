import { type ClientListItems } from "./_helpers/ClientItems";
import ClientListerRefreshing from "./_helpers/ClientLister";
import { ClientWrapper } from "./_helpers/ClientWrapper";

export type RefreshingListProps<T> = {
  actionFunction: () => Promise<T>;
  queryKey: string[];
  listerItemName: keyof typeof ClientListItems;
  listerItemArrayPointer?: string;
  showRefrashedAt?: boolean;
  emptyListMessage?: string;
  lastFetchAt?: Date;
  ssr?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

export const RefreshingList = async <T,>({
  actionFunction,
  queryKey,
  showRefrashedAt,
  emptyListMessage,
  ssr,
  lastFetchAt = new Date(),
  className,
  ...rest
}: RefreshingListProps<T>) => {
  // Early return if no actionFunction
  if (!actionFunction) null;

  // Only fetch data on server side rendering when ssr is true
  const initialData = ssr ? await actionFunction() : undefined;
  const lastFetchTs = lastFetchAt ?? new Date();

  // All props to be shared between lazy and non-lazy components
  const sharedProps = {
    actionFunction,
    queryKey,
    initialData,
    showRefrashedAt,
    emptyListMessage,
    ssr,
    lastFetchAt: lastFetchTs,
    className,
    ...rest,
  };

  return (
    <ClientWrapper>
      <ListComponent {...sharedProps} />
    </ClientWrapper>
  );
};

const ListComponent = <T,>(
  props: RefreshingListProps<T> & {
    initialData: T | undefined;
  },
) => {
  return <ClientListerRefreshing {...props} />;
};
