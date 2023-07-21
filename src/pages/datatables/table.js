import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const rowData = [
    {
        id: 1,
        BeneficiaryID: '1001',
        BeneficiaryName: 'Jensen',
        BeneficiaryType: 'Group',
    },
    {
        id: 2,
        BeneficiaryID: '1002',
        BeneficiaryName: 'kensen',
        BeneficiaryType: 'Indiviual',
    },
    {
        id: 3,
        BeneficiaryID: '1003',
        BeneficiaryName: 'Mackson',
        BeneficiaryType: 'Group',
    },
    {
        id: 4,
        BeneficiaryID: '1004',
        BeneficiaryName: 'Jackson',
        BeneficiaryType: 'Indiviual',
    },
];

const Table = () => {
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [clickedItemId, setClickedItemId] = useState(null);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState({
        columnAccessor: 'id',
        direction: 'asc',
    });
     
    const router = useRouter();
       // Function to handle click events
  const handleRowClicked = (row) => {
    // Assuming the row data contains an "id" property
    if (row && row.id) {
      setClickedItemId(row.id);
        router.push(`/Beneficiary/${row.id}`)
    }
  };
    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    item.lastName.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

 
    return (
        <div>
            <div className="panel mt-6">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <h5 className="text-lg font-semibold dark:text-white-light">Beneficiary Details</h5>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className={`${isRtl ? 'table-hover whitespace-nowrap' : 'table-hover whitespace-nowrap'}`}
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID', sortable: true },
                            { accessor: 'BeneficiaryID', title: 'Beneficiary ID', sortable: true },
                            { accessor: 'BeneficiaryName', title: 'Beneficiary Name', sortable: true },
                            { accessor: 'BeneficiaryType', title : 'Beneficiary Type' , sortable: true },
                        ]}
                        totalRecords={initialRecords.length}
                        onRowClick={handleRowClicked}
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
                      {clickedItemId && <p>Clicked Item ID: {clickedItemId}</p>}
                </div>
            </div>
        </div>
    );
};

export default Table;
