"use client";

import { SearchManufacturer } from "./";
import { useState } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Style {
  styles: string;
}

const SearchButton = ({ styles }: Style ) => (
  <button type="submit" className={`-ml-3 z-10 ${styles}`}>
    <Image
      src='/magnifying-glass.svg'
      alt='magnifying glass'
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
)

function SearchBar() {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const router = useRouter();

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set('model', model);
    } else {
      searchParams.delete('model');
    }
    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer);
    } else {
      searchParams.delete('manufacturer');
    }

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathName);
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manufacturer === '' && model === '') {
      return alert('Please search for something before submitting');
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  }



  return (
    <form action="" className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton styles="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          alt="car model icon"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan..."
          className="searchbar__input"
        />
        <SearchButton styles="sm:hidden" />
      </div>
      <SearchButton styles="max-sm:hidden" />
    </form>
  )
}

export default SearchBar