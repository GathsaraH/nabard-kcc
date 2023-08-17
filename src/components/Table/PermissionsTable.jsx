import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'store/themeConfigSlice';
import Tippy from '@tippyjs/react';
import { GrEdit } from 'react-icons/gr';
import { useRouter } from 'next/router';
import DefaultButtonComponent from '../Button/DefaultButtonComponent';

// Sample data for the DataTable
const rowData = [
    {
        id: 1,
        Name: 'Caroline',
        CreatedDate: '14 Apr 2022, 8:43 PM',
        isActive: true,
        AssignedTo: 'Bank Admin',
    },
    {
        id: 2,
        Name: 'Celeste',
        CreatedDate: '+1 (838) 515-3408',
        isActive: false,
        AssignedTo: 'Branch Admin',
    },
    {
        id: 3,
        Name: 'Celeste',
        CreatedDate: '+1 (838) 515-3408',
        isActive: false,
        AssignedTo: 'Branch Admin',
    },
];

// Define the DefaultTable component
const PermissionsTable = () => {
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
    const [search, setSearch] = useState('');



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

    useEffect(() => {
      setInitialRecords(() => {
          return rowData.filter((item) => {
              return (
                  item.id.toString().includes(search.toLowerCase()) ||
                  item.Name.toLowerCase().includes(search.toLowerCase()) ||
                  item.CreatedDate.toLowerCase().includes(search.toLowerCase()) ||
                  item.AssignedTo.toLowerCase().includes(search.toLowerCase())
              );
          });
      });
  }, [search]);

    const navToPage = (id) => {
        router.push(`/admin/roles-and-permissions/edit/${id}`)
    }


    return (
        <div>
            <div className="panel mt-6">
                {/* <h5 className="mb-5 text-lg font-semibold dark:text-white-light">User's list :</h5> */}
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <div className="ltl:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search permission" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                       <DefaultButtonComponent title="Add permission" />
                    </div>
                </div>
                <div className="datatables">
                    {isMounted && (
                        <DataTable
                            noRecordsText="No results match your search query"
                            highlightOnHover
                            className="table-hover whitespace-nowrap"
                            records={recordsData}
                            columns={[
                                {
                                    accessor: 'Name',
                                    title: 'Name',
                                    // sortable: true,
                                    render: ({ Name }) => (
                                        <div className="flex items-center gap-2">
                                            <div className="font-semibold">{Name}</div>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'AssignedTo',
                                    title: 'Assigned to',
                                    render: ({ AssignedTo }) => (
                                        <span className={`badge badge-outline-primary `}>{AssignedTo}</span>
                                    ),
                                },
                                {
                                    accessor: 'CreatedDate',
                                    title: 'Created Date',
                                    // sortable: true,
                                    render: ({ CreatedDate }) => (
                                      <div className="flex items-center gap-2">
                                            <div className="font-semibold">{CreatedDate}</div>
                                        </div>
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

export default PermissionsTable;
