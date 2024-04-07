import { liveblocks } from "@/app/api/liveblocks";

import { Dashboard } from "@/components/dashboard/Dashboard";

type DocumentFilter = "active" | "draft" | "archived";

type QueryParams = {
  params: {
    filter: Array<DocumentFilter>;
  };
};

const Page = async ({ params }: QueryParams) => {
  const rooms = await liveblocks.getRooms();
  return <Dashboard rooms={rooms} filter={params.filter} />;
};

export default Page;
