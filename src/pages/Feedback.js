import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './FeedBack.css';

class Feedback extends React.Component {
  componentDidMount() {
    this.Salvar();
  }

    handleClickPlayAgain = () => {
      const { history } = this.props;
      history.push('/');
    }

  redirectRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  Salvar = () => {
    const { correctAnswer, score } = this.props;
    localStorage.setItem('correctAnswer', `${correctAnswer}`);
    localStorage.setItem('score', `${score}`);
  };

  render() {
    const { correctAnswer, score } = this.props;
    const TRES = 3;
    return (
      <div className="bodyFeedback">
        <Header />
        <div className="container">
          {
            correctAnswer >= TRES
              ? (
                <p data-testid="feedback-text">
                  Well Done!
                </p>)
              : (
                <p data-testid="feedback-text">
                  Could be better...
                </p>)
          }
          <p data-testid="feedback-total-score">
            { score }
          </p>
          <p data-testid="feedback-total-question">
            { correctAnswer }
          </p>

          <button
            id="btnRanking"
            type="button"
            data-testid="btn-ranking"
            onClick={ this.redirectRanking }
          >
            Ranking
          </button>
          <button
            id="btnPlay"
            data-testid="btn-play-again"
            type="button"
            onClick={ this.handleClickPlayAgain }
          >
            Play Again

          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  correctAnswer: state.player.answer,
  score: state.player.score,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  correctAnswer: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,

};

export default connect(mapStateToProps)(Feedback);
