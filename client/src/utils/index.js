import FileSaver from 'file-saver'

import { surpriseMePrompts } from "../constants";

export function getRandomPrompt (prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randomIndex]//el numero que devuelva randomIndex, utilizamos notacion con corchetes para traernos un scipt del array surpriseMePrompts

    
    if(randomPrompt === prompt) return getRandomPrompt(prompt)//si el argumeno de la funcion es igual a lo arrojado en randomPromt volvemos a ejecutar la funcion hasta que los valores no sean iguales
    
    return randomPrompt
}


export async function downloadImage (_id, photo) {
    
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
    
    
}