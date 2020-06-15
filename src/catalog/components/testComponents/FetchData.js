import { useState, useEffect } from "react";

export function FetchData (url) {
  const [datas, setDatas] = useState(url)

  useEffect(() => {
    fetchSomeData(url)
  }, [])

  function fetchSomeData(url) {
    fetch(url)
      .then(function(res){
        if (res.ok) {
          console.log(res.status)
          fetch(url)
          .then(res => res.json())
          .then(res => setDatas(res))
        }
      })
  }

  return ([datas])
}
