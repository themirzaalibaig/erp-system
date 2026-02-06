"use client"
// Example data and columns
import DataTable from '@/components/table/DataTable'
import { ColumnDef } from '@tanstack/react-table'

interface Person {
	id: number;
	name: string;
	age: number;
	date: string;
}

const columns: ColumnDef<Person>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: true,
		enableSorting: true,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
		enableSorting: true,
	},
	{
		accessorKey: 'age',
		header: 'Age',
		enableColumnFilter: true,
		enableSorting: true,
	},
	{
		accessorKey: 'date',
		header: 'Date',
		enableColumnFilter: true,
		enableSorting: true,
	},
];

const data: Person[] = [
	{ id: 1, name: 'John Doe', age: 30, date: '2025-05-20' },
	{ id: 2, name: 'Jane Smith', age: 25, date: '2025-05-21' },
];

const Page = () => {
	return (
		<div>
			<DataTable
				columns={columns}
				data={data}
				defaultPageSize={5}
				isLoading={false}
				onCreate={() => alert('Create new record')}
				title="Customers"
				breadcrumb={[
					{ label: 'Home', href: '/' },
					{ label: 'Customers', href: '/customers' },
				]}
			/>
		</div>
	)
}

export default Page