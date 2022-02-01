import React, { useEffect, useState } from 'react';
import './StartRaiting.scss'
interface Props{
  start:number
}
export const StarRaiting = ({start}:Props) => {
  // let numero = [1, 1, 1, 0.5, 0]
  const [inicio, setInicio] = useState<number[]>([0,0,0,0,0]);

  const convertArray = (num: number) => {
    let acumulador=[];
    for (let i = 1; i <= num; i++) {
      acumulador.push(1)
    }
    if(num.toString().includes('.5')){
      acumulador.push(0.5)
    }
    if(num<5 && num.toString().includes('.5')){
      for (let i = 0; num < 4; num++) {
        // console.log(num);
        acumulador.push(0)
      }
    }else{
      for (let i = 0; num < 10; num++) {
        // console.log(num);
        acumulador.push(0)
      }
    }
    // console.log(num.toString().includes('.5'));
    setInicio(acumulador)
  }
  // console.log(inicio);
  useEffect(() => {
    convertArray(start)
  }, [start]);

  return <div className='container__star'>
    {
      inicio.map(el => {
        if (el === 1) {
          return <>
            <i className="fas fa-star"></i>
          </>
        }
        if (el === 0.5) {
          return <>
            <i className="fas fa-star-half-alt"></i>
          </>
        }
        if (el === 0) {
          return <>
            <i className="far fa-star"></i>
          </>
        }
      })
    }
  </div>;
};