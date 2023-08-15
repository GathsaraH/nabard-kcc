import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'store/themeConfigSlice';
import Tippy from '@tippyjs/react';
import { GrEdit } from 'react-icons/gr';
import { useRouter } from 'next/router';

// Sample data for the DataTable
const rowData = [
    {
        id: 1,
        username: 'Caroline',
        email: 'carolinejensen@zidant.com',
        phone: '+1 (821) 447-3782',
        isActive: true,
        Roles: 'Bank Admin',
    },
    {
        id: 2,
        username: 'Celeste',
        email: 'celestegrant@polarax.com',
        phone: '+1 (838) 515-3408',
        isActive: false,
        Roles: 'Branch Admin',
    },
];

// Define the DefaultTable component
const DefaultTable = () => {
    // Initialize Redux dispatch
    const router = useRouter()
    const dispatch = useDispatch();
    // Update page title when the component mounts
    useEffect(() => {
        dispatch(setPageTitle('Advanced Table'));
    });

    // Define states for pagination and sorting
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [sortStatus, setSortStatus] = useState({
        columnAccessor: 'id',
        direction: 'asc',
    });
    // State to track component mount
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    });

    // Update the page number when the page size changes
    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    // Update the displayed records when the page or page size changes
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);


    // Update the records and sorting when the sort status changes
    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const navToPage = (id) => {
        router.push(`/admin/roles-and-permissions/edit/${id}`)
    }


    return (
        <div>
            <div className="panel mt-6">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h5 className="mb-5 text-lg font-semibold dark:text-white-light">User's list :</h5>
                <div className="datatables">
                    {isMounted && (
                        <DataTable
                            noRecordsText="No results match your search query"
                            highlightOnHover
                            className="table-hover whitespace-nowrap"
                            records={recordsData}
                            columns={[
                                {
                                    accessor: 'id',
                                    title: 'ID',
                                    sortable: true,
                                    render: ({ id }) => <strong className="text-info">{id}</strong>,
                                },
                                {
                                    accessor: 'firstName',
                                    title: 'User',
                                    // sortable: true,
                                    render: ({ username }) => (
                                        <div className="flex items-center gap-2">
                                            <div className="font-semibold">{username}</div>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'email',
                                    title: 'Email',
                                    // sortable: true,
                                    render: ({ email }) => (
                                        <a href={`mailto:${email}`} className="text-primary hover:underline">
                                            {email}
                                        </a>
                                    ),
                                },
                                {
                                    accessor: 'phone', title: 'Phone',
                                    // sortable: true 
                                },
                                {
                                    accessor: 'Roles',
                                    title: 'Roles',
                                    render: ({ Roles }) => (
                                        <span className={`badge badge-outline-primary `}>{Roles}</span>
                                    ),
                                },
                                {
                                    accessor: 'Actions',
                                    title: 'Actions',
                                    render: ({id}) => (
                                        <>
                                            <Tippy content="Edit">
                                                <button onClick={() => navToPage(id)} type="button">
                                                    {/* <svg>...</svg> */}
                                                    <GrEdit size={20} />
                                                </button>
                                            </Tippy>
                                        </>
                                    ),
                                },
                            ]}
                            totalRecords={initialRecords.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            sortStatus={sortStatus}
                            onSortStatusChange={setSortStatus}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DefaultTable;
