function DigimonCard(props) {

  const { digi } = props;
  //const parteUrl = digi.url.split('/');
  //const id = parteUrl[parteUrl.length - 2];
  
  //Dpendiendo la api hay que hacr ajustes en el codigo
  const id = digi.id;
  const imagenUrl = `https://digi-api.com/images/digimon/w/${digi.name}.png`;
  
  return (
    <div>
      <img src={imagenUrl} alt={digi.name} />
      <h3>{digi.name}</h3>
      <p>Número #{id}</p>
    </div>
  );
}

export default DigimonCard; 