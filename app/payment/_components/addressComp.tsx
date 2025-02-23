import Functions from "@/app/functions";

export function AddressComp({ address, setAddress }: { address: any, setAddress: (address: any) => void }) {
  function shortenText(input: string) {
    var output = new Functions().shortenText(input, 75);

    return output;
  }

  return (
    <div className="card p-2 w-[320px] md:w-[450px] lg:w-[550px] xl:w-[620px] h-[180px] md:h-48 lg:h-44 xl:h-44 shadow-secondary shadow-[0_0_10px]">
      <div className="card-title justify-center md:justify-start text-lg lg:text-xl text-secondary p-0 md:pl-2">
        Teslimat Adresim
      </div>
      <div className="card-body p-0 pt-1 md:pt-2 pl-3">
        {Object.keys(address).length === 0 ? (
          <div className="text-sm lg:text-base">Adres girilmemiş.</div>
        ) : (
          <>
            <div className="flex flex-row gap-4">
              <div className="text-sm lg:text-base">
                Müşteri Adı:{" "}
                {shortenText(`${address["name"]} ${address["surname"]}`)}
              </div>
              <div className="text-sm lg:text-base">
                {shortenText(`${address["identityNumber"]}`)}
              </div>
            </div>
            <div className="text-sm lg:text-base">
              {shortenText(address["address"] ?? "Adres bilgileri bulunmuyor")}
            </div>
            <div className="text-sm lg:text-base">
              {shortenText(`${address["district"]}/${address["city"]}`)}
            </div>
          </>
        )}
      </div>
      <div className="card-actions justify-end pr-2 pb-2">
        {Object.keys(address).length !== 0 && (
          <a
            className={`btn btn-sm btn-error text-secondary-content`}
            onClick={() => {
              setAddress({});
              localStorage.removeItem("delivery.address");
            }}
          >
            Adresi temizle
          </a>
        )}
        <a
          className={`btn btn-sm 
                    transition ease-out delay-150 duration-200
                    ${
                      Object.keys(address).length === 0
                        ? "bg-secondary text-secondary-content"
                        : ""
                    }
                    `}
          onClick={() => {
            (document.getElementById("address_modal") as HTMLDialogElement)?.showModal();
          }}
        >
          Adres ekle/değiştir
        </a>
      </div>
    </div>
  );
}
