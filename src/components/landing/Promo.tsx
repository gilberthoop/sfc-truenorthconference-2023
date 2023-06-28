import Image from "next/image";
import WinRegistrationImage from "@/assets/win_free_registration.webp";
import ReducedRegistrationFee from "@/assets/reduced_reg_fee.webp";
import RegisterNowImage from "@/assets/register_now.webp";
import RegisterImage from "@/assets/have_you_registered.webp";

function Promo() {
  const images = [
    { image: WinRegistrationImage, alt: "Win a Free Registration" },
    { image: ReducedRegistrationFee, alt: "Reduced Registration Fee" },
    { image: RegisterNowImage, alt: "Register Now" },
    { image: RegisterImage, alt: "Have you registered?" },
  ];

  return (
    <main className="promo">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          alt={image.alt}
          className="promo__section"
        />
      ))}
    </main>
  );
}

export default Promo;
