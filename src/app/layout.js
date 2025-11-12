import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "@/components/Footer";
import { headers } from "next/headers";
import { getCurrentSiteConfig, SITES } from "@/constants/city";
import Header from "@/components/Header";
import SocialButton from "@/components/social-button/socialButton";

export const metadata = {
  icons: {
    icon: [
      { rel: "icon", type: "image/svg+xml", url: "/images/favicon.svg" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/images/favicon.png",
      },
    ],
  },
};

export default async function RootLayout({ children }) {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const siteConfig = getCurrentSiteConfig(host);
  const metrikaId = siteConfig?.metrikaId || SITES.DEFAULT.metrikaId;

  return (
    <html lang="ru">
      <head>
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          as="style"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
          as="style"
        />

        {/* Отложенная загрузка стилей */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          />
        </noscript>

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
          />
        </noscript>

        {/* Скрипт Botfaqtor */}
        <BotfaqtorScript />
        <YandexMetrikaScript metrikaId={metrikaId} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <SocialButton />
        <Footer />
      </body>
    </html>
  );
}

function BotfaqtorScript() {
  return (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `window._ab_id_=162206;`,
        }}
      />
      <script src="https://cdn.botfaqtor.ru/one.js" async />
    </>
  );
}

function YandexMetrikaScript({ metrikaId }) {
  if (!metrikaId) return null;

  return (
    <>
      <script
        async
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(${metrikaId}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });`,
        }}
      />

      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${metrikaId}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
