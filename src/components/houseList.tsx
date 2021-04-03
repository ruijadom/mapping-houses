import Link from "next/link";
import { Image } from "cloudinary-react";
import { HousesQuery_houses } from "src/generated/HousesQuery";
import { IoBedOutline } from "react-icons/io5";
interface IProps {
  houses: HousesQuery_houses[];
}

export default function HouseList({ houses }: IProps) {
  return (
    <>
      {houses.map((house) => (
        <Link key={house.id} href={`/houses/${house.id}`}>
          <div className="flex flex-wrap px-6 pt-4 cursor-pointer">
            <div className="sm:w-full md:w-1/2">
              <Image
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                publicId={house.publicId}
                alt={house.address}
                secure
                dpr="auto"
                quality="auto"
                width={350}
                height={Math.floor((9 / 16) * 350)}
                crop="fill"
                gravity="auto"
              />
            </div>
            <div className="sm:w-full md:w-1/2 sm:pl-0 md:pl-4">
              <h2 className="text-lg">{house.address}</h2>
              <div className="flex flex-row items-center ml-1">
                <p>{house.bedrooms}</p>
                <IoBedOutline className="ml-1 text-white" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
