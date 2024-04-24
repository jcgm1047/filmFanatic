import React from "react";
import axios from "axios";
import { Modal, Button, Form, FormControl } from "react-bootstrap"; // Asegúrate de que estos componentes estén correctamente importados

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      cast: [],
      comments: [],
      newComment: "",
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { movieId } = this.props;
    this.fetchMovieDetails(movieId);
    this.fetchCastDetails(movieId);
    this.fetchComments(movieId);
  };

  fetchMovieDetails(movieId) {
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=fa0ef6f99f8264ea23ba09f92fcd8eaa&language=es`;
    axios
      .get(detailsUrl)
      .then((response) => {
        this.setState({ details: response.data, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: error.toString(), isLoading: false });
      });
  }

  fetchCastDetails(movieId) {
    const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=fa0ef6f99f8264ea23ba09f92fcd8eaa`;
    axios
      .get(castUrl)
      .then((response) => {
        this.setState({ cast: response.data.cast.slice(0, 7) });
      })
      .catch((error) => {
        console.error("Error fetching cast:", error);
      });
  }

  fetchComments(movieId) {
    axios
      .get(`http://localhost:3000/api/comments/${movieId}`)
      .then((response) => {
        this.setState({ comments: response.data });
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }

  handleAddComment = () => {
    const { movieId } = this.props;
    const { newComment, comments } = this.state;
    if (newComment.length > 200) {
      alert("Comment must be less than 200 characters");
      return;
    }
    axios
      .post(`http://localhost:3000/api/comments/${movieId}`, {
        comment: newComment,
      })
      .then(() => {
        this.setState({
          comments: [...comments, newComment],
          newComment: "",
        });
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  render() {
    const { details, isLoading, error, cast, comments, newComment } =
      this.state;
    const { show, onHide } = this.props;

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading details: {error}</p>;

    return (
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{details.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.title}
            style={{ width: "100%" }}
          />
          <p>{details.overview}</p>
          <h5>Reparto:</h5>
          <ul>
            {cast.map((actor, index) => (
              <li key={index}>{actor.name}</li>
            ))}
          </ul>
          <p>
            <strong>Año de lanzamiento:</strong> {details.release_date}
          </p>
          <h5>Comentarios:</h5>
          {comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
          <Form>
            <FormControl
              as="textarea"
              value={newComment}
              onChange={(e) => this.setState({ newComment: e.target.value })}
              maxLength="200"
            />
            <Button onClick={this.handleAddComment}>Add Comment</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MovieDetails;
