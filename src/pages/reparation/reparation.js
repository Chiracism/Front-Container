import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

// Material UI Component
import { Card, Stack, Container, Typography, Autocomplete } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import Date from '@material-ui/core/Date';
// import { DatePicker } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

import ReactToPrint from 'react-to-print';
import ComponentToPrintRepara from './ComponentToPrintRepara';

import './Reparation.css';
import { numberValidation } from '../../utils/validate';

// components
import Page from '../../components/Page';
import { CheckUserAuth } from '../../utils/auth';

// ----------------------------------------------------------------------

export default function Reparation() {
  const componentRef = useRef();
  const [user, setUser] = useState(null);
  const [blNumb, setBlNumb] = useState('');
  const [fileNumb, setFileNumb] = useState('');
  const [send, setSend] = useState('');
  //   for Réparation
  //   const [reparanumeroInput, setReparaNumeroInput] = useState('');
  const [reparadatereparaInput, setReparaDateReparaInput] = useState('');
  const [reparaheureInput, setReparaHeureInput] = useState(0);
  // const [reparamaterielInput, setReparaMaterielInput] = useState('');
  const [reparatotal, setReparaTotal] = useState(0);
  const [repararecuInput, setReparaRecuInput] = useState('');
  const [reparasocrepInput, setReparaSocRepInput] = useState('');
  const [reparasoclocInput, setReparaSocLocInput] = useState('');
  // const [reparasiteInput, setReparaSiteInput] = useState('');
  const [reparadateinspInput, setReparaDateInspInput] = useState('');
  const [reparasocieteInput, setReparaSocieteInput] = useState('');

  const reloadPage = () => {
    window.location.reload();
  };

  function disabledPrint() {
    if (reparanumeroInput !== '' && reparanumeroInput !== null) return false;
    return true;
  }

  // Print Facture
  function printFacture() {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/reparation/`,
        {
          numero: reparanumeroInput,
          date_derniere_reparation: reparadatereparaInput,
          type_conteneur: reparatypeInput,
          taille_conteneur: reparatailleInput,
          proprietaire_id: reparaownerInput,
          pays_name: reparapaysInput,
          taux: reparatauxInput,
          heure: reparaheureInput,
          materiel_id: reparamaterielInput,
          total: reparatotal,
          numero_recu: repararecuInput,
          societe_reparation: reparasocrepInput,
          societe_location: reparasoclocInput,
          site: reparasiteInput,
          date_derniere_inspection: reparadateinspInput,
          societe: reparasocieteInput,
          date: new Date()
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
          }
        }
      )
      .then(() => {})
      .catch(() => {});
  }

  // useEffect(() => {
  //   setReparaTauxInput(reparatauxInput * reparaheureInput);
  // }, [reparatauxInput, reparaheureInput]);

  /**
   * Informations for MasterFile
   */
  const [reparationTab, setReparationTab] = useState([]);
  const [reparanumeroInput, setReparaNumeroInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/masterfile/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparationTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Type
   */
  const [reparationtypeTab, setReparationTypeTab] = useState([]);
  const [reparatypeInput, setReparaTypeInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/type/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparationTypeTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Proprietaire
   */
  const [reparaownerTab, setReparaOwnerTab] = useState([]);
  const [reparaownerInput, setReparaOwnerInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/owner/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparaOwnerTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Countrie
   */

  const [reparapaysTab, setReparaPaysTab] = useState([]);
  const [reparapaysInput, setReparaPaysInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/countrie/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparaPaysTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Taille
   */
  const [reparatailleTab, setReparaTailleTab] = useState([]);
  const [reparatailleInput, setReparaTailleInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/size/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparaTailleTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Taux
   */
  const [reparatauxTab, setReparaTauxTab] = useState('');
  const [reparatauxInput, setReparaTauxInput] = useState('');

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/rate/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparaTauxTab(value.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setReparaTotal(reparatauxInput * reparaheureInput);
  }, [reparatauxInput, reparaheureInput]);

  const [reparataux, setReparaTaux] = useState(0);
  const [reparaheure, setReparaHeure] = useState(0);

  /**
   * Informations for Materiel
   */
  const [reparamaterielTab, setReparaMaterielTab] = useState([]);
  const [reparamaterielInput, setReparaMaterielInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/materiel/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparaMaterielTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Site
   */
  const [reparasiteTab, setReparaSiteTab] = useState([]);
  const [reparasiteInput, setReparaSiteInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/site/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparaSiteTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Client
   */
  const [mouvclientTab, setMouvClientTab] = useState([]);
  const [mouvclientInput, setMouvClientInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/client/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvClientTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Table
   */

  useEffect(() => {
    // Get User Auth
    const tokenData = localStorage.getItem('lmc_token');

    if (tokenData) {
      const user = jwt.verify(JSON.parse(tokenData), process.env.REACT_APP_JWT_KEY);

      setUser(user);
    }
  }, []);

  function renderText(number) {
    if (number === 1) {
      return 'CONVENTIONNEL < 50 T :';
    }

    if (number === 2) {
      return 'CONVENTIONNEL > 50 T < 500 T :';
    }

    if (number === 3) {
      return '16%';
    }

    if (number === 4) {
      return '10%';
    }

    return '';
  }

  return (
    <Page title="Reparation | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Réparation
          </Typography>
          <Box>
            <Button variant="contained" color="primary" onClick={() => reloadPage()}>
              Rafraîchir
            </Button>
          </Box>
        </Stack>

        <CheckUserAuth />

        <Card className="card-wrapper">
          <Box className="box-wrapper">
            <div className="input-label-wrapper">
              N° Conteneur:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={reparationTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setReparaNumeroInput(newType.number);
                  } else {
                    setReparaNumeroInput(null);
                  }
                }}
                getOptionLabel={(option) => option.number}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner le numero" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Date Réparation.:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez la date de reparation"
                type="date"
                variant="outlined"
                value={reparadatereparaInput}
                onChange={(e) => {
                  setReparaDateReparaInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Type:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={reparationtypeTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setReparaTypeInput(newType.name);
                  } else {
                    setReparaTypeInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner le Type" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Propriétaire:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={reparaownerTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setReparaOwnerInput(newType.name);
                  } else {
                    setReparaOwnerInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner le Propriétaire" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Taux:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={reparatauxTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setReparaTauxInput(newType.amount);
                  } else {
                    setReparaTauxInput(null);
                  }
                }}
                getOptionLabel={(option) => option.amount}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner le taux" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Materiel:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={reparamaterielTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setReparaMaterielInput(newType.name);
                  } else {
                    setReparaMaterielInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner le matériel" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Société Rép.:{' '}
              <TextField
                className="basic-input"
                label="Saisissez le nom de la societe"
                variant="outlined"
                value={reparasocrepInput}
                onChange={(e) => {
                  setReparaSocRepInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Location:{' '}
              <TextField
                className="basic-input"
                label="Saisissez l'adresse de la Société"
                variant="outlined"
                value={reparasoclocInput}
                onChange={(e) => {
                  setReparaSocLocInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Date Insp.:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez la Date"
                type="date"
                variant="outlined"
                value={reparadateinspInput}
                onChange={(e) => {
                  setReparaDateInspInput(e.target.value);
                }}
              />
            </div>
          </Box>
          <Box className="box-2-wrapper">
            <div className="input-label-wrapper">
              Taille:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={reparatailleTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setReparaTailleInput(newType.name);
                  } else {
                    setReparaTailleInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner la Taille" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Pays:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={reparapaysTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setReparaPaysInput(newType.name);
                  } else {
                    setReparaPaysInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner le Pays" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-3-wrapper">
              Nombre Heure:{' '}
              <TextField
                className="basic-input"
                label="Saisissez le nomre d'heure"
                variant="outlined"
                value={reparaheureInput}
                onChange={(e) => {
                  setReparaHeureInput(e.target.value);
                }}
              />
            </div>

            <div className="input-label-wrapper">
              Total:{' '}
              <TextField
                className="basic-input"
                label="Saisissez la date de r"
                variant="outlined"
                value={reparatotal}
                // onChange={(e) => {
                //   setReparaTotalInput(e.target.value);
                // }}
              />
            </div>

            <div className="input-label-wrapper">
              Réçu.:{' '}
              <TextField
                className="basic-input"
                label="Saisissez le numero"
                variant="outlined"
                value={repararecuInput}
                onChange={(e) => {
                  setReparaRecuInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Site:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={reparasiteTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setReparaSiteInput(newType.name);
                  } else {
                    setReparaSiteInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner le Site" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Société:{' '}
              <TextField
                className="basic-input"
                label="Saisissez la Société"
                variant="outlined"
                value={reparasocieteInput}
                onChange={(e) => {
                  setReparaSocieteInput(e.target.value);
                }}
              />
            </div>
          </Box>
        </Card>

        <Card className="import-card-wrapper"> </Card>

        <Card className="card-botton-2-wrapper">
          <div>
            <ReactToPrint
              trigger={() => (
                <Button variant="contained" color="primary" disabled={disabledPrint()}>
                  Print & Save
                </Button>
              )}
              content={() => componentRef.current}
              suppressErrors
              onAfterPrint={() => printFacture()}
            />
            <ComponentToPrintRepara
              ref={componentRef}
              client={mouvclientInput}
              // total={}
              rows={[]}
            />
          </div>
        </Card>
      </Container>
    </Page>
  );
}
