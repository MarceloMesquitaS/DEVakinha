import Image from "next/image";
import { Name } from "./name";
import { Bio } from "./bio";

interface CardProfileProps {
    user: {
        id: string;
        name: string | null;
        userName: string | null;
        bio: string | null;
        image: string | null;
    };
}

export function CardProfile({ user }: CardProfileProps) {
    return (
        <section className="w-full flex flex-col items-center mx-auto px-4">
            <div>
                <Image
                    src={user.image ?? "https://github.com/MarceloMesquitaS.png"}
                    alt="Foto de perfil"
                    width={96}
                    height={96}
                    className="rounded-xl bg-gray-50 object-cover border-4 border-white hover:shadow-xl duration-300"
                    priority
                    quality={100}
                />
            </div>
            <div>
        <Name
        initialName={user.name ?? "Digite seu nome..."}
        />

        <Bio
            initialBio={user.bio ?? "Digite sua biografia..."}
        />

            </div>
        </section>
    );
}
