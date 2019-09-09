SELECT p.id, p.author_id, p.title, u.username, u.profile_pic, u.id
FROM posts AS p
JOIN users AS u
ON p.author_id = u.id;