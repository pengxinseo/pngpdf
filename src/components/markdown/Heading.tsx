import React from 'react';
import { FaLink } from 'react-icons/fa';

const Heading = ({ level, children }: { level: any; children: any }) => {
  const id = children.toString().toLowerCase().replace(/\s+/g, '-');
  const Tag: any = `h${level}`;

  return (
    <div className="group flex items-center -ml-6">
      <a title={`#${id}`} href={`#${id}`} className="mr-8 opacity-0 group-hover:opacity-100">
        <span className='sr-only'>{`#${id}`}</span>
        <FaLink className="text-orange-600" />
      </a>
      <Tag id={id} className="inline-block -ml-6 flex-1 border-b border-gray-300">
        {children}
      </Tag>
    </div>
  );
};

export default Heading;