import TicketTable from "@/app/(rs)/tickets/TicketTable";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import TicketSearch from "./TicketSearch";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";

export const metadata = {
  title: "Customers",
};

type paramsType = Promise<{ [key: string]: string | undefined }>;

export default async function Tickets({
  searchParams,
}: {
  searchParams: paramsType;
}) {
  const {searchText} = await searchParams;

  if (!searchText) {
    const results = await getOpenTickets();
    return (
      <>
        <TicketSearch />
        {results.length ? (
          <TicketTable data={results} />
        ) : (
          <p className="mt-4">No Results found</p>
        )}
      </>
    );
  }

  const results = await getTicketSearchResults(searchText);

  return (
    <>
      <TicketSearch />
      {results.length ? (
        <TicketTable data={results} />
      ) : (
        <p className="mt-4">No Results found</p>
      )}
    </>
  );
}
