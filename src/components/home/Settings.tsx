import "../../App.css";
import React, { ReactElement, useState } from "react";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter
  } from "tw-elements-react";

function TempUnitButtons(parameters: { buttonParams: any; }) : ReactElement{
  const params = parameters.buttonParams;
  return(
    <>
    <button
            onClick={() => params.onClickRefHandler()}
            className="active z-[2] text-slate-900	inline-block rounded bg-white border border-solid border-gray-400 mr-4 rounded-lg px-2 text-xs font-medium leading-normal hover:bg-blue-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:bg-blue-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            type="button"
            id="refresh"
            data-testid="refresh"
            data-te-ripple-init
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="15"
              height="15"
              viewBox="0 0 30 30"
            >
              <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
            </svg>
          </button>

          <button
            onClick={() => params.onClickTempHandler("c")}
            className={
              (params.tmp === "c"
                ? params.buttonClassNames.active
                : params.buttonClassNames.deactive) +
              " z-[2] inline-block rounded-l-lg border border-solid border-r-0 border-gray-400 px-4 pb-2 pt-2.5 text-xs font-medium leading-normal hover:bg-blue-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:bg-blue-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            }
            type="button"
            id="temp_c"
            data-te-ripple-init
          >
            °C
          </button>
          <button
            onClick={() => params.onClickTempHandler("f")}
            className={
              (params.tmp === "f"
                ? params.buttonClassNames.active
                : params.buttonClassNames.deactive) +
              " z-[2] inline-block rounded-r-lg border border-solid border-gray-400 px-5 pb-2 pt-2.5 text-xs font-medium leading-normal hover:bg-blue-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:bg-blue-400  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            }
            type="button"
            id="temp_f"
            data-te-ripple-init
          >
            °F
          </button>
    </>
  );
}
function Setting(): ReactElement {
  const [showModal, setShowModal] = useState(false);
  const [defaultTemp, setdefaultTemp] = useState('c');
  const onSaveButtonClickHandler = (defaultTemp : string) => {
    localStorage.setItem('defaultTemp', defaultTemp);
    setShowModal(false);
  }

  return (
    <>
    <button
    onClick={() => setShowModal(true)}
    className="z-[2] text-slate-900	inline-block rounded bg-white border border-solid border-gray-400 mr-4 rounded-lg px-2 text-xs font-medium leading-normal hover:bg-blue-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:bg-blue-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
    type="button"
    id="setting"
    data-testid="setting"
    data-te-ripple-init
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="25px" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M17.2994 10.4527L19.2267 10.7677C19.3846 10.7935 19.5003 10.9298 19.5 11.0896V12.883C19.5 13.0412 19.3865 13.1768 19.2303 13.2042L17.3004 13.543C17.1885 13.9298 17.0349 14.3022 16.8415 14.6543L17.9823 16.2382C18.0759 16.3679 18.0612 16.5463 17.9483 16.6595L16.6804 17.9283C16.5682 18.0401 16.3921 18.0561 16.2623 17.9645L14.6627 16.8424C14.3099 17.0387 13.9352 17.1952 13.5442 17.3103L13.2034 19.231C13.176 19.3865 13.0406 19.5 12.8825 19.5H11.0888C10.9294 19.5 10.7934 19.3849 10.7676 19.228L10.4493 17.3168C10.059 17.204 9.6823 17.0485 9.32585 16.8525L7.73767 17.9648C7.60821 18.0558 7.43178 18.0401 7.31992 17.9283L6.05198 16.6595C5.93947 16.5463 5.9248 16.3686 6.01741 16.2391L7.13958 14.6697C6.94163 14.3116 6.78444 13.9337 6.67062 13.5414L4.76905 13.2042C4.61349 13.1765 4.5 13.0412 4.5 12.883V11.0896C4.5 10.9304 4.61544 10.7941 4.77263 10.768L6.67421 10.4514C6.78868 10.0582 6.94586 9.68022 7.14316 9.32315L6.0347 7.73739C5.94371 7.60793 5.95937 7.43185 6.07122 7.32L7.33883 6.0525C7.452 5.94 7.62908 5.925 7.7592 6.01793L9.33433 7.14293C9.68817 6.94924 10.0639 6.795 10.4552 6.6825L10.767 4.77359C10.7927 4.61576 10.929 4.5 11.0888 4.5H12.8825C13.041 4.5 13.1763 4.61413 13.2037 4.77L13.5399 6.68935C13.929 6.8025 14.304 6.95837 14.6591 7.15467L16.2385 6.01957C16.3683 5.92598 16.5464 5.94065 16.6595 6.05348L17.9278 7.32098C18.0397 7.43315 18.0553 7.60957 17.9643 7.73902L16.8392 9.34239C17.0323 9.69424 17.1865 10.066 17.2994 10.4527ZM9.71725 12C9.71725 13.2607 10.7393 14.2826 12.0001 14.2826C13.2608 14.2826 14.2829 13.2607 14.2829 12C14.2829 10.7394 13.2608 9.71742 12.0001 9.71742C10.7393 9.71742 9.71725 10.7394 9.71725 12Z" stroke="#000000"/>
      </svg>
    </button>

    <TEModal show={showModal} setShow={setShowModal}>
    <TEModalDialog>
      <TEModalContent>
        <TEModalHeader>
          <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
            Setting
          </h5>
          <button
            type="button"
            className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </TEModalHeader>
      
        <TEModalBody>
       

      <div className="flex justify-center">
        <div className="relative mb-3 md:w-96 pt-5">                  
        <form>
            <label htmlFor="defaultTempUnit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default temperature unit</label>
            <select value={defaultTemp} name="defaultTempUnit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e: any) => {
                setdefaultTemp(e.target.value);
              }}
            >
              <option value="c">Celcius</option>
              <option value="f">Farenheit</option>
            </select>
        </form>
        </div>
      </div>
        </TEModalBody>
        <TEModalFooter>
          <TERipple rippleColor="light">
            <button
              type="button"
              className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </TERipple>
          <TERipple rippleColor="light">
            <button
              type="button"
              className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={() => onSaveButtonClickHandler(defaultTemp)}
            >
              Save changes and Close
            </button>
          </TERipple>
        </TEModalFooter>
      </TEModalContent>
    </TEModalDialog>
  </TEModal>
  </>
  );
}

export {Setting, TempUnitButtons};


