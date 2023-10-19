import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <aside className="flex flex-col md:flex-row">
        <div className="flex flex-row items-center">
          <Link href={"/"}>
            <Image
              src="/images/gulgonen.svg"
              alt="GülGönen"
              className="w-28 md:w-40 h-20 md:h-36 object-cover"
              width={"20"}
              height={"20"}
            />
          </Link>
          <div className="flex flex-col items-start space-y-1">
            <h1>
              <span className="font-semibold text-base md:text-md">S.S. GülGönen</span>
            </h1>
            <h1>
              <span>Tarımsal Kalkınma Kooperatifi</span>
            </h1>
          </div>
        </div>
        <div className="divider md:divider-horizontal"></div>
        <div className="flex flex-row items-center">
          <Link href={"https://instagram.com/apadijital/"} target="_blank">
            {/* web site eklenebilir. */}
            <Image
              src="/images/APA.png"
              alt="apadigital"
              className="w-16 md:w-24 h-16 md:h-24 object-cover rounded-md"
              width={"20"}
              height={"20"}
            />
          </Link>
          <div className="flex flex-col items-start ml-5 space-y-1">
            <h1>
              <span className="font-semibold text-base md:text-md">APA Dijital Ajans</span>
            </h1>
            <h1>
              <span className="text-md">tarafından geliştirilmiştir.</span>
            </h1>
          </div>
        </div>
      </aside>
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">Hakkımızda</a>
        <a className="link link-hover">İletişim</a>
        <a className="link link-hover" href="/privacy-policy">
          Gizlilik Politikası
        </a>
        <a className="link link-hover" href="/terms-of-use">
          Kullanım Koşulları
        </a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            className="link"
            href="https://instagram.com/gulgonenkoop.32/"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 30 30"
              className="fill-current"
            >
              <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a href="https://www.facebook.com/groups/388470874661959/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </nav>
      <aside>
        <p>Copyright &copy; 2023 - Tüm hakkı saklıdır.</p>
      </aside>
    </footer>
  );
}
