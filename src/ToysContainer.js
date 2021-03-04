import toysObj from './database'
import ToyCard from './ToyCard'
import React, {useState, useEffect} from 'react'
   
function ToysContainer(props) {

    const [toys, setToys] = useState([])
    const [search, setSearch] = useState("")

    // const likeToy = (id) => {
    //     const index = toys.findIndex(i=>i.id===id)
    //     const updatedToy = {...toys[index], likes: toys[index].likes + 1}
    //     setToys([...toys.slice(0, index), updatedToy,...toys.slice(index+1)])
    // }

    const likeToy = (id) => {
        const index = toys.findIndex(i=>i.id===id)
        const toy = toys[index]

        const configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({likes: toy.likes + 1})
        }

        fetch(`http://localhost:3000/toys/${id}`, configObj)
        .then(res => res.json())
        .then(json => {
            setToys([...toys.slice(0, index), json,...toys.slice(index+1)])
        })

    }

    const makeToyCards = () => {
        let displayedToys = toys
        if(search){
            displayedToys = toys.filter((toy) =>  
            toy.name.toLowerCase().includes(search.toLowerCase()))
        }

        return displayedToys.map(toy => <ToyCard key={toy.id} toy={toy} id={toy.id} name={toy.name} image={toy.image} likes={toy.likes} likeToy={likeToy}/>)
    }

    useEffect(()=>{
        const url ="http://localhost:3000/toys"
        fetch(url)
        .then(res => res.json())
        .then(json => {
           setToys(json)
        })
    }, [])

    const handleInputChange = (e) => {
        const search = e.target.value
        setSearch(search)
    }

    return(
        <div id="toy-container">
            <div>
                <input type="text" placeholder="Search for a toy..." onChange={handleInputChange}/>
            </div>
            {makeToyCards()}
        </div>
    ) 
}

export default ToysContainer