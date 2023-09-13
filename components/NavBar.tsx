import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";

function NavBar() {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href={"/"} className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="Car Hub logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>
        <CustomButton
          title="Sign In"
          btnType="button"
          containerStyles="transition ease delay-30 text-primary-blue rounded-full bg-white
                           min-w-[130px]
                           hover:text-white hover:bg-primary-blue"
        />
      </nav>
    </header>
  );
}

export default NavBar;
