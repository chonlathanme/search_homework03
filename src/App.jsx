import { useState, useEffect } from 'react'

function App() {
  const [search, setSearch] = useState('')
  return (
    <div>
      <h1>Product Search</h1>
      <SearchBar setSearch={setSearch} />
      <hr />
      <ProductList search={search} />
    </div>
  )
}


function SearchBar(props) {
  const { setSearch } = props
  const [data, setData] = useState([])
  const fetchData = async () => {
    const resp = await fetch('https://dummyjson.com/products')
    const result = await resp.json()
    console.log(result)
    setData(result.products)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const hdlChange = (data) => {
    setSearch(data)
  }
  return (
    <div>
      <input onChange={(e) => hdlChange(e.target.value)} />
    </div>
  )
}


function ProductList(props) {
  const { search } = props
  const [item, setItem] = useState([])
  const fetchData = async (text) => {
    const resp = await fetch(`https://dummyjson.com/products/search?q=${text}`)
    const result = await resp.json()
    console.log(result)
    setItem(result.products)
  }
  useEffect(() => {
    fetchData(search)
  }, [search])
  if (search === '') {
    return (
      <h1></h1>
    )
  }
  return (
    <div>
      <ul>
        {item.map(el => (
          <li>{el.brand}, {el.category}</li>
        ))}
      </ul >
    </div>
  )
}

export default App
