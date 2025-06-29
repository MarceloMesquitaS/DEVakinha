"use client";

import { ChangeEvent, useState } from 'react';

export function Name({ initialName}: {initialName: string}) {
const [name, setName] = useState(initialName);
const [originalName] = useState(initialName);

function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setName(value);

}

    return (
        <input
        className="text-xl md:text-2xl font-bold bg-gray-50 border border-gray-100 rounded-md outline-none p-2 w-full
         max-w-2xl text-center my-3"
        value={name}
        onChange={handleChangeName}

            />
    );
}