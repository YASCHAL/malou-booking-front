
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import './featured.css'

const Featured = () => {
    const {data,loading,error} = useFetch("/hotels/countByCity?cities=berlin,madrid,london,istanbul")
    const [destination,setDestination] = useState("")
    const navigate = useNavigate()
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
      const [options,setOptions] = useState({
        adult:1,
        children:0,
        room:1
      });

    const {dispatch} = useContext(SearchContext)

    const handleSearch = ()=>{
        dispatch({type: "NEW_SEARCH", payload:{destination, dates, options}})
        navigate('/hotels' , {state:{destination, dates, options}})
      }

    
   
  return (
   <>
       { loading ? (
        "loading please wait"
        ):(
        <div className='featured'>
        <div className="featuredItem" onMouseMove={(e) => {setDestination("berlin")}} onClick={handleSearch}>
            <img src="https://images.pexels.com/photos/3484001/pexels-photo-3484001.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Berlin</h1>
                <h2>{data[0]} Properties</h2>
                
            </div>
        </div>
        <div className="featuredItem" onMouseMove={(e) => {setDestination("madrid")}} onClick={handleSearch}>
            <img src="https://media.istockphoto.com/photos/madrid-city-skyline-gran-via-street-twilight-spain-picture-id1059076792?b=1&k=20&m=1059076792&s=612x612&w=0&h=zD7dGFJ_GwCD_UPwN93yoRAyZcEyWVkK7ToKVLBN9Co=" alt='' className="featuredImg" />
            <div className="featuredTitles">
                <h1>Madrid</h1>
                <h2>{data[1]} Properties</h2>
                
            </div>
        </div>
        <div className="featuredItem" onMouseMove={(e) => {setDestination("london")}} onClick={handleSearch}>
            <img src="https://images.pexels.com/photos/220887/pexels-photo-220887.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>London</h1>
                <h2>{data[2]} Properties</h2>
                
            </div>
        </div>
        <div className="featuredItem" onMouseMove={(e) => {setDestination("istanbul")}} onClick={handleSearch}>
            <img src="https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Istanbul</h1>
                <h2>{data[3]} Properties</h2>
                
            </div>
        </div>
    </div>)}
  </>
  )
}

export default Featured