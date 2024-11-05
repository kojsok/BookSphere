import Link from "next/link";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "../ui/pagination";
import { cn } from "@/lib/utils";

interface IPaginateProps {
  currentPage: number,
  totalRows: number | null,
}

const Paginate = ({ currentPage, totalRows }: IPaginateProps) => {
  const pagesCount = totalRows ? Math.ceil(totalRows / 5) : 1
  let prev = currentPage - 1
  let next = currentPage + 1;
  if (prev < 0) prev = 0
  if (next === pagesCount) next -= 1
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Link href={`?page=${prev}`} passHref legacyBehavior>
            <PaginationPrevious />
          </Link>
        </PaginationItem>
        {Array.from({ length: pagesCount }, (_, i) => {
          const isActive = currentPage === i
          return (<PaginationItem key={i}>
            <Link href={`?page=${i}`} passHref legacyBehavior >
              <PaginationLink
                isActive={isActive}
                className={cn(isActive ? 'border-primary' : 'border')}
              >
                {i + 1}
              </PaginationLink>
            </Link>
          </PaginationItem>)
        })}
        <PaginationItem>
          <Link href={`?page=${next}`} passHref legacyBehavior>
            <PaginationNext />
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Paginate;