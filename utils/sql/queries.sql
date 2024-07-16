-- Create table users
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(40) NOT NULL,
  logged BOOL,
  last_logged_date TIMESTAMPTZ
);

-- Create table favorites
CREATE TABLE favorites (
  fav_id SERIAL NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  chat_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  CONSTRAINT unique_favorite_user UNIQUE (chat_id, user_id)
);

-- Foreign Key user_id
ALTER TABLE favorites ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

-- Insert data in table users
INSERT INTO users (name, email, password, role, logged, last_logged_date)
VALUES
('Admin', 'admin@gmail.com', '123456', 'admin', false, '2024-07-01 20:57:30.212678+00'),
('Edu', 'edu@gmail.com', '123456', 'user', false, '2024-07-01 20:57:30.212678+00'),
('Emilio', 'emilio@gmail.com', '123456', 'user', false, '2024-07-01 20:57:30.212678+00'),
('Diego', 'diego@gmail.com', '123456', 'user', false, '2024-07-01 20:57:30.212678+00');

-- Insert data in table favorites
INSERT INTO favorites (user_id, chat_id)
VALUES
(2, '66843f141fd851901525667c'),
(2, '66843f141fd851901525667f'),
(3, '66843f141fd851901525667f'),
(3, '66843f141fd8519015256682'),
(3, '66843f151fd8519015256688'),
(4, '66843f141fd851901525667c'),
(4, '66843f151fd8519015256685');

-----------------------------------------------------------------------------------------------------------------------

-- CRUD users
-- CREATE
INSERT INTO users(name, email, password, role, logged, last_logged_date)
VALUES ('Prueba', 'prueba@gmail.com', '123456', 'user', false, '2024-07-01 20:57:30.212678+00');
-- READ ALL
SELECT *
FROM users
WHERE role = 'user';
-- READ ONE
SELECT *
FROM users
WHERE email = 'prueba@gmail.com' 
-- UPDATE
UPDATE users
SET name = 'Prueba2',
email = 'prueba2@gmail.com',
password = '123456123456',
role = 'user',
logged: false,
last_logged_date: '2024-07-01 20:57:30.212678+00'
WHERE email = 'prueba@gmail.com';
-- DELETE
DELETE FROM users
WHERE email = 'prueba2@gmail.com';

-- CRXD favorites
-- CREATE
INSERT INTO favorites(user_id, chat_id)
VALUES((SELECT user_id FROM users WHERE email = 'diego@gmail.com'), 2);
-- READ
SELECT chat_id
FROM favorites
WHERE user_id = (SELECT user_id FROM users WHERE email = 'diego@gmail.com')
-- DELETE
DELETE FROM favorites
WHERE user_id = (SELECT user_id FROM users WHERE email = 'diego@gmail.com')
AND chat_id = '2';

-- Queries testing (TEST PASSED)
SELECT * FROM public.users;

SELECT * FROM public.favorites;

SELECT u.email, f.chat_id
FROM public.favorites f
INNER JOIN public.users u ON u.user_id = f.user_id;