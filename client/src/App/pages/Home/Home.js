import Card from "../../components/Cards/cards";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
function Home() {
  const cardsData = [{ title: "WELCOME HOME" }];

  return (
    <div>
      <Navbar />
      <div className="container">
        {cardsData.map((card, index) => (
          <Card key={index} title={card.title} />
        ))}
      </div>
    </div>
  );
}

export default Home;
