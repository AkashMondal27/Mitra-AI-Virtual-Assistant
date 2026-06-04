import React from 'react'

const Card = ({ image }) => {
  return (
    <div
      className="
        w-20 h-30
        sm:w-28 sm:h-48
        md:w-30 md:h-55
        bg-[#030326]
        border-2 border-[#03037178]
        rounded-2xl
        overflow-hidden
        hover:shadow-2xl
        hover:shadow-blue-900
        hover:border-white
        cursor-pointer
        transition-all
        duration-300
      "
    >
      <img
        src={image}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default Card