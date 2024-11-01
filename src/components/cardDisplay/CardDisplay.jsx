import PlayingCard from '../../components/playingCard/PlayingCard';

function CardDisplay({ card, loading, error }) {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <PlayingCard card={card} />
  );
}

export default CardDisplay;