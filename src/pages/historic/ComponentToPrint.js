import React from 'react';
import './Historic.css';

class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString()
    };
  }

  render() {
    const { rows } = this.props;
    const { date } = this.state;

    return (
      <div>
        <div className="print-source" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            className="print-source"
            src="/static/logo_lmc.JPG"
            alt="Logo"
            style={{ width: 150, height: 150 }}
          />
          <div
            className="print-source"
            style={{ textAlign: 'center', color: 'blue', flexGrow: 0.7 }}
          >
            <p style={{ fontWeight: 700, fontSize: '22px' }}>Republique Démocratique du Congo</p>
            <p style={{ fontWeight: 700, fontSize: '22px' }}>LIGNES MARITIMES CONGOLAISES, SA</p>
            <p style={{ fontWeight: 600, fontSize: '22px' }}>Armement National</p>
            <hr style={{ opacity: 1, color: 'blue', backgroundColor: 'blue', height: '3px' }} />
          </div>
        </div>
        <h3 className="print-source" style={{ textAlign: 'center' }}>
          HISTORIQUE DES CONTENEURS
        </h3>
        <div
          className="print-source"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
            marginBottom: '2rem',
            width: '100%'
          }}
        >
          <table className="print-source" style={{ width: '100%', marginBottom: '2rem' }}>
            <thead>
              <th>Numéro</th>
              <th>Type</th>
              <th>Taille</th>
              <th>Etat</th>
              <th>Date Fab.</th>
              <th>Date E/S.</th>
              <th>Dat D/I. </th>
              <th>Valeur Assurée</th>
              <th>Devise</th>
              <th>Site</th>
              <th>Montant</th>
              <th>Numéro Réçu</th>
              <th>Utilisateur</th>
              <th>Date</th>
            </thead>
            <tbody style={{ width: '100%' }}>
              {rows.map((value, key) => {
                const {
                  number,
                  typeconteneurid,
                  tailleconteneurid,
                  etatconteneurid,
                  datefabrication,
                  dateentrerservice,
                  datederniereinspection,
                  valeurassuree,
                  deviseid,
                  siteid,
                  montant,
                  numerorecu,
                  user,
                  date
                } = value;
                return (
                  <tr key={key} style={{ textAlign: 'center' }}>
                    <td>{number}</td>
                    <td>{typeconteneurid}</td>
                    <td>{tailleconteneurid}</td>
                    <td>{etatconteneurid}</td>
                    <td>{datefabrication}</td>
                    <td>{dateentrerservice}</td>
                    <td>{datederniereinspection}</td>
                    <td>{valeurassuree}</td>
                    <td>{deviseid}</td>
                    <td>{siteid}</td>
                    <td>{montant}</td>
                    <td>{numerorecu}</td>
                    <td>{user}</td>
                    <td>{date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ComponentToPrint;
