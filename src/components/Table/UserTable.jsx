import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'store/themeConfigSlice';
import Tippy from '@tippyjs/react';
import { GrEdit } from 'react-icons/gr';
import { FaFileCsv } from 'react-icons/fa';
import { AiFillPrinter } from 'react-icons/ai';
import { BiImport } from 'react-icons/bi';
import { useRouter } from 'next/router';
import DefaultButtonComponent from '../Button/DefaultButtonComponent';
import IconButton from '../Button/IconButtonComponent';

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

const col = ['id', 'username', 'email', 'phone', 'isActive', 'Roles', 'email', 'phone'];


// Define the DefaultTable component
const UserTable = () => {
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

  const navToPage = (id) => {
    router.push(`/admin/roles-and-permissions/edit/${id}`)
  }

  useEffect(() => {
    setInitialRecords(() => {
      return rowData.filter((item) => {
        return (
          item.id.toString().includes(search.toLowerCase()) ||
          item.username.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.phone.toLowerCase().includes(search.toLowerCase()) ||
          item.Roles.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [search]);

  const exportTable = (type) => {
    const columns = col;
    const records = rowData;
    const filename = 'table';

    const newVariable = window.navigator;

    if (type === 'csv') {
        const coldelimiter = ';';
        const linedelimiter = '\n';
        let result = columns
            .map((d) => {
                return d;
            })
            .join(coldelimiter);
        result += linedelimiter;
        records.map((item) => {
            columns.map((d, index) => {
                if (index > 0) {
                    result += coldelimiter;
                }
                const val = item[d] ? item[d] : '';
                result += val;
            });
            result += linedelimiter;
        });

        if (result == null) return;
        if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
            const data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
            const link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', `${filename}.csv`);
            link.click();
        } else {
            const blob = new Blob([result]);
            if (newVariable.msSaveOrOpenBlob) {
                newVariable.msSaveBlob(blob, `${filename}.csv`);
            }
        }
    } else if (type === 'print') {
        let rowhtml = `<p>${filename}</p>`;
        rowhtml +=
            `<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> `;
        columns.map((d) => {
            rowhtml += `<th>${d}</th>`;
        });
        rowhtml += '</tr></thead>';
        rowhtml += '<tbody>';
        records.map((item) => {
            rowhtml += '<tr>';
            columns.map((d) => {
                const val = item[d] ? item[d] : '';
                rowhtml += `<td>${val}</td>`;
            });
            rowhtml += '</tr>';
        });
        rowhtml +=
            '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}User table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
        rowhtml += '</tbody></table>';
        const winPrint = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
        winPrint.document.write(`<title>Print</title>${rowhtml}`);
        winPrint.document.close();
        winPrint.focus();
        winPrint.print();
    } else if (type === 'txt') {
        const coldelimiter = ',';
        const linedelimiter = '\n';
        let result = columns
            .map((d) => {
                return d;
            })
            .join(coldelimiter);
        result += linedelimiter;
        records.map((item) => {
            columns.map((d, index) => {
                if (index > 0) {
                    result += coldelimiter;
                }
                const val = item[d] ? item[d] : '';
                result += val;
            });
            result += linedelimiter;
        });

        if (result == null) return;
        if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
            const data1 = 'data:application/txt;charset=utf-8,' + encodeURIComponent(result);
            const link1 = document.createElement('a');
            link1.setAttribute('href', data1);
            link1.setAttribute('download', `${filename}.txt`);
            link1.click();
        } else {
            const blob1 = new Blob([result]);
            if (newVariable.msSaveOrOpenBlob) {
                newVariable.msSaveBlob(blob1, `${filename}.txt`);
            }
        }
    }
};



const navToAddPage = () => {
  router.push('/admin/users/create')
}

  return (
    <div>
      <div className="panel mt-6">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <div className="ltl:ml-auto rtl:mr-auto">
            <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="ltl:ml-auto rtl:mr-auto">
            <IconButton icon={<FaFileCsv />} label="CSV" />
          </div>
          <div className="ltl:ml-auto rtl:mr-auto">
            <IconButton onClick={() => exportTable('print')} icon={<AiFillPrinter />} label="PRINT" />
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
          <IconButton icon={<BiImport />} label="IMPORT" />
          </div>
          <div className="ltr rtl:mr-auto">
            <DefaultButtonComponent onClick={navToAddPage} title="Add User" />
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
                  render: ({ id }) => (
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

export default UserTable;
