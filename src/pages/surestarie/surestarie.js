import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';

// Material UI Component
import { Card, Stack, Container, Typography, Autocomplete, select } from '@material-ui/core';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import Date from '@material-ui/core/Date';
import { DatePicker } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import { NoSimTwoTone, Today } from '@material-ui/icons';
import { now } from 'lodash';
import { date } from 'faker';

import ReactToPrint from 'react-to-print';
import ComponentToPrintSurest from './ComponentToPrintSurest';

import './Surestarie.css';
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
  // for Surestarie
  const [surestariedateInput, setSurestarieDateInput] = useState('');
  // const [surestarienumeroInput, setSurestarieNumeroInput] = useState('');
  // const [surestarienavireInput, setSurestarieNavireInput] = useState('');
  const [surestariedatearriveeInput, setSurestarieDateArriveeInput] = useState(date);
  // const [surestarieclientInput, setSurestarieClientInput] = useState('');
  // const [surestarieportInput, setSurestariePortInput] = useState('');
  // const [surestariesizeInput, setSurestarieSizeInput] = useState('');
  const [surestarienombreInput, setSurestarieNombreInput] = useState('');
  const [surestariedaterestitutionInput, setSurestarieDateRestitutionInput] = useState(date);
  const [surestariecautionverseeInput, setSurestarieCautionVerseeInput] = useState(1000);
  const [surestarienlsInput, setSurestarieNlsInput] = useState('');
  const [surestariedatelsInput, setSurestarieDateLsInput] = useState('');
  // const [surestariechoixtypeInput, setSurestarieChoixTypeInput] = useState('');
  const [surestariedetentionInput, setSurestarieDetentionInput] = useState('');
  const [surestariedureeInput, setSurestarieDureeInput] = useState('');
  const [surestariesdureesInput, setSurestariesDureesInput] = useState('');
  const [surestariefraisInput, setSurestarieFraisInput] = useState('');
  const [surestariefacturerInput, setSurestarieFacturerInput] = useState('');
  const [surestarierembourserInput, setSurestarieRembourserInput] = useState('');
  const [surestarietotalInput, setSurestarieTotalInput] = useState('');
  // const [DatepickerR, setDatepickerInput] = useState('');

  const reloadPage = () => {
    window.location.reload();
  };

  function disabledPrint() {
    if (surestarienumeroInput !== '' && surestarienumeroInput !== null) return false;
    return true;
  }

  // Print Facture
  function printFacture() {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/surestarie/`,
        {
          surestarie_date: surestariedateInput,
          numero: surestarienumeroInput,
          ex_navire: surestarienavireInput,
          date_arrivee: surestariedatearriveeInput,
          client: surestarieclientInput,
          port: surestarieportInput,
          size: surestariesizeInput,
          nombre_conteneur: surestarienombreInput,
          restitution_date: surestariedaterestitutionInput,
          caution_versee: surestariecautionverseeInput,
          nls: surestarienlsInput,
          ls_date: surestariedatelsInput,
          choix_type: sureschoixInput,
          detention: surestariedetentionInput,
          surestarie_duree: surestariedureeInput,
          surestaries_duree: surestariesdureesInput,
          frais: surestariefraisInput,
          facturer: surestariefacturerInput,
          rembourser: surestarierembourserInput,
          total: surestarietotalInput,
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
  const [surestarienumeroTab, setSurestarieNumeroTab] = useState([]);
  const [surestarienumeroInput, setSurestarieNumeroInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/masterfile/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSurestarieNumeroTab(value.data);
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
   * Informations for Choix
   */
  const [sureschoixTab, setSuresChoixTab] = useState([]);
  const [sureschoixInput, setSuresChoixInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/choix/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSuresChoixTab(value.data);
      })
      .catch(() => {});
  }, []);
  /**
   * Informations for Port
   */
  const [surestarieportTab, setSurestariePortTab] = useState([]);
  const [surestarieportInput, setSurestariePortInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/port/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSurestariePortTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Taille
   */
  const [surestariesizeTab, setSurestarieSizeTab] = useState([]);
  const [surestariesizeInput, setSurestarieSizeInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/size/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSurestarieSizeTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Navire
   */
  const [surestarienavireTab, setSurestarieNavireTab] = useState([]);
  const [surestarienavireInput, setSurestarieNavireInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/navire/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSurestarieNavireTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Client
   */
  const [surestarieclientTab, setSurestarieClientTab] = useState([]);
  const [surestarieclientInput, setSurestarieClientInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/client/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSurestarieClientTab(value.data);
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

  const [reparatauxTab, setReparaTauxTab] = useState('');
  const [reparatauxInput, setReparaTauxInput] = useState('');
  const [suresdureeInput, setSuresDureeInput] = useState('');

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

  // Get the number of day between of two dates

  useEffect(() => {
    setSurestarieDetentionInput(
      (new Date(surestariedaterestitutionInput).getTime() -
        new Date(surestariedatearriveeInput).getTime()) /
        86400000 +
        1
    );
  }, [surestariedaterestitutionInput, surestariedatearriveeInput]);

  const datanormal = 32;
  const datainferieur = 14;
  // const data

  // function dureeOne(surestariedetentionInput) {
  //   if (surestariedetentionInput < 32) {
  //     return 0;
  //   }

  //   if (surestariedetentionInput > 33) {
  //     return surestariedetentionInput - 32;
  //   }
  //   elseif(surestariedetentionInput < 46) {
  //   return surestariedetentionInput - 14;
  //   }
  // }

  // useEffect(() => {
  //   setSurestariesDureesInput(surestariedetentionInput - datanormal);
  // }, [surestariedetentionInput, datanormal]);

  // useEffect(() => {
  //   setSurestarieDureeInput(
  //     if (surestariedetentionInput < 14 ){
  //       return surestariedetentionInput;
  //     }
  //   );
  // }, [surestariedetentionInput, datainferieur]);

  /**
   * Informations for Table
   */

  // useEffect(() => {
  //   surestariedureeInput(surestariedetentionInput - );
  // }, [surestariedetentionInput]);

  // Variables
  const [datafraisduree, setDataFraisDuree] = useState(0);
  const [datafraisdurees, setDataFraisDurees] = useState(0);

  function validateCalcul() {
    if (surestariesizeInput === '20') {
      if (surestariedetentionInput < 33) {
        setSurestarieDureeInput(0);
        setSurestariesDureesInput(0);
        setSurestarieFacturerInput(0);
        setSurestarieFraisInput(0);
        setSurestarieRembourserInput(surestariecautionverseeInput);
        setSurestarieTotalInput(0);
      } else if (surestariedetentionInput < 47) {
        setSurestarieDureeInput(surestariedetentionInput - 32);
        setSurestariesDureesInput(0);
        setSurestarieFacturerInput(surestariefraisInput);
        setSurestarieFraisInput((surestariedetentionInput - 32) * 10);
        if (surestariecautionverseeInput > surestariefraisInput) {
          setSurestarieRembourserInput(surestariecautionverseeInput - surestariefraisInput);
        } else {
          setSurestarieRembourserInput(surestariefraisInput - surestariecautionverseeInput);
        }
        setSurestarieTotalInput(surestariefraisInput);
      } else {
        setSurestarieDureeInput(14);
        setSurestariesDureesInput(surestariedetentionInput - 32 - 14);
        setSurestarieFacturerInput(surestariefraisInput);
        setSurestarieFraisInput(
          surestariedureeInput * 10 + (surestariedetentionInput - 32 - 14) * 20
        );
        if (surestariecautionverseeInput > surestariefraisInput) {
          setSurestarieRembourserInput(surestariecautionverseeInput - surestariefraisInput);
        } else {
          setSurestarieRembourserInput(surestariefraisInput - surestariecautionverseeInput);
        }
        setSurestarieTotalInput(surestariefraisInput);
      }
    } else if (surestariesizeInput === '40') {
      if (surestariedetentionInput < 33) {
        setSurestarieDureeInput(0);
        setSurestariesDureesInput(0);
        setSurestarieFacturerInput(0);
        setSurestarieFraisInput(0);
        setSurestarieRembourserInput(surestariecautionverseeInput);
        setSurestarieTotalInput(0);
      } else if (surestariedetentionInput < 47) {
        setSurestarieDureeInput(surestariedetentionInput - 32);
        setSurestariesDureesInput(0);
        setSurestarieFacturerInput(surestariefraisInput);
        setSurestarieFraisInput(surestariedureeInput * 20 + surestariesdureesInput * 20);
        if (surestariecautionverseeInput > surestariefraisInput) {
          setSurestarieRembourserInput(surestariecautionverseeInput - surestariefraisInput);
        } else {
          setSurestarieRembourserInput(surestariefraisInput - surestariecautionverseeInput);
        }
        setSurestarieTotalInput(surestariefraisInput);
      } else {
        setSurestarieDureeInput(14);
        setSurestariesDureesInput(surestariedetentionInput - 32 - 14);
        setSurestarieFacturerInput(surestariefraisInput);
        setSurestarieFraisInput(
          surestariedureeInput * 20 + (surestariedetentionInput - 32 - 14) * 40
        );
        if (surestariecautionverseeInput > surestariefraisInput) {
          setSurestarieRembourserInput(surestariecautionverseeInput - surestariefraisInput);
        } else {
          setSurestarieRembourserInput(surestariefraisInput - surestariecautionverseeInput);
        }
        setSurestarieTotalInput(surestariefraisInput);
      }
    }
  }

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
    <Page title="Surestarie | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Surestarie
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
            {/* <div className="input-label-wrapper">
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
            </div> */}
            {/* <div className="input-label-wrapper">
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
            </div> */}
            <div className="input-label-wrapper">
              Date Surestarie:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez la date de la Surestarie"
                type="date"
                variant="outlined"
                value={surestariedateInput}
                onChange={(e) => {
                  setSurestarieDateInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              N° Conteneur:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={surestarienumeroTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setSurestarieNumeroInput(newType.number);
                  } else {
                    setSurestarieNumeroInput(null);
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
              Navire:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={surestarienavireTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setSurestarieNavireInput(newType.name);
                  } else {
                    setSurestarieNavireInput(null);
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
              Client:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={surestarieclientTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setSurestarieClientInput(newType.name);
                  } else {
                    setSurestarieClientInput(null);
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
              Date Restitution:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez la date de Restitution"
                type="date"
                variant="outlined"
                value={surestariedaterestitutionInput}
                onChange={(e) => {
                  setSurestarieDateRestitutionInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              NLS:{' '}
              <TextField
                className="basic-input"
                label="Saisissez le NLS"
                variant="outlined"
                value={surestarienlsInput}
                onChange={(e) => {
                  setSurestarieNlsInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Type de Choix:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={sureschoixTab}
                // value={choix(Exportation)}
                onChange={(event, newType) => {
                  if (newType) {
                    setSuresChoixInput(newType.name);
                  } else {
                    setSuresChoixInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner le type de Choix" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Detention:{' '}
              <TextField
                className="basic-input"
                label="Saisissez le nombre de jour"
                variant="outlined"
                value={surestariedetentionInput}
                onChange={(e) => {
                  setSurestarieDetentionInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Durée:{' '}
              <TextField
                className="basic-input"
                label="Supérieur à 14 jours"
                variant="outlined"
                value={surestariesdureesInput}
                onChange={(e) => {
                  setSurestariesDureesInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Frais:{' '}
              <TextField
                className="basic-input"
                label="Frais à payer"
                variant="outlined"
                value={surestariefraisInput}
                onChange={(e) => {
                  setSurestarieFraisInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Rembourser:{' '}
              <TextField
                className="basic-input"
                label="A rembourser "
                variant="outlined"
                value={surestarierembourserInput}
                onChange={(e) => {
                  setSurestarieRembourserInput(e.target.value);
                }}
              />
            </div>
          </Box>
          <Box className="box-2-wrapper">
            <div className="input-label-wrapper">
              Taille:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={surestariesizeTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setSurestarieSizeInput(newType.name);
                  } else {
                    setSurestarieSizeInput(null);
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
              Port:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={surestarieportTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setSurestariePortInput(newType.name);
                  } else {
                    setSurestariePortInput(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner le Port" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Date Arrivée:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez la date d'arrviée"
                type="date"
                variant="outlined"
                value={surestariedatearriveeInput}
                onChange={(e) => {
                  setSurestarieDateArriveeInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Nombre:{' '}
              <TextField
                className="basic-input"
                label="Saisissez le nombre"
                variant="outlined"
                value={surestarienombreInput}
                onChange={(e) => {
                  setSurestarieNombreInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Caution Versée:{' '}
              <TextField
                className="basic-input"
                label="Saisissez le montant"
                variant="outlined"
                value={surestariecautionverseeInput}
                onChange={(e) => {
                  setSurestarieCautionVerseeInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Ls Date:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez le ls date"
                type="date"
                variant="outlined"
                value={surestariedatelsInput}
                onChange={(e) => {
                  setSurestarieDateLsInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Durée:{' '}
              <TextField
                className="basic-input"
                label="Inférieur à 14jours"
                variant="outlined"
                value={surestariedureeInput}
                onChange={(e) => {
                  setSurestarieDureeInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Facturer:{' '}
              <TextField
                className="basic-input"
                label="A Facturer"
                variant="outlined"
                value={surestariefacturerInput}
                onChange={(e) => {
                  setSurestarieFacturerInput(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Total:{' '}
              <TextField
                className="basic-input"
                label="Total "
                variant="outlined"
                value={surestarietotalInput}
                onChange={(e) => {
                  setSurestarieTotalInput(e.target.value);
                }}
              />
            </div>
            {/* <div className="input-label-wrapper">
              Date:{' '}
              <TextField
                className="basic-input"
                label="Total "
                type="date"
                variant="outlined"
                value={DatepickerR}
                onChange={(e) => {
                  setDatepickerInput(e.target.value);
                }}
              />
            </div> */}
            {/* <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Date Input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="date-input" name="date-input" placeholder="date" />
                  </CCol>
            </CFormGroup> */}
            {/* <div className="input-label-wrapper">
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
            </div> */}
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
            <ComponentToPrintSurest
              ref={componentRef}
              client={mouvclientInput}
              // total={}
              rows={[]}
            />
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={() => validateCalcul()}>
              CALCUL
            </Button>
          </div>
        </Card>
      </Container>
    </Page>
  );
}
