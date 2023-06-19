import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'

import FormField from "../components/FormField"
import Loader from "../components/Loader"

const initialValues = {
  name: '',
  prompt: '',
  photo: ''
}


const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialValues)
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(form.prompt && form.photo) {
      setLoading(true)
      console.log('entró handleSubmit')
      try {
        const res = await fetch("http://localhost:8000/api/v1/post", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        })

       const data = await res.json()
       console.log('exito!' + data)
       navigate('/')
      } catch (error) {
        alert(error)
      }finally{
        setLoading(false)
      }
    }else {
      alert("por favor, introduce un Prompt y genera una imagen")
    }
  
  }


  const handleChange = e => {
    e.preventDefault()

    setForm({ ...form, [e.target.name]: e.target.value })//la copia de lo que ya hay en el form mas, de manera dinamica, donde este posionado el cursor, el name y el value de ese elemento

  }


  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  const generateImage = async () => {
    
    if(form.prompt){ //si existe, haz esto, si hay un prompt
    try {
      
      
        setGeneratingImg(true)
        const res = await fetch('http://localhost:8000/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({prompt: form.prompt})//lo que le estamos enviando por el body(POST) parsearlo en formato json, en este caso el prompt de turno en el objeto del estado form
        })
      
      const data = await res.json()
      setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})//...form, para esparcir (spread operator) los otros elementos del objeto, y en photo sobreescribir lo que trae el data del backend con la api
      
      

    } catch (error) {
      alert(error)
    }finally{
      setGeneratingImg(false)
    }
  }else {
    alert('por favor, ingresa un prompt')
  }
  
  }

  
  return (
    <section className="max-w-screen-lg mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px] ">
          Crear
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[600px]">
          Cree imágenes imaginativas y visualmente impresionantes a través de DALL-E AI y compartalas con la comunidad
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField 
              labelName="your name"
              type="text"
              name="name"
              placeholder="Eliecer S"
              value={form.name}
              handleChange={handleChange}
            />

            <FormField 
              labelName="prompt"
              type="text"
              name="prompt"
              placeholder="A man wanders through the rainy streets of Tokyo, with bright neon signs, 50mm"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className="relative border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
              {form.photo ? (
                <img 
                  src={form.photo} 
                  alt={form.prompt} 
                  className="w-full h-full object-contain"
                  />
              ) : (
                <img src={preview} alt="preview" className="h-[75%] w-9/12 object-contain opacity-40" />
              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>        
          </div>
      
        <div className="mt-5 flex gap-5 ">
            <button
              type="button"
              onClick={generateImage}
              className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"

            >
              {generatingImg ? "generando..." : "generar"}
            </button>
        </div>
      
        <div className="mt-10 ">
          <p className="mt-2 text-[#666e75] text-[14px] ">Una vez que hayas creado la imagen que quieras, puedes compartirla con la comunidad</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"

          >
            {loading ? "Compatiendo..." : "compartir con la comunidad"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost