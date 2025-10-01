"use client"
import { ChangeEvent, useState } from "react"
type Loc = { lon: number, lat: number }
const Report = () => {
  const [image, setImage] = useState<File | null>(null)
  const [url, setPreviewUrl] = useState<string | undefined>()
  const [location, setLocation] = useState<Loc | undefined>()
  const [address, setAdress] = useState<string | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
      setPreviewUrl(URL.createObjectURL(e.target.files?.[0]))
    }
  }

  const askLocation = () => {
    if (!navigator.geolocation) {
      console.log("geolocation is not supported by your browser")
      return
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = {
        lon: pos.coords.longitude,
        lat: pos.coords.latitude
      }
      setLocation(coords)
      getAdress(coords)
      console.log(coords)
    }, (err) => {
      console.log(err.message)
    })
  }

  const getAdress = async (loc: Loc) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${loc.lat}&lon=${loc.lon}&format=json`, {
        headers: {
          'User-Agent': 'TheUSer5050',
        }
      })
      const data = await res.json()
      setAdress(data.display_name)
    } catch (err) {
      console.log("Error fetching the address")
    }
  }

  return <form className="flex flex-col justify-around items-center h-[50vh] mx-auto rounded-4xl bg-blue-50 w-[50vw] my-5">
    <div className="border-2 px-2 py-2 rounded-2xl">
      <input type="file" onChange={handleImageChange} accept="image/" />
      {image && <div>
        <img src={url} width={300} height={300} />
      </div>}
    </div>
    <div>
      <button onClick={askLocation} className="border-2 px-2 py-2 rounded-2xl">Get location</button>
      {address && <p>{address}</p>}
    </div>
    <div className="border-2 px-2 py-2 rounded-2xl">
      <label>Select Issue Category:</label>
      <select id="issue-category" name="issue-category" required>
        <option value="">-- Please choose an option --</option>
        <option value="pothole">Pothole / Road damage</option>
        <option value="garbage">Garbage / Waste disposal</option>
        <option value="streetlight">Streetlight not working</option>
        <option value="water-leakage">Water leakage</option>
        <option value="illegal-construction">Illegal construction</option>
        <option value="noise-pollution">Noise pollution</option>
        <option value="public-safety">Public safety issue</option>
        <option value="other">Other</option>
      </select>
    </div>
    <button type="submit">Submit</button>
  </form>
}

export default Report
