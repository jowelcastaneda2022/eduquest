import questionImg from '../../assets/images/memory-game/question-mark.jpg';

const Card = (props) => {
    function handleChoice() {
      if (!props.disabled) props.handleChoice(props.card);
    }
  
    return (
      <div className="memory-card">
        <div className={props?.flipped ? "flipped" : ""}>
          <img
            className={`front ${props?.card?.matched ? "matched" : ""}`}
            src={props.card ? props.card.src : null}
            alt="memory-card front"
            height="150px"
            width="150px"
          />
          <img
            className="back"
            src={questionImg}
            alt="card back"
            onClick={() => handleChoice()}
            height="150px"
          />
        </div>
      </div>
    );
  }
  
  export default Card;
  