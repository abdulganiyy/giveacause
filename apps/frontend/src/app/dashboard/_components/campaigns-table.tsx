import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const formatCurrency = (amount: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(+amount);
};

type Campaign = {
  id: string;
  title: string;
  isActive: boolean;
  targetAmount: string;
  currentAmount: string;
  progress: string;
};

// export const data: Campaign[] = [
//   {
//     id: "728ed52f",
//     title: "Hospital Bills",
//     isActive: true,
//     progress: "240,000",
//   },
//   {
//     id: "928ed52f",
//     title: "Debt Repayment",
//     isActive: true,
//     progress: "140,000",
//   },
// ];

// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "isActive",
    header: "Status",
  },
  {
    accessorKey: "currentAmount",
    header: "Amount Raised",
    cell: ({ row }) => {
      const campaign = row.original;

      return <span>{formatCurrency(campaign.currentAmount)}</span>;
    },
  },
  {
    accessorKey: "targetAmount",
    header: "Target Amount",
    cell: ({ row }) => {
      const campaign = row.original;

      return <span>{formatCurrency(campaign.targetAmount)}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy campaign ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View campaign details</DropdownMenuItem>
            <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
            <DropdownMenuItem>Delete Campaign</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface DataTableProps<TData> {
  // columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function CampaignsTable({ data }: DataTableProps<any>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="">
      <h3 className="text-3xl mb-4">My Campaigns</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// const CampaignsTable = () => {
//   return <div>CampaignsTable</div>;
// };

// export default CampaignsTable;
