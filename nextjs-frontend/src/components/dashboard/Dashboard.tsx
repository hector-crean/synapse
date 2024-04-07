import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, useMemo } from "react";
import { DocumentViewer } from "./DocumentViewer";
import { Header } from "./Header";
import { DocumentFilter, RoomsQueryResult } from "./types";

interface DashboardProps {
  rooms: RoomsQueryResult;
  filter: Array<DocumentFilter>;
}
const Dashboard = ({ rooms, filter }: DashboardProps) => {
  const docFilter = useMemo(() => filter?.[0] ?? "all", [filter]);

  const filteredRooms = useMemo(
    () => ({ ...rooms, data: rooms.data }),
    [rooms, docFilter]
  );

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        {/* <Aside /> */}
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header filter={docFilter} />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Suspense>
              <DocumentViewer rooms={filteredRooms} filter={docFilter} />
            </Suspense>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export { Dashboard };
export default Dashboard;
