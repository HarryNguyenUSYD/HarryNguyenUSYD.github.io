import Image from "next/image";

export default function Background() {
    return (
        <Image
            src="/images/Background/Starlight-Neon-210.png"
            alt="Website background"
            width={2880}
            height={1000}
            className="w-screen h-screen -z-50 fixed top-0 left-0 brightness-30"
        />
    );
}