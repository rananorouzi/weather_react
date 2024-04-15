import "../../App.css";
import React, { MouseEventHandler } from "react";
type buttonParamType = {
  params: {
    onClickHandler: MouseEventHandler<HTMLButtonElement> | undefined;
    tmp: string;
    value: string;
    icon: string | React.ReactNode;
    classes: string;
  };
};
function TempUnitButtons({ params }: buttonParamType) {
  return (
    <button
      onClick={params.onClickHandler}
      className={
        params.classes +
        " z-[2] inline-block border border-solid border-gray-400 px-4 pb-2 pt-2.5 text-xs font-medium leading-normal hover:bg-blue-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:bg-blue-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
      }
      type="button"
      id={"temp_" + params.value}
      data-te-ripple-init
    >
      {params.icon}
    </button>
  );
}

export { TempUnitButtons };
