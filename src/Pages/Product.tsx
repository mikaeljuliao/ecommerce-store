import { useParams } from "react-router-dom"


export default function Product() {

  const {id} = useParams()
   return (
    <div>
      <h1>Página de Produto</h1>
      <p>ID do produto: {id}</p>
    </div>
  )
}
