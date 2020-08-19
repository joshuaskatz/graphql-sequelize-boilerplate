CREATE TABLE "public"."User"
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE "public"."Profile"
(
    id SERIAL PRIMARY KEY NOT NULL,
    bio TEXT,
    location VARCHAR(250),
    "userId" INTEGER UNIQUE NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "public"."User"(id) ON DELETE CASCADE
);

CREATE TABLE "public"."Trip"
(
    id SERIAL PRIMARY KEY NOT NULL,
    date VARCHAR(50) NOT NULL,
    time_spent DECIMAL(4,2),
    "authorId" INTEGER UNIQUE NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "public"."User" (id) ON DELETE CASCADE
);


CREATE TABLE "public"."River"
(
    id SERIAL PRIMARY KEY NOT NULL,
    latitude VARCHAR(50) NOT NULL,
    longitude VARCHAR(50) NOT NULL,
    brush VARCHAR(255),
    size VARCHAR(255) NOT NULL,
    regulation VARCHAR(255) NOT NULL,
    stocked VARCHAR(255) NOT NULL
);



CREATE TABLE "public"."Tackle"
(
    id SERIAL PRIMARY KEY NOT NULL,
    rod_name VARCHAR(255) NOT NULL,
    rod_weight VARCHAR(15) NOT NULL,
    rod_length_ft VARCHAR(15) NOT NULL,
    rod_length_in VARCHAR(15) NOT NULL,
    "authorId" INTEGER UNIQUE NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "public"."User" (id) ON DELETE CASCADE
);

CREATE TABLE "public"."Fish"
(
    id SERIAL PRIMARY KEY NOT NULL,
    species VARCHAR(255) NOT NULL
);


CREATE TABLE "public"."Flies"
(
    id SERIAL PRIMARY KEY NOT NULL,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL
);








CREATE TABLE "public"."River_Fish"
(
    "riverId" INT NOT NULL,
    "fishId" INT NOT NULL,
    FOREIGN KEY ("riverId") REFERENCES "public"."River" (id),
    FOREIGN KEY ("fishId") REFERENCES "public"."Fish" (id)
);

CREATE TABLE "public"."River_Flies"
(
    "riverId" INT NOT NULL,
    "flyId" INT NOT NULL,
    FOREIGN KEY ("riverId") REFERENCES "public"."River" (id),
    FOREIGN KEY ("flyId") REFERENCES "public"."Flies" (id)
);

CREATE TABLE "public"."Fish_Flies"
(
    "fishId" INT NOT NULL,
    "flyId" INT NOT NULL,
    FOREIGN KEY ("fishId") REFERENCES "public"."Fish" (id),
    FOREIGN KEY ("flyId") REFERENCES "public"."Flies" (id)
);


CREATE TABLE "public"."Trip_Fish"
(
    "tripId" INT NOT NULL,
    "fishId" INT,
    FOREIGN KEY ("tripId") REFERENCES "public"."Trip" (id) ON DELETE CASCADE,
    FOREIGN KEY ("fishId") REFERENCES "public"."Fish" (id)
);

CREATE TABLE "public"."Trip_Flies"
(
    "tripId" INT NOT NULL,
    "flyId" INT NOT NULL,
    FOREIGN KEY ("tripId") REFERENCES "public"."Trip" (id) ON DELETE CASCADE,
    FOREIGN KEY ("flyId") REFERENCES "public"."Flies" (id)
);

CREATE TABLE "public"."Trip_Tackle"
(
    "tripId" INT NOT NULL,
    "tackleId" INT,
    FOREIGN KEY ("tripId") REFERENCES "public"."Trip" (id) ON DELETE CASCADE,
    FOREIGN KEY ("tackleId") REFERENCES "public"."Tackle" (id)
);