import dynamic from "next/dynamic";

const MainCarousel = dynamic(() => import("./MainCarousel"), {
  ssr: false,
  loading: () => <div style={{ minHeight: 400 }}>Загрузка карусели...</div>,
});

export default function MainCarouselWrapper() {
  return <MainCarousel />;
}