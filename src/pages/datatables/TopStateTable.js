import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const rowData = [
    {
        id: 1,
        LoanNo: '65656565',
        ApplicationNo: 'BABBB122',
        Bank: 'BOB',
        BranchIFSC : 'BARB0OPROA',
        AccountOpen : '10/01/2000'
    },
    {
        id: 2,
        LoanNo: '65656566',
        ApplicationNo: 'BABBB123',
        Bank: 'BOB',
        BranchIFSC : 'BARB0OPROA',
        AccountOpen : '10/01/2001'
    },
    {
        id: 3,
        LoanNo: '65656567',
        ApplicationNo: 'BABBB155',
        Bank: 'BOB',
        BranchIFSC : 'BARB0OPROA',
        AccountOpen : '10/01/2005'
    },
    {
        id: 4,
        LoanNo: '65656568',
        ApplicationNo: 'BABBB170',
        Bank: 'BOB',
        BranchIFSC : 'BARB0OPROA',
        AccountOpen : '10/01/2010'
    },
];

const TopStateTable = () => {
    const router = useRouter()
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

    // Function to handle click events
    const handleRowClicked = (row) => {
        // Assuming the row data contains an "id" property
        if (row && row.id) {
            setClickedItemId(row.id);
            router.push(`/Beneficiary/${userId}/${row.id}`);

            //
        };



    }
    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.LoanNo.toLowerCase().includes(search.toLowerCase()) ||
                    item.ApplicationNo.toLowerCase().includes(search.toLowerCase()) ||
                    item.Bank.toLowerCase().includes(search.toLowerCase()) ||
                    item.BranchIFSC.toLowerCase().includes(search.toLowerCase()) ||
                    item.AccountOpen.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    // function for adding bank details

    // const AddBankDetails = () =>{
    //     const { userId, BeneficiaryId } = router.query;
    //     router.push({
    //         pathname: `/Beneficiary/${userId}/${BeneficiaryId}`,
    //         query: { title: 'Add Bank Account Details' },
    //       });
    // }
    return (

        <div>
            <div className="panel mt-6">
                <h5 className="text-lg font-semibold dark:text-white-light mb-5">Top 10 State</h5>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className={`${isRtl ? 'table-hover whitespace-nowrap' : 'table-hover whitespace-nowrap'}`}
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID', sortable: true },
                            { accessor: 'LoanNo', title: 'State', sortable: true },
                            { accessor: 'ApplicationNo', title: 'District', sortable: true },
                            { accessor: 'Bank', title : 'Rejected' , sortable: true },
                            { accessor: 'BranchIFSC', title : 'Disbursed ' , sortable: true },
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

export default TopStateTable;
