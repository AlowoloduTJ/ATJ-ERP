"use client";

import { Card } from "@/components/ui/card";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
}

export default function Table<T extends Record<string, any>>({
  data,
  columns,
  isLoading = false,
}: TableProps<T>) {
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((column) => (
                <th key={String(column.key)} className="px-4 py-2 text-left text-sm font-medium">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-2 text-sm">
                    {column.render
                      ? column.render(item)
                      : String(item[column.key as keyof T] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
