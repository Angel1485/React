function TarjetaNoticia({ info, indice }) {
  const rotaciones = [-2.2, -1.1, 0, 1.3, 2.1, -1.6, 1.8, -0.7]  //Arreglo fijo de angulos
  const rotacion = rotaciones[indice % rotaciones.length] // Cada tarjeta tiene un diferente angulo

  return (
    <article className="tarjeta" style={{ '--rot': `${rotacion}deg` }}>
      <span className="tarjeta__pin" aria-hidden="true" />
      <div className="tarjeta__folio">
        Nota N.º {String(info.id).padStart(3, '0')} · Redactor #{info.userId}
      </div>
      <h2 className="tarjeta__titulo">{info.title}</h2>
      <p className="tarjeta__cuerpo">{info.body}</p>
      <button className="tarjeta__boton" type="button">
        Leer completa
      </button>
    </article>
  )
}

export default TarjetaNoticia