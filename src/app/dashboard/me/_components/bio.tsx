"use client";

import { ChangeEvent, useState, useRef } from "react";
import { debounce } from "lodash";
import { toast } from "sonner";
import { changeBio } from "../_actions/change-bio";

export function Bio({ initialBio }: { initialBio: string }) {
  const [bio, setBio] = useState(initialBio);
  const [originalBio] = useState(initialBio);

  const debouncedSave = useRef(
    debounce(async (currentBio: string) => {
      if (currentBio.trim() === "") {
        setBio(originalBio);
        return;
      }

      if (currentBio !== bio) {
        try {
          const response = await changeBio({ bio: currentBio });

  
          if (!response || response.error) {
            toast.error(response.error);
            setBio(currentBio);
            return;
          }

          toast.success("Biografia atualizada com sucesso!");

        } catch (err) {
          console.error(err);
          setBio(currentBio);
        }
      }
    }, 1000) 
  ).current

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setBio(value);
    debouncedSave(value); 



  }

  return (
    <textarea
      className="text-base bg-gray-50 border border-gray-100 rounded-md 
      outline-none p-2 w-full max-w-2xl my-3 h-40 resize-none text-center"
      value={bio}
      onChange={handleChange}
    />
  );
}
