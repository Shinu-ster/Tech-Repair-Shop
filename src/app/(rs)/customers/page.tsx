import CustomerSearch from "@/app/(rs)/customers/CustomerSearch"
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults"
import * as Sentry from "@sentry/nextjs"
import CustomerTable from "@/app/(rs)/customers/CustomerTable"


export const metadata = {
    title:"Customers"
}

type paramsType = Promise<{ [key:string]: string | undefined}>;

export default async function Customers({
  searchParams,
}: {
  searchParams: paramsType;
}){
  const resolvedParams = await searchParams;

  // Then get searchText safely
  const searchText = resolvedParams?.searchText ?? "";

  if (!searchText) return <CustomerSearch />;

  const span = Sentry.startInactiveSpan({
    name:'getCustomerSearchResults-2'
  })

  const results = await getCustomerSearchResults(searchText);
  span.end()

  return (
    <>
      <CustomerSearch />
      {results.length ? <CustomerTable data={results}/> :(
        <p className="mt-4">No Results found</p>
      )}
    </>
  );
}
