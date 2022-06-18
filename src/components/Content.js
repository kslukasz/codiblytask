import React, { useContext , useEffect} from 'react';
import { AppContext} from './AppContext.js'
import {useParams} from 'react-router-dom'

import './Content.css'

function Content() {  
  let params = useParams(); 
  const { data, currentPage, numberOfProducts, input, dataLength, setDataLength ,setCurrentPage } = useContext(AppContext);
  const filter = () => {
    let copyList = [...data.data];
    copyList = copyList.filter((element) => (
      (element.id + "").includes(input)
    ));
    if (dataLength !== copyList.length) {
      setDataLength(copyList.length);
    } return copyList;
  }

  const products = filter();
  const list = () => {
    const result = products.slice(((currentPage * numberOfProducts) - numberOfProducts), (currentPage * numberOfProducts));
    return result
  }
  const table = (
    <table>
      <thead>
        <tr>
          <th className='id'>Id</th>
          <th className='name'>Name</th>
          <th className='year'>Year</th>
        </tr>
      </thead>
      <tbody>
        {list().map((element) => {
          return (
            <tr key={element.id} style={{ backgroundColor: `${element.color}` }}>
              <th className='id'>{element.id}</th>
              <th>{element.name}</th>
              <th>{element.year}</th>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
  useEffect(()=>{
    if (!(Number(params.id) > Math.ceil(dataLength / numberOfProducts)) 
    && Number(params.id) > 0 
    && params.id && Number(params.id)!=="NaN" ){
    setCurrentPage(Number(params.id));
    } else {window.history.replaceState({}, "",currentPage)}
  },[]);
  
  return (
    <div className='cont_vertical'>
      {table}
    </div>
  );
}

export default Content;