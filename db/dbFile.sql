-- 1. Create Database
CREATE DATABASE IF NOT EXISTS final_project_node;

USE final_project_node;

-- 2. Table 1: Users (Requirement: Login/Register)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- In real app, hash this!
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'user'
);

-- Insert 5 Dummy Users (Requirement: >5 records)
INSERT INTO
    users (
        username,
        password,
        full_name,
        role
    )
VALUES (
        'admin',
        'admin123',
        'System Admin',
        'admin'
    ),
    (
        'david',
        '123456',
        'David Cohen',
        'analyst'
    ),
    (
        'sarah',
        'pass789',
        'Sarah Levy',
        'viewer'
    ),
    (
        'yossi',
        'qwerty',
        'Yossi Ben',
        'analyst'
    ),
    (
        'student',
        'pass123',
        'Demo Student',
        'user'
    ),
    (
        'teacher',
        'teach1',
        'Code Teacher',
        'admin'
    );

-- 3. Table 2: Project Data (Requirement: Topic related, String + Number)
CREATE TABLE IF NOT EXISTS mock_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    threat_type VARCHAR(50) NOT NULL,
    source_ip VARCHAR(20) NOT NULL,
    risk_score FLOAT NOT NULL,
    status VARCHAR(20) DEFAULT 'New'
);

-- Insert Dummy Data (Requirement: >5 records)
INSERT INTO
    mock_alerts (
        threat_type,
        source_ip,
        risk_score,
        status
    )
VALUES (
        'DDoS Attack',
        '192.168.1.50',
        9.5,
        'Active'
    ),
    (
        'Port Scan',
        '10.0.0.5',
        4.2,
        'Investigated'
    ),
    (
        'SQL Injection',
        '172.16.0.3',
        8.7,
        'Blocked'
    ),
    (
        'Malware Beacon',
        '192.168.1.105',
        6.0,
        'New'
    ),
    (
        'Brute Force',
        '45.33.22.11',
        7.5,
        'Active'
    ),
    (
        'Ping Flood',
        '10.0.0.99',
        3.1,
        'Ignored'
    );

-- 4. Table 3: Logs (Requirement: 3rd Table choice)
CREATE TABLE IF NOT EXISTS system_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    event_type VARCHAR(20),
    message TEXT
);

INSERT INTO
    system_logs (event_type, message)
VALUES (
        'INFO',
        'System started successfully'
    ),
    (
        'WARN',
        'High CPU usage detected'
    ),
    (
        'INFO',
        'User admin logged in'
    ),
    (
        'ERROR',
        'Failed to connect to external API'
    ),
    ('INFO', 'Backup completed');