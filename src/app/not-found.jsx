import Link from "next/link";
import "../styles/components/_notfound.scss"; 

export default function NotFound() {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "70vh", padding: "2rem" }}
    >
      <h1 
        style={{ fontSize: "6rem", fontWeight: "bold", margin: 0, color: "#ffffffff", }}
      >
        404
      </h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#ffffffff", }}>
        Страница не найдена
      </h2>
      <p style={{ fontSize: "1.2rem", color: "#ffffffff", marginBottom: "2rem", maxWidth: "600px" }}>
        К сожалению, запрашиваемая вами страница не существует. Возможно, она была удалена, 
        перемещена или вы ввели неверный адрес.
      </p>
      <Link 
        href="/" 
        className="btn btn-warning btn-lg"
        style={{ fontSize: "1.25rem", padding: "0.75rem 1.5rem", backgroundColor: "#fcf200"}}
      >
        Вернуться на главную
      </Link>
    </div>
  );
}