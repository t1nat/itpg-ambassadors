-- Custom seed data for ITPG Ambassadors
-- This script assumes tables already exist from 001_create_tables.sql

-- Clear existing data
DELETE FROM votes;
DELETE FROM projects;
DELETE FROM ambassadors;
DELETE FROM teachers;

-- Insert ambassadors with ages
INSERT INTO ambassadors (name, bio, year, age, image_url) VALUES
('Aleksandar Karadjov', 'Dedicated ambassador passionate about cultural exchange and community projects.', '2024', 16, '/placeholder.svg'),
('Aleksandra Kostova', 'Committed to educational initiatives and youth leadership development.', '2024', 16, '/placeholder.svg'),
('Daniel Kolev', 'Enthusiastic about environmental sustainability and green initiatives.', '2024', 17, '/placeholder.svg'),
('Georgi Pazhev', 'Focused on digital innovation and technology in education.', '2024', 17, '/placeholder.svg'),
('Ivanina Pavlova', 'Young ambassador with passion for cultural heritage and traditional arts.', '2024', 15, '/placeholder.svg'),
('Kiril Kalachev', 'Dedicated to promoting intercultural dialogue and understanding.', '2024', 17, '/placeholder.svg'),
('Magdalena Ivanova', 'Committed to social justice and community service projects.', '2024', 17, '/placeholder.svg'),
('Maksim Akimov', 'Passionate about STEM education and scientific innovation.', '2024', 17, '/placeholder.svg'),
('Maksim Ralev', 'Focused on sports, health, and active lifestyle promotion.', '2024', 17, '/placeholder.svg'),
('Plamena Gospodinova', 'Dedicated to arts, creativity, and cultural expression.', '2024', 17, '/placeholder.svg'),
('Simeon Sabev', 'Committed to humanitarian causes and global citizenship.', '2024', 17, '/placeholder.svg'),
('Tina Tuncheva', 'Leader in European integration projects and international cooperation.', '2024', 17, '/placeholder.svg'),
('Valeri Yankova', 'Enthusiastic about language learning and multilingual communication.', '2024', 16, '/placeholder.svg'),
('Vasilena Veselinova', 'Dedicated to environmental protection and sustainable development.', '2024', 17, '/placeholder.svg');

-- Insert teachers in alphabetical order
INSERT INTO teachers (name, subject, bio, image_url) VALUES
('Ivana Staneva', 'European Studies', 'Coordinator of international programs and European integration initiatives.', '/placeholder.svg'),
('Stefka Dimitrova', 'Languages & Culture', 'Expert in cultural exchange programs and multilingual education.', '/placeholder.svg');

-- Insert projects with descriptions
INSERT INTO projects (title, description, short_description, long_description, image_url, extra_images) VALUES
('National Awakeners Day (Den na narodnite buditeli)', 'Celebrating Bulgarian cultural heritage and the revival leaders who shaped the nation''s identity and independence.', 'Celebrating Bulgarian cultural heritage and the revival leaders who shaped the nation''s identity and independence.', 'National Awakeners'' Day honors the Bulgarian intellectuals, educators, and revolutionaries who played crucial roles in the Bulgarian National Revival during the Ottoman rule. This day commemorates their efforts in preserving Bulgarian language, culture, and identity, leading to the country''s liberation and modernization in the 19th century.', '/placeholder.svg', '[]'),
('National Tolerance Day', 'Promoting understanding, respect, and harmony among different cultures, religions, and communities.', 'Promoting understanding, respect, and harmony among different cultures, religions, and communities.', 'This project focuses on fostering tolerance and mutual respect among diverse groups in Bulgarian society. Through educational activities, cultural exchanges, and awareness campaigns, students learn the importance of embracing diversity and building inclusive communities.', '/placeholder.svg', '[]'),
('Human Rights Day', 'Raising awareness about fundamental human rights and the importance of equality and justice for all.', 'Raising awareness about fundamental human rights and the importance of equality and justice for all.', 'Human Rights Day celebrates the Universal Declaration of Human Rights and promotes awareness of fundamental rights and freedoms. Students engage in discussions, workshops, and campaigns to understand and advocate for human rights principles in their communities.', '/placeholder.svg', '[]'),
('Christmas', 'Celebrating the joy of Christmas through cultural traditions, charity work, and community spirit.', 'Celebrating the joy of Christmas through cultural traditions, charity work, and community spirit.', 'The Christmas project brings together students to celebrate traditional Bulgarian Christmas customs while emphasizing the spirit of giving and community. Activities include charity drives, traditional baking, carol singing, and sharing the joy of the holiday season with those in need.', '/placeholder.svg', '[]'),
('International Day for Thank You', 'Expressing gratitude and appreciation for the people and things that make our lives better.', 'Expressing gratitude and appreciation for the people and things that make our lives better.', 'This project encourages students to practice gratitude and express thanks to teachers, family, friends, and community members who support them. Through letters, cards, and small acts of kindness, students learn the importance of appreciation and positive relationships.', '/placeholder.svg', '[]');