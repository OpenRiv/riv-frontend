import { useResServerCard } from "../../../hook/useResServerCard";
import Skeleton from "react-loading-skeleton";

export default function ServerSectionLoading() {
  const { count } = useResServerCard();
  return (
    <section className="flex flex-col items-center justify-center space-y-[4rem] mb-[4rem] mt-[2rem]">
      {[...Array(3)].map((_, groupIndex) => (
        <div key={groupIndex} className={`flex space-x-[4rem]`}>
          {[...Array(count)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-start space-y-[1rem]"
            >
              <Skeleton height={"12rem"} width={"22rem"} />
              <div className="flex flex-row justify-between w-full">
                <div>
                  <Skeleton width={"7rem"} height={"1.5rem"} />
                  <Skeleton width={"5rem"} height={"1.2rem"} />
                </div>
                <Skeleton width={"6rem"} height={"4rem"} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
