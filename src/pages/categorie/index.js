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
import { CategorieMoreMenu, CategorieListToolbar } from '../../components/_dashboard/categorie';

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

export default function Agence() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [categorieTab, setCategorieTab] = useState([]);
  const [categorieindexInput, setCategorieIndexInput] = useState('');
  const [categorienameInput, setCategorieNameInput] = useState('');

  const [dataChange, setDataChange] = useState(false);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/categorie/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setCategorieTab(value.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/categorie/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setCategorieTab(value.data);
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

  const addCategorie = (categorieindexInput, categorienameInput) => {
    if (categorieindexInput !== '' && categorieindexInput !== null && categorienameInput !== '')
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/categorie/`,
          { index: categorieindexInput, name: categorienameInput },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
            }
          }
        )
        .then(() => {
          isDataChange();
          handleClose();

          setCategorieIndexInput('');
          setCategorieNameInput('');
        })
        .catch(() => {
          setCategorieIndexInput('');
          setCategorieNameInput('');
        });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = setCategorieTab.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - setCategorieTab.length) : 0;

  const filteredCategorie = applySortFilter(
    categorieTab,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredCategorie.length === 0;

  return (
    <Page title="Categorie | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Categorie
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => handleOpen()}
          >
            Nouvelle Categorie
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
              <h2 id="simple-modal-title">Ajouter une Categorie</h2>
              <TextField
                label="Saisissez l'Index"
                variant="outlined"
                style={{ marginTop: 20, marginBottom: 20 }}
                value={categorieindexInput}
                onChange={(e) => setCategorieIndexInput(e.target.value)}
              />
              <TextField
                label="Saisissez le Nom"
                variant="outlined"
                style={{ marginTop: 20, marginBottom: 20 }}
                value={categorienameInput}
                onChange={(e) => setCategorieNameInput(e.target.value)}
              />
              <Button
                onClick={() => addCategorie(categorieindexInput, categorienameInput)}
                variant="contained"
                startIcon={<Icon icon={plusFill} />}
              >
                Ajouter
              </Button>
            </div>
          </Modal>
        ) : null}

        <Card>
          <CategorieListToolbar
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
                  rowCount={setCategorieTab.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCategorie
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
                            <CategorieMoreMenu
                              idCategorie={id}
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
            count={setCategorieTab.length}
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
