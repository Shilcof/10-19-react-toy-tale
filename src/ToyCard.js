import {useState, useEffect} from 'react'

function ToyCard(props){
    // const {id, image, name} = props.toy // destructuring is an option
    const [timer, setTimer] = useState(0)
    const [colour, setColour] = useState("yellow")

    useEffect(()=>{
        const interval = setInterval(() => {
            setTimer((timer)=>timer+1)
        }, 1000);

        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(()=>{
        setColour(prevColour=>prevColour==="yellow"?"white":"yellow")
    }, [props.likes])

    return(
        <div className="card" style={{backgroundColor: colour}} id={`toy-${props.id}`}>
            <h2>{props.name}</h2>
            <img src={props.image} className="toy-avatar"/>
            <p>{props.likes} Likes </p>
            <button className="like-btn"
                onClick={()=>props.likeToy(props.id)}
            >Like &lt;3</button>
            <div>{timer}</div>
        </div>
    )
}

export default ToyCard