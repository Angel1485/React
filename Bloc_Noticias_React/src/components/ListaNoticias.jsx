import { useState, useEffect } from 'react'
import TarjetaNoticia from './TarjetaNoticia'

function ListaNoticias() {
  const [noticias, setNoticias] = useState([]) // Aqui se guarda los get o post
  const [cargando, setCargando] = useState(true)  //Empieza en true — porque al abrir la página aún no hay datos.
  const [error, setError] = useState(null) //Empieza en null — no hay error todavía

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')  //Llama a los datos los mismos que se visualizaron en el postman 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`) //Devuelve el estado de la respuesta 
        }
        return response.json()
      })
      .then((data) => {
        //setNoticias(data)
        setNoticias(data.slice(0, 100)) // Colocamos el numero de noticias que queremos que se visualize con UX o podemos dejarlo como la linea anterior sin slice
        //console.log(data); 
        setCargando(false) //avisa que ya terminó de cargar.
      })
      .catch((err) => {  //atrapa cualquier fallo de red o el error que suceda, lo muestra en consola con console.error
        console.error('Error fetching:', err)
        setError(err.message)
        setCargando(false) //avisa que ya terminó de cargar.
      })
  }, [])

  if (cargando) {
    return <p className="estado estado--cargando">Cargando noticias del cable…</p>
  }

  if (error) {
    return <p className="estado estado--error">No se pudo conectar al servicio: {error}</p>
  }

  return (
    <section className="grid-noticias">    
      {noticias.map((noticia, index) => (
        <TarjetaNoticia key={noticia.id} info={noticia} indice={index} />
      ))}
    </section>
  )
}

export default ListaNoticias