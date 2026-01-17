import React, { useState } from 'react';

interface User {
    id: number;
    username: string;
    fullName: string;
}

export interface KomentarzProps {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: User;
}

const Komentarz: React.FC<KomentarzProps> = ({ id, body, postId, likes, user }) => {
    const [likeCount, setLikeCount] = useState(likes);

    return (
        <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0', borderRadius: '8px', background: '#f9f9f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <strong>{user.fullName} (@{user.username})</strong>
                <span style={{ fontSize: '0.8em', color: '#888', marginLeft: '10px' }}>Post ID: {postId}</span>
            </div>

            <p style={{ fontStyle: 'italic' }}>"{body}"</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>Likes: {likeCount}</span>
                <button onClick={() => setLikeCount(likeCount + 1)}>👍</button>
                <button onClick={() => setLikeCount(likeCount - 1)}>👎</button>
            </div>
            <small>ID komentarza: {id}</small>
        </div>
    );
};

export default Komentarz;