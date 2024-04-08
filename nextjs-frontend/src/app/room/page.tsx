import { getDocuments } from "@/lib/client/documents/getDocuments";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getDocuments({}),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (data.data) {
    return <div>{JSON.stringify(data.data)}</div>;
  } else {
    return <div>No data</div>;
  }
};

export default Page;
