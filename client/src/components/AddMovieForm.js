import React, {useState, useEffect} from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const AddMovieForm = (props) => {
    const { setMovies } = props;
    const { push } = useHistory();
	const { id } = useParams();
    const [newMovie, setNewMovie] = useState({
        title:"",
		director: "",
		genre: "",
		metascore: 0,
		description: ""
    })
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setNewMovie(res.data);
            }).catch(err => {console.log(err)})
    }, [])

    const handleChange = e => {
       
        setNewMovie({
            ...newMovie,
            [e.target.value]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies`, newMovie)
            .then(res => {
                console.log(res.data)
                props.setMovies(res.data)
                push("/movies")  
            }).catch(err => {console.log(err)})
    }

    const { title, director, genre, metascore, description } = newMovie;
    return (
        <div className='add-movie'>
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <h4 className="modal-title">Add a new movie</h4>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Title</label>
                            <input value={title} onChange={handleChange} name="title" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Director</label>
                            <input value={director} onChange={handleChange} name="director" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Genre</label>
                            <input value={genre} onChange={handleChange} name="genre" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Metascore</label>
                            <input value={metascore} onChange={handleChange} name="metascore" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea value={description} onChange={handleChange} name="description" className="form-control"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <input type="submit" className="btn btn-info" value="Add" />
                        <Link to={"/movies"}><input type="button" className="btn btn-default" value="Cancel"/></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddMovieForm