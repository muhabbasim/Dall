import { Button } from '@/components/ui/button';
import { PenSquare, Trash } from 'lucide-react';
import React from 'react'
import ImageUploading from 'react-images-uploading';


export default function ReactImageUpload({ setImageFile, imageFile, imageValue, setImageValue }) {
  const maxNumber = 1;

  const onChange = (imageList) => {
    setImageFile(imageList[0]);
    setImageValue(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={imageValue}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className=" w-full  flex items-center justify-center">
            {!imageFile && <button
              className=' w-full flex items-center justify-center h-40 bg-slate-200 rounded-md'
              style={isDragging ? { color: 'green' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>}

            {Array.isArray(imageList) && imageList.map((image, index) => (
              <div key={index} className=" w-full space-y-4 flex flex-col items-center justify-center">
                <img src={image['data_url']} alt="" width="100"
                  className='w-52 h-52 rounded-full object-cover'
                />
                <div className=" flex gap-4">
                  <Button className='flex gap-2' variant={'ghost'} onClick={() => onImageUpdate(index)}>
                    <PenSquare className='text-teal-600 w-5 h-5'/>
                    Update
                  </Button>
                  <Button className='flex gap-2' variant={'ghost'} onClick={() => onImageRemove(index)}>
                    <Trash className='text-rose-800 w-5 h-5'/>  
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
