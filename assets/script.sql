\c postgres;

DROP DATABASE IF EXISTS travelbuddy;
-- Création de la base de données
CREATE DATABASE travelbuddy;

-- Connexion à la base de données
\c travelbuddy;

-- Table des rôles
CREATE TABLE roles (
    id_role SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des utilisateurs
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    bio TEXT,
    points INT DEFAULT 0,
    photo_url TEXT, -- URL ou chemin de la photo utilisateur
    id_role INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_role) REFERENCES roles(id_role)
);

-- Table des badges
CREATE TABLE badges (
    id_badge SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    points_required INT DEFAULT 0,
    photo_url TEXT, -- URL ou chemin de la photo du badge
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table associant utilisateurs et badges (N-N)
CREATE TABLE users_badges (
    id_user INT NOT NULL,
    id_badge INT NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_user, id_badge),
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_badge) REFERENCES badges(id_badge) ON DELETE CASCADE
);

-- Table des statuts d’amitié

-- Table des relations d’amitié entre utilisateurs
CREATE TABLE users_friends (
    id_user INT NOT NULL,
    id_friend INT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, blocked
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_user, id_friend),
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_friend) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_status) REFERENCES friend_statuses(id_status)
);

-- Table des voyages
-- Table des voyages
CREATE TABLE travels (
    id_travel SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    destination VARCHAR(100),
    latitude DECIMAL(12,9),  -- Haute précision
    longitude DECIMAL(12,9), -- Haute précision
    start_date DATE,
    end_date DATE,
    id_user INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

-- Table des activités liées aux voyages
CREATE TABLE travel_activities (
    id_activity SERIAL PRIMARY KEY,
    id_travel INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(100),
    latitude DECIMAL(12,9),
    longitude DECIMAL(12,9),
    activity_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_travel) REFERENCES travels(id_travel) ON DELETE CASCADE
);

-- Table des photos de voyages ou activités
CREATE TABLE travel_photos (
    id_photo SERIAL PRIMARY KEY,
    id_travel INT,
    id_activity INT,
    url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_travel) REFERENCES travels(id_travel) ON DELETE CASCADE,
    FOREIGN KEY (id_activity) REFERENCES travel_activities(id_activity) ON DELETE CASCADE
);


-- Table des salons de chat
CREATE TABLE chat_rooms (
    id_chat SERIAL PRIMARY KEY,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des messages de chat
CREATE TABLE chat_messages (
    id_message SERIAL PRIMARY KEY,
    id_chat INT NOT NULL,
    id_sender INT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_chat) REFERENCES chat_rooms(id_chat) ON DELETE CASCADE,
    FOREIGN KEY (id_sender) REFERENCES users(id_user) ON DELETE CASCADE
);

-- Table des notifications
CREATE TABLE notifications (
    id_notification SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    type VARCHAR(50),
    content TEXT,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);
