import { useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";
import { useEffect } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  function toggleModal() {
    setShowModal(!showModal);
  }
  
  useEffect(() => {
    async function fetchData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`
      
      const today = (new Date()).toDateString();
      const localKey = `NASA=${today}`

      if (localStorage.getItem(localKey)) {
        const apidata = JSON.parse(localStorage.getItem(localKey))
        setData(apidata)
        return
      }

      localStorage.clear()

      try {
        const res = await fetch(url)
        const apidata = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apidata))
        setData(apidata)        
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, []);

  return (
    <>
      {data ? (<Main data={data} />) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
        )}
      {showModal && <SideBar data={data} toggleModal={toggleModal} />}
      {data && (<Footer data={data} toggleModal={toggleModal} />)}
    </>
  );
}

export default App;
