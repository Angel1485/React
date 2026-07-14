function Header() {
  const hoy = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="masthead">
      <div className="masthead__tape masthead__tape--left" />
      <div className="masthead__tape masthead__tape--right" />
      <p className="masthead__eyebrow">Edición digital · Actualización en vivo</p>
      <h1 className="masthead__title">Bloc de Noticias</h1>
      <div className="masthead__rule" />
      <p className="masthead__dateline">{hoy}</p>
    </header>
  )
}

export default Header