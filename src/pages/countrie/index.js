import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField
} from '@material-ui/core';

// Modal Importations
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead } from '../../components/_dashboard/user';
import { CountrieListToolbar, CountrieMoreMenu } from '../../components/_dashboard/countrie';

// import { numberValidation } from '../../utils/validate';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'index', label: 'Index', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function Countrie() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [countrieTab, setCountrieTab] = useState([]);
  const [countrieindexInput, setCountrieIndexInput] = useState('');
  const [countrienameInput, setCountrieNameInput] = useState('');

  const [dataChange, setDataChange] = useState(false);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/countrie/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setCountrieTab(value.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/countrie/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setCountrieTab(value.data);
      })
      .catch(() => {});
  }, [dataChange]);

  const isDataChange = () => {
    if (dataChange) {
      setDataChange(false);
    } else {
      setDataChange(true);
    }
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const addCountrie = (countrieindexInput, countrienameInput) => {
    if (countrieindexInput !== '' && countrieindexInput !== null && countrienameInput !== '')
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/countrie/`,
          { index: countrieindexInput, name: countrienameInput },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
            }
          }
        )
        .then(() => {
          isDataChange();
          handleClose();

          setCountrieIndexInput('');
          setCountrieNameInput('');
        })
        .catch(() => {
          setCountrieIndexInput('');
          setCountrieNameInput('');
        });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = setCountrieTab.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - setCountrieTab.length) : 0;

  const filteredCountrie = applySortFilter(countrieTab, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredCountrie.length === 0;

  return (
    <Page title="Countrie | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Pays
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => handleOpen()}
          >
            Nouveau Pays
          </Button>
        </Stack>

        {openModal ? (
          <Modal
            aria-describedby="simple-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleClose}
          >
            <div className={classes.paper}>
              <h2 id="simple-modal-title">Ajouter un Pays</h2>
              <TextField
                label="Saisissez l'Index"
                variant="outlined"
                style={{ marginTop: 20, marginBottom: 20 }}
                value={countrieindexInput}
                onChange={(e) => setCountrieIndexInput(e.target.value)}
              />
              <TextField
                label="Saisissez le Nom"
                variant="outlined"
                style={{ marginTop: 20, marginBottom: 20 }}
                value={countrienameInput}
                onChange={(e) => setCountrieNameInput(e.target.value)}
              />
              <Button
                onClick={() => addCountrie(countrieindexInput, countrienameInput)}
                variant="contained"
                startIcon={<Icon icon={plusFill} />}
              >
                Ajouter
              </Button>
            </div>
          </Modal>
        ) : null}

        <Card>
          <CountrieListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={setCountrieTab.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCountrie
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, index, name } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {index}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="right">
                            <CountrieMoreMenu
                              idCountrie={id}
                              sendInformation={(value) => isDataChange(value)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={setCountrieTab.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
