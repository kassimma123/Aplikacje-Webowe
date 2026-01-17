import React, { useState, useEffect } from 'react';
import Komentarz, {type KomentarzProps} from './Komentarz';

const Komentarze: React.FC = () => {
    const [comments, setComments] = useState<KomentarzProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://dummyjson.com/comments')
            .then(res => res.json())
            .then(data => {
                setComments(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h3>Komentarze 7.2</h3>
            {loading ? (
                <p>Ładowanie komentarzy...</p>
            ) : (
                <div>
                    {comments.map((comment) => (
                        <Komentarz
                            key={comment.id}
                            id={comment.id}
                            body={comment.body}
                            postId={comment.postId}
                            likes={comment.likes}
                            user={comment.user}
                        />
                    ))}
                </div>
            )}
            </div>
    );
};
export default Komentarze;