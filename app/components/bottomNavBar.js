export default function BottomNavBar() {
  return (
    <div className="sticky bottom-0 lg:hidden">
      <div className="btm-nav h-[210px] bg-white shadow-[0_0_10px] shadow-black">
        <div className="flex flex-row items-start justify-between px-4 bg-red-100 buradan devam butonu ortala">
          <div>
            <div className="text-lg font-bold">Seçilen Ürünler (2)</div>
            <div className="mt-2 space-y-1">
              <div className="flex flex-row gap-2">
                <div className="text-sm font-semibold"> Toplam KDV dahil: </div>
                <div className="text-sm font-bold"> 200 TL</div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-sm font-semibold">Kargo ücreti: </div>
                <div className="text-sm font-bold"> Alıcı öder </div>
              </div>
            </div>
          </div>
          <a
            className="btn btn-md bg-success text-white"
            onClick={() => {}} //! kontrol işlemi ve belirlenen sayfaya veri gönderimi
            href="/odeme" //! daha sonra kaldırılacak
          >
            Alışverişi tamamla
          </a>
        </div>
      </div>

      <div className="btm-nav btm-nav-lg">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10
              a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>
        <button className="active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
