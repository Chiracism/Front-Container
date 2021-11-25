import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

// Material UI Component
import { Card, Stack, Container, Typography, Autocomplete } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import Date from '@material-ui/core/Date';
import { DatePicker } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

import ReactToPrint from 'react-to-print';
import ComponentToPrintMouv from './ComponentToPrintMouv';

import './Mouvement.css';
import { numberValidation } from '../../utils/validate';

// components
import Page from '../../components/Page';
import { CheckUserAuth } from '../../utils/auth';

// ----------------------------------------------------------------------

export default function Mouvement() {
  const componentRef = useRef();
  const [user, setUser] = useState(null);
  const [blNumb, setBlNumb] = useState('');
  const [fileNumb, setFileNumb] = useState('');
  const [send, setSend] = useState('');
  // for Mouvement
  // const [mouvnumberInput, setMouvNumberInput] = useState('');
  // const [mouvsiteInput, setMouvSiteInput] = useState('');
  // const [mouvsoussiteInput, setMouvSoussiteInput] = useState('');
  const [mouvdatemouvInput, setMouvDateMouvInput] = useState('');
  // const [mouvnavireInput, setMouvNavireInput] = useState('');
  const [mouvdatearriveeInput, setMouvDateArriveeInput] = useState('');
  // const [mouvportInput, setMouvPortInput] = useState('');
  // const [mouvclientInput, setMouvClientInput] = useState('');
  // const [mouvetatInput, setMouvEtatInput] = useState('');
  // const [mouvtypeInput, setMouvTypeInput] = useState('');
  // const [mouvsizeInput, setMouvSizeInput] = useState('');
  const [mouvnombreInput, setMouvNombreInput] = useState('');
  const [mouvobservationInput, setMouvObservationInput] = useState('');
  const [masterdatemouv, setMasterDateMouv] = useState('');

  const reloadPage = () => {
    window.location.reload();
  };

  function disabledPrint() {
    if (mouvnumberInput !== '' && mouvnumberInput !== null) return false;
    return true;
  }

  // Print Facture
  function printFacture() {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mouvement/`,
        {
          number: mouvnumberInput,
          site: mouvsiteInput,
          sous_site: mouvsoussiteInput,
          date_mouvement: mouvdatemouvInput,
          ex_navire: mouvnavireInput,
          date_arrivee: mouvdatearriveeInput,
          port: mouvportInput,
          client: mouvclientInput,
          etat_conteneur: mouvetatInput,
          type_conteneur: mouvtypeInput,
          size: mouvsizeInput,
          nombre_conteneur: mouvnombreInput,
          observation: mouvobservationInput,
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

  /**
   * Informations for MasterFile
   */
  const [mouvementTab, setMouvementTab] = useState([]);
  const [mouvnumberInput, setMouvNumberInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/masterfile/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvementTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Type
   */
  const [mouvtypeTab, setMouvTypeTab] = useState([]);
  const [mouvtypeInput, setMouvTypeInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/type/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvTypeTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Port
   */
  const [mouvportTab, setMouvPortTab] = useState([]);
  const [mouvportInput, setMouvPortInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/port/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvPortTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Taille
   */
  const [mouvsizeTab, setMouvSizeTab] = useState([]);
  const [mouvsizeInput, setMouvSizeInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/size/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvSizeTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Navire
   */
  const [mouvnavireTab, setMouvNavireTab] = useState([]);
  const [mouvnavireInput, setMouvNavireInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/navire/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvNavireTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Etat Conteneur
   */
  const [mouvetatTab, setMouvEtatTab] = useState([]);
  const [mouvetatInput, setMouvEtatInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/etat_conteneur/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvEtatTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Site
   */
  const [mouvsiteTab, setMouvSiteTab] = useState([]);
  const [mouvsiteInput, setMouvSiteInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/site/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvSiteTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Sous-Site
   */
  const [mouvsoussiteTab, setMouvSoussiteTab] = useState([]);
  const [mouvsoussiteInput, setMouvSoussiteInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/soussite/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvSoussiteTab(value.data);
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
    <Page title="Mouvement | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Mouvement
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
                options={mouvementTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setMouvNumberInput(newType.number);
                  } else {
                    setMouvNumberInput(null);
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
              Site:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={mouvsiteTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setMouvSiteInput(newType.name);
                  } else {
                    setMouvSiteInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner un Site" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Date Arrviee:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez la date de mouvement"
                type="date"
                variant="outlined"
                value={mouvdatearriveeInput}
                onChange={(e) => {
                  setMouvDateArriveeInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Client:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={mouvclientTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setMouvClientInput(newType.name);
                  } else {
                    setMouvClientInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner un Client" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Type:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={mouvtypeTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setMouvTypeInput(newType.name);
                  } else {
                    setMouvTypeInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sélectionner l'Etat de Conteneur"
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Etat:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={mouvetatTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setMouvEtatInput(newType.name);
                  } else {
                    setMouvEtatInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sélectionner l'Etat de Conteneur"
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Date Mouv.:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez la date de mouvement"
                type="date"
                variant="outlined"
                value={mouvdatemouvInput}
                onChange={(e) => {
                  setMouvDateMouvInput(e.target.value);
                }}
              />
            </div>
          </Box>
          <Box className="box-2-wrapper">
            <div className="input-label-wrapper">
              Sous-site:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={mouvsoussiteTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setMouvSoussiteInput(newType.name);
                  } else {
                    setMouvSoussiteInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner le Sous-site" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Navire:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={mouvnavireTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setMouvNavireInput(newType.name);
                  } else {
                    setMouvNavireInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner le navire" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Port:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={mouvportTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setMouvPortInput(newType.name);
                  } else {
                    setMouvPortInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner le port" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Taille:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={mouvsizeTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setMouvSizeInput(newType.name);
                  } else {
                    setMouvSizeInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner la Taille" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-3-wrapper">
              Nombre:{' '}
              <TextField
                className="basic-input"
                label="Saisissez le nombre"
                variant="outlined"
                value={mouvnombreInput}
                onChange={(e) => {
                  setMouvNombreInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Observation.:{' '}
              <TextField
                className="basic-input"
                label="Commentaires..."
                variant="outlined"
                value={mouvobservationInput}
                onChange={(e) => {
                  setMouvObservationInput(e.target.value);
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
            <ComponentToPrintMouv
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
