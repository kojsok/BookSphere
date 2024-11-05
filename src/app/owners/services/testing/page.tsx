import Paginate from "@/components/server/Paginate";
import { getRowsRange } from "@/lib/getRowsRange";
import { createClient } from "@/utils/supabase/server";
import { PageProps } from "@/utils/types/pageTypes";


const getCountAction = async (page: number) => {
  const { from, to } = getRowsRange(4, page)
  const supabase = createClient()
  const { count, data } = await supabase.from('services').select('*', { count: 'exact' }).range(from, to).order("created_at", { ascending: true });
  return { count, data }
}

const ServicesTest = async ({ searchParams }: PageProps) => {

  const current = searchParams.page ? Number(searchParams.page) : 0
  const { count, data } = await getCountAction(current)

  return (
    <div>

      this is services test
      <ul>
        {data?.map((el) => <li key={el.id}>{el.name}</li>)}
      </ul>
      <Paginate currentPage={current} totalRows={count} />
    </div>
  );
}

export default ServicesTest;