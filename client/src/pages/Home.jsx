import { useEffect, useState } from "react";

import Loader from "../components/Loader";
import Card from "../components/Card";
import FormField from "../components/FormField";



const RenderCards = ({ data, title }) => {
  if(data?.length > 0){ 
  return data.map((post) => <Card key={post._id}  {...post} />)//con el spread operator pasamos el resto de valores como props al componente Card
  }

return (
  <h2 className="mt-5 font-bold text-[#6465ff] text-xl uppercase">{title}</h2>
)

}




const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  
  const [searchText, setSearchText] = useState('')
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeOut, setSearchTimeOut] = useState(null)

  
  useEffect(() => {
    const fetchPosts = async () => {
      
      setLoading(true)
      
      try {

      const res = await fetch("http://localhost:8000/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })

      if(res.ok) {
        const result = await res.json()
        setAllPosts(result.data.reverse())//el reverse, se trae el ultimo dato y lo coloca de primero en el array
      }



      } catch (error) {
        alert(error)
      }finally{
        setLoading(false)
      }
    }
  
    fetchPosts()
  }, [])
  
  
  const handleSearchChange = e => {
    clearTimeout(searchTimeOut)
    
    setSearchText(e.target.value)

    setSearchTimeOut(

        setTimeout(() => {
          
          const searchResultsPosts = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()))
    
          setSearchedResults(searchResultsPosts)
        }, 500)
    )
    
  }
  
  
  //1rem = 16px
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px] ">
          Mostrador de la Comunidad
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Navegue a través de una colección de imagenes imaginativas y visualmente impresionantes generadas por DALL-E AI
        </p>
      </div>

      <div className="mt-16">
          <FormField 
            labelName=""
            type="text"
            name="text"
            placeholder="buscar imágenes"
            value={searchText}
            handleChange={handleSearchChange}
          />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Mostrando resultados para <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 ">
              {searchText ? (
                <RenderCards 
                  data={searchedResults}//"searchedResults"
                  title="Sin resultados de busqueda"
                />
              ): (
                <RenderCards 
                  data={allPosts}//"allPosts"
                  title="Sin imagenes creadas todavia, ¡empiece a crear!"
                />
              )}
            </div>
          </>
        )
        }
      
      </div>
    </section>
  );
};

export default Home;
