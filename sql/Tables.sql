CREATE TABLE IF NOT EXISTS Astro_hora (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  hora_inicial VARCHAR(10),
  hora_final VARCHAR(10),
  venta INT
);

INSERT INTO Astro_hora (hora_inicial, hora_final, venta) VALUES 
('06:00', '7:00', 2000),
('07:00', '8:00', 5000),
('08:00', '9:00', 9000),
('09:00', '10:00', 4000),
('10:00', '11:00', 3000),
('11:00', '12:00', 4000),
('12:00', '13:00', 10000),
('13:00', '14:00', 3000),
('14:00', '15:00', 2000),
('15:00', '16:00', 2000),
('16:00', '17:00', 1000),
('17:00', '18:00', 1000),
('18:00', '19:00', 3000),
('19:00', '20:00', 4000),
('20:00', '21:00', 2000),
('21:00', '22:00', 1000);

SELECT * FROM Astro_hora;