-- -------------------------------------------------------------
-- TablePlus 6.2.0(576)
--
-- https://tableplus.com/
--
-- Database: db_spotify
-- Generation Time: 2024-12-05 21:50:35.8260
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS albums_album_id_seq;

-- Table Definition
CREATE TABLE "public"."albums" (
    "album_id" int4 NOT NULL DEFAULT nextval('albums_album_id_seq'::regclass),
    "artist_id" int4,
    "name" varchar(100) NOT NULL,
    "release_date" date,
    "image" bytea,
    PRIMARY KEY ("album_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS artists_artist_id_seq;

-- Table Definition
CREATE TABLE "public"."artists" (
    "artist_id" int4 NOT NULL DEFAULT nextval('artists_artist_id_seq'::regclass),
    "name" varchar(100) NOT NULL,
    "genre" varchar(100),
    "image" bytea,
    "image_path" varchar(255),
    PRIMARY KEY ("artist_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."followers" (
    "user_id" int4 NOT NULL,
    "artist_id" int4 NOT NULL,
    PRIMARY KEY ("user_id","artist_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS friends_id_seq;

-- Table Definition
CREATE TABLE "public"."friends" (
    "id" int4 NOT NULL DEFAULT nextval('friends_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "friend_id" int4 NOT NULL,
    "status" varchar(50) DEFAULT 'pending'::character varying,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."likes" (
    "user_id" int4 NOT NULL,
    "track_id" int4 NOT NULL,
    "like_date_time" timestamp,
    PRIMARY KEY ("user_id","track_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."playlist_tracks" (
    "playlist_id" int4 NOT NULL,
    "track_id" int4 NOT NULL,
    "Order" int4,
    PRIMARY KEY ("playlist_id","track_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS playlists_playlist_id_seq;

-- Table Definition
CREATE TABLE "public"."playlists" (
    "playlist_id" int4 NOT NULL DEFAULT nextval('playlists_playlist_id_seq'::regclass),
    "user_id" int4,
    "name" varchar(100) NOT NULL,
    "image" bytea,
    PRIMARY KEY ("playlist_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tracks_track_id_seq;

-- Table Definition
CREATE TABLE "public"."tracks" (
    "track_id" int4 NOT NULL DEFAULT nextval('tracks_track_id_seq'::regclass),
    "album_id" int4,
    "name" varchar(100) NOT NULL,
    "duration" int4 NOT NULL,
    "path" varchar(255),
    PRIMARY KEY ("track_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_user_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "user_id" int4 NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    "name" varchar(100) NOT NULL,
    "email" varchar(100) NOT NULL,
    "password" varchar(100) NOT NULL,
    "date_of_birth" date,
    "profile_image" bytea,
    PRIMARY KEY ("user_id")
);

INSERT INTO "public"."albums" ("album_id", "artist_id", "name", "release_date", "image") VALUES
(1, 1, '1989', '2014-10-27', NULL),
(2, 2, '÷ (Divide)', '2017-03-03', NULL),
(3, 3, '21', '2011-01-19', NULL),
(4, 6, 'New Album', '2024-11-16', NULL),
(5, 6, 'New Album', '2024-11-16', NULL),
(6, 8, 'HAHAHAHA', '2024-12-25', NULL),
(7, 8, 'HAHAHAHA', '2024-12-25', NULL),
(8, 8, 'HUHUHU', '2024-12-25', NULL),
(9, 8, 'HEHEHE', '2024-12-25', NULL);

INSERT INTO "public"."artists" ("artist_id", "name", "genre", "image", "image_path") VALUES
(1, 'Taylor Swift', 'Pop', NULL, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/24taylor-notebook3-mediumSquareAt3X.jpg'),
(2, 'Ed Sheeran', 'Pop', NULL, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/ed_sheeran.jpeg'),
(3, 'Adele', 'Pop', NULL, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/adele.jpeg'),
(4, 'Michael Jackson', 'Pop', NULL, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/ed_sheeran.jpeg'),
(5, 'Michael Buble', 'Pop', NULL, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/mj.jpeg'),
(6, 'DuongTest', 'Pop', NULL, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/cool.jpeg'),
(7, 'DuongTest2', 'Pop', NULL, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/cool.jpeg'),
(8, 'DuongTest3', 'Pop', NULL, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/cool.jpeg'),
(9, 'DuongTest4', 'Pop', NULL, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/cool.jpeg');

INSERT INTO "public"."followers" ("user_id", "artist_id") VALUES
(1, 1),
(2, 1),
(3, 2);

INSERT INTO "public"."likes" ("user_id", "track_id", "like_date_time") VALUES
(1, 1, '2022-01-15 10:30:00'),
(1, 2, '2022-01-20 14:45:00'),
(1, 4, '2024-12-03 15:53:28.072'),
(1, 5, '2024-12-03 15:53:03.493'),
(1, 6, '2024-12-03 15:53:34.059'),
(1, 7, '2024-12-03 15:53:37.002'),
(2, 1, '2022-02-05 09:15:00'),
(3, 2, '2022-02-10 16:20:00');

INSERT INTO "public"."playlist_tracks" ("playlist_id", "track_id", "Order") VALUES
(1, 1, 1),
(1, 2, 2),
(2, 2, 1),
(2, 3, 2),
(3, 1, 1),
(3, 3, 2),
(4, 5, 2),
(4, 6, 3),
(4, 7, 4);

INSERT INTO "public"."playlists" ("playlist_id", "user_id", "name", "image") VALUES
(1, 1, 'Favorites', NULL),
(2, 2, 'Party Mix', NULL),
(3, 3, 'Road Trip', NULL),
(4, 1, 'New Playlist', NULL);

INSERT INTO "public"."tracks" ("track_id", "album_id", "name", "duration", "path") VALUES
(1, 1, 'Shake It Off', 233, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/24taylor-notebook3-mediumSquareAt3X.jpg'),
(2, 1, 'Blank Space', 231, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/24taylor-notebook3-mediumSquareAt3X.jpg'),
(3, 2, 'Shape of You', 233, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/24taylor-notebook3-mediumSquareAt3X.jpg'),
(4, 5, 'track1', 1, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/24taylor-notebook3-mediumSquareAt3X.jpg'),
(5, 5, 'track2', 2, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/24taylor-notebook3-mediumSquareAt3X.jpg'),
(6, 5, 'track3', 3, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/24taylor-notebook3-mediumSquareAt3X.jpg'),
(7, 5, 'track4', 1, 'https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/https://raw.githubusercontent.com/DuongTrinh2208/nodejs_adv_capstone/main/Resources/24taylor-notebook3-mediumSquareAt3X.jpg');

INSERT INTO "public"."users" ("user_id", "name", "email", "password", "date_of_birth", "profile_image") VALUES
(1, 'John Doe', 'johndoe@example.com', '$2b$05$tJV59ECavLBHPkJglPorreW3W0t9pwK2zc8jS/TeCYt8fKHozpaCO', '1990-05-15', NULL),
(2, 'Jane Smith', 'janesmith@example.com', 'pass456', '1988-09-27', NULL),
(3, 'Mike Johnson', 'mikejohnson@example.com', 'mysecretpass', '1995-03-10', NULL),
(4, 'admin', 'admin@admin', '$2b$05$az7t7I0Pv4mzLDgFgsi7j.U8XduORg4z8V0sq7uOPYAGKoxehQ.6m', '1999-11-01', NULL);

ALTER TABLE "public"."albums" ADD FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("artist_id");
ALTER TABLE "public"."followers" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id");
ALTER TABLE "public"."followers" ADD FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("artist_id");
ALTER TABLE "public"."friends" ADD FOREIGN KEY ("friend_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE;
ALTER TABLE "public"."friends" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX friends_user_id_friend_id_key ON public.friends USING btree (user_id, friend_id);
CREATE UNIQUE INDEX friends_friend_id_user_id_key ON public.friends USING btree (friend_id, user_id);
ALTER TABLE "public"."likes" ADD FOREIGN KEY ("track_id") REFERENCES "public"."tracks"("track_id");
ALTER TABLE "public"."likes" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id");
ALTER TABLE "public"."playlist_tracks" ADD FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("playlist_id");
ALTER TABLE "public"."playlist_tracks" ADD FOREIGN KEY ("track_id") REFERENCES "public"."tracks"("track_id");
ALTER TABLE "public"."playlists" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id");
ALTER TABLE "public"."tracks" ADD FOREIGN KEY ("album_id") REFERENCES "public"."albums"("album_id");


-- Indices
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
