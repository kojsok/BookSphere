import Link from "next/link";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "../ui/pagination";
import { cn } from "@/lib/utils";

interface IPaginateProps {
  currentPage: number,
  totalRows: number | null,
  rowsPerPage?: number
}
/**
 * Pagination component that handles the navigation between pages for a given data set.
 * It accepts the current page, the total number of rows, and an optional number of rows per page 
 * to calculate the total number of pages, and renders pagination controls accordingly.
 * 
 * @param {number} currentPage - The current page number.
 * @param {number | null} totalRows - The total number of rows in the dataset. 
 * @param {number} [rowsPerPage=5] - The number of rows per page. Defaults to 5 if not provided.
 * 
 * @returns {JSX.Element} Pagination controls that allow navigating between pages.
 * 
 * @example
 * ```tsx
 * <Paginate currentPage={1} totalRows={100} rowsPerPage={10} />
 * ```
 */
const Paginate = ({ currentPage, totalRows, rowsPerPage = 5 }: IPaginateProps): JSX.Element => {
  const pagesCount = totalRows ? Math.ceil(totalRows / rowsPerPage) : 1
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