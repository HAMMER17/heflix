import React from 'react'
import Acc from '../components/Acc';
import faqs from '../faqs.json'

const Accordion = () => {
  return (
    <div className='accordion'>
      {faqs.map((elem, id) => (
        <Acc data={elem} key={id} />
      ))}
    </div>
  )
}

export default Accordion;
